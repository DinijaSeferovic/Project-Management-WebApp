import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setAlert } from "../../../../../redux/alert/alert.actions";
import { selectUser } from "../../../../../redux/auth/auth.selectors";
import { selectCurrentProject } from "../../../../../redux/projects/projects.selectors";
import {
	createNewEpicTicket,
	createNewTicket,
} from "../../../../../redux/tickets/tickets.actions";
import Input from "../../../../../shared/components/Form/Input/Input";
import {
	IssueColors,
	IssuePriorities,
	IssueTypes,
} from "../../../../../shared/constants/issues";
import {
	Container,
	Content,
	Diviser,
	Fieldset,
	ModalContainer,
} from "../Modal.style";
import Assignee from "./Assignee/Assignee";
import ChildIssue from "./ChildIssue/ChildIssue";
import Colors from "./Colors/Colors";
import Description from "./Description/Description";
import {
	ButtonsContainer,
	CustomSingleDatePicker,
	InnerWrapper,
	SubmitButton,
	TextButton,
	Title,
} from "./IssueCreate.style";
import Priority from "./Priority/Priority";
import RangedDatePicker from "./RangedDatePicker/RangedDatePicker";
import Reporter from "./Reporter/Reporter";
import Type from "./Type/Type";

const IssueCreate = ({
	setIsModalOpen,
	project,
	userProfile,
	createNewTicket,
	createNewEpicTicket,
	isEpic,
	defaultStartDate,
	setAlert,
}) => {
	const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
	const [issueFormValues, setIssueFormValues] = useState({
		projectId: project._id,
		issueType: !isEpic ? IssueTypes.TASK : IssueTypes.EPIC,
		summary: "",
		description: "",
		reporterId: userProfile._id,
		assigneeId: "",
		issuePriority: IssuePriorities.MEDIUM,
	});
	// Regular task spesific state.
	const [dueDate, setDueDate] = useState(null);
	// Epic specific state.
	const [childIssues, setChildIssues] = useState([]);
	const [issueColor, setIssueColor] = useState(IssueColors.PURPLE.name);
	const [dateRange, setDateRange] = useState({
		startDate: defaultStartDate ? defaultStartDate : null,
		endDate: null,
	});

	const {
		issueType,
		summary,
		description,
		reporterId,
		assigneeId,
		issuePriority,
	} = issueFormValues;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEpic) {
			// Add epic specific states.
			createNewEpicTicket(
				{ ...issueFormValues, issueColor, dateRange },
				childIssues
			);
			setAlert("A new epic is created !", "success");
		} else {
			// Set a linked epic null.
			issueFormValues.linkedEpic = null;
			// Add dueDate property.
			issueFormValues.dueDate = dueDate;
			// Get first column where a new ticket is added onto.
			const columnId = "column-1";
			issueFormValues.columnId = columnId;
			// Create a new ticket with the form values.
			createNewTicket(issueFormValues, columnId);
			setAlert("A new issue is created !", "success");
		}
		// Close this modal.
		setIsModalOpen(false);
	};

	const handleSelectMenu = (name, value) => {
		setIssueFormValues({ ...issueFormValues, [name]: value });
	};

	return (
		<ModalContainer>
			<Container
				onClick={() => {
					if (isSelectMenuOpen) setIsSelectMenuOpen(false);
				}}
			>
				<Content>
					<form onSubmit={handleSubmit}>
						<Title>
							Create {isEpic ? "epic" : "issue"} for{" "}
							<em>{project.name}</em>
						</Title>
						<InnerWrapper>
							<Fieldset>
								<Type
									isEpic={isEpic}
									issueType={issueType}
									handleSelectMenu={handleSelectMenu}
								/>
								<Priority
									issuePriority={issuePriority}
									handleSelectMenu={handleSelectMenu}
								/>
								{!isEpic && (
									<CustomSingleDatePicker
										momentedDate={dueDate}
										onDateChange={(date) =>
											setDueDate(date)
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
								<Diviser />
								<Input
									label="Summary*"
									type="text"
									name="summary"
									value={summary}
									onChange={(e) =>
										setIssueFormValues({
											...issueFormValues,
											summary: e.target.value,
										})
									}
									style={{ minHeight: "35px" }}
									required
								/>
								<Description
									value={description}
									onChange={(text) =>
										setIssueFormValues({
											...issueFormValues,
											description: text,
										})
									}
								/>
								{isEpic && (
									<Fragment>
										<RangedDatePicker
											dateRange={dateRange}
											setDateRange={setDateRange}
										/>
										<ChildIssue
											childIssues={childIssues}
											setChildIssues={setChildIssues}
										/>
										<Colors
											issueColor={issueColor}
											setIssueColor={setIssueColor}
										/>
									</Fragment>
								)}
								<Assignee
									assigneeId={assigneeId}
									projectMembersList={project.members}
									handleSelectMenu={handleSelectMenu}
								/>
								<Reporter
									reporterId={reporterId}
									projectMembersList={project.members}
									handleSelectMenu={handleSelectMenu}
								/>
							</Fieldset>
						</InnerWrapper>
						<ButtonsContainer isEpicModal={false}>
							<SubmitButton value="Create" type="submit" />
							<TextButton onClick={() => setIsModalOpen(false)}>
								Cancel
							</TextButton>
						</ButtonsContainer>
					</form>
				</Content>
			</Container>
		</ModalContainer>
	);
};

IssueCreate.propTypes = {
	userProfile: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	createNewTicket: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	userProfile: selectUser,
	project: selectCurrentProject,
});

export default connect(mapStateToProps, {
	createNewTicket,
	createNewEpicTicket,
	setAlert,
})(IssueCreate);
