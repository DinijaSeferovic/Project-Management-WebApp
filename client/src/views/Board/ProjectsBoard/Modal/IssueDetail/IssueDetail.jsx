import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { setAlert } from "../../../../../redux/alert/alert.actions";
import { selectProjectById } from "../../../../../redux/projects/projects.selectors";
import {
	deleteEpicTicket,
	deleteTicket,
	updateTicket,
} from "../../../../../redux/tickets/tickets.actions";
import {
	selectTicketByKey,
	selectTicketsLinkedWithEpic,
} from "../../../../../redux/tickets/tickets.selectors";
import Button from "../../../../../shared/components/Button/Button";
import ConfirmationModal from "../../../../../shared/components/Modal/ConfirmationModal/ConfirmationModal";
import Modal from "../../../../../shared/components/Modal/Modal";
import SingleDatePicker from "../../../../../shared/components/SingleDatePicker/SingleDatePicker";
import { IssueTypes } from "../../../../../shared/constants/issues";
import { Container, Diviser, Fieldset, ModalContainer } from "../Modal.style";
import Assignee from "./Assignee/Assignee";
import ChildIssue from "./ChildIssue/ChildIssue";
import Colors from "./Colors/Colors";
import DatePicker from "./DatePicker/DatePicker";
import Dates from "./Dates/Dates";
import Description from "./Description/Description";
import Header from "./Header/Header";
import { Blanket, Content, Left, Right, Wrapper } from "./IssueDetail.style";
import Priority from "./Priority/Priority";
import Reporter from "./Reporter/Reporter";
import Status from "./Status/Status";
import Title from "./Title/Title";

const getColumnIdOfTicket = (columns, ticketId) => {
	const foundColumn = Object.values(columns).find((column) =>
		column.tickets.includes(ticketId)
	);
	if (foundColumn) return foundColumn.id;
	else return null;
};

const IssueDetail = ({
	ticket,
	project,
	deleteTicket,
	deleteEpicTicket,
	updateTicket,
	linkedIssues,
	setAlert,
	...props
}) => {
	const isEpic = ticket.issueType === IssueTypes.EPIC;
	const [childIssues, setChildIssues] = useState(linkedIssues);
	const [confirmationModal, setConfirmationModal] = useState(false);

	// Close modal by removing query string of selectedIssue.
	const closeModal = () => {
		props.history.push(props.match.url);
	};

	// Check if the issue does not exist.
	if (ticket === null) {
		return (
			<Modal
				title="This issue does not exist."
				renderOptions={() => (
					<Button
						text="Back"
						variant="primary"
						onClick={closeModal}
					/>
				)}
			/>
		);
	}

	const {
		issueType,
		summary,
		description,
		reporterId,
		assigneeId,
		issuePriority,
		id: ticketId,
		key,
		createdAt,
		updatedAt,
		completedAt,
		linkedEpic,
		dueDate,
	} = ticket;

	const updateTicketField = (updatedValue) => {
		// Update ticket.
		updateTicket(ticket._id, updatedValue);
	};

	// Delete Ticket
	const handleDeleteTicket = () => {
		if (isEpic) {
			deleteEpicTicket(ticketId, childIssues);
		} else {
			const columnId = getColumnIdOfTicket(project.columns, ticketId);
			deleteTicket(ticketId, columnId);
		}
		// Close Modal.
		closeModal();
		// Attach a success alert.
		setAlert(
			`${project.key}-${ticket.key} is deleted successfully.`,
			"success"
		);
	};

	return (
		<Fragment>
			<ModalContainer>
				<Blanket onClick={closeModal} />
				<Container style={{ backgroundColor: "unset" }}>
					<Wrapper>
						<Header
							linkedEpic={linkedEpic}
							ticketKey={key}
							projectKey={project.key}
							issueType={issueType}
							closeModal={closeModal}
							setConfirmationModal={setConfirmationModal}
						/>
						<Content>
							<Left>
								<Fieldset>
									<Title
										currentValue={summary}
										updateTicketField={updateTicketField}
									/>
									<Description
										currentValue={description}
										updateTicketField={updateTicketField}
									/>
									{isEpic && (
										<ChildIssue
											epicId={ticketId}
											childIssues={childIssues}
											setChildIssues={setChildIssues}
											updateTicket={updateTicket}
											projectKey={project.key}
										/>
									)}
								</Fieldset>
							</Left>
							<Right>
								<Fieldset>
									{!isEpic ? (
										<Status
											columns={project.columns}
											columnOrder={project.columnOrder}
											projectId={project._id}
											ticket={ticket}
										/>
									) : (
										<Fragment>
											<DatePicker
												dateRange={ticket.dateRange}
												updateTicketField={
													updateTicketField
												}
												isStartDate={true}
											/>
											<DatePicker
												dateRange={ticket.dateRange}
												updateTicketField={
													updateTicketField
												}
												isEndDate={true}
											/>
										</Fragment>
									)}
									{dueDate && (
										<SingleDatePicker
											momentedDate={moment(dueDate)}
											onDateChange={(date) =>
												updateTicketField({
													field: "dueDate",
													value: date,
												})
											}
											disableBefore={moment().subtract(
												12,
												"months"
											)}
											disableAfter={moment().add(
												12,
												"months"
											)}
											label="Due date"
										/>
									)}
									<Assignee
										value={assigneeId}
										projectMembersList={project.members}
										updateTicketField={updateTicketField}
									/>
									<Priority
										value={issuePriority}
										updateTicketField={updateTicketField}
									/>
									<Reporter
										value={reporterId}
										projectMembersList={project.members}
										projectId={project._id}
										updateTicketField={updateTicketField}
									/>
									{isEpic && (
										<Colors
											value={ticket.issueColor}
											updateTicketField={
												updateTicketField
											}
										/>
									)}
									<Diviser />
									<Dates
										createAt={createdAt}
										updatedAt={updatedAt}
										completedAt={completedAt}
									/>
								</Fieldset>
							</Right>
						</Content>
					</Wrapper>
				</Container>
			</ModalContainer>
			{confirmationModal && (
				<ConfirmationModal
					title={`Are you sure you want to delete this ${
						isEpic ? "epic" : "issue"
					} ?`}
					onClick={handleDeleteTicket}
					closeModal={() => setConfirmationModal(false)}
				/>
			)}
		</Fragment>
	);
};

IssueDetail.propTypes = {
	ticket: PropTypes.object,
	project: PropTypes.object.isRequired,
	linkedIssues: PropTypes.array.isRequired,
	updateTicket: PropTypes.func.isRequired,
	deleteTicket: PropTypes.func.isRequired,
	deleteEpicTicket: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		project: selectProjectById(ownProps.currentProjectId),
		ticket: selectTicketByKey(ownProps.location.search),
		linkedIssues: selectTicketsLinkedWithEpic(ownProps.location.search),
	});

export default compose(
	withRouter,
	connect(mapStateToProps, {
		updateTicket,
		deleteTicket,
		deleteEpicTicket,
		setAlert,
	})
)(IssueDetail);
