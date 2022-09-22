import PropTypes from "prop-types";
import queryString from "query-string";
import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectMembers } from "../../../../../../redux/members/members.selectors";
import { selectEpicById } from "../../../../../../redux/tickets/tickets.selectors";
import { IssueColors } from "../../.././../../../shared/constants/issues";
import {
	Bottom,
	Container,
	CustomIcon,
	Epic,
	EpicWrapper,
	TicketStatus,
	TicketSummary,
} from "./Ticket.style";

const Ticket = ({
	ticket,
	index,
	linkedEpic,
	members,
	projectKey,
	...props
}) => {
	const { issueType, _id: ticketId, key, assigneeId } = ticket;

	// Open this ticket detail modal when clicked.
	const openIssueDetailModal = () => {
		const stringified = queryString.stringify({ selectedIssue: key });
		props.history.push(`${props.match.url}?${stringified}`);
	};

	// Get assignee object of this ticket.
	const assignee = members.find((member) => member._id === assigneeId);

	return (
		<Fragment>
			<Draggable draggableId={ticketId} index={index}>
				{(provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
						onClick={openIssueDetailModal}
					>
						<TicketSummary>{ticket.summary}</TicketSummary>
						{linkedEpic && (
							<EpicWrapper>
								<Epic
									issueColor={
										IssueColors[
											linkedEpic.issueColor.toUpperCase()
										]
									}
								>
									{linkedEpic.summary}
								</Epic>
							</EpicWrapper>
						)}
						<Bottom>
							<TicketStatus
								className={`icon-issue-${issueType.toLowerCase()}`}
							>
								{projectKey}-{key}
							</TicketStatus>
							{assignee && (
								<CustomIcon
									type="user-icon"
									imageUrl={assignee.pictureUrl}
									size={27}
									style={{ height: "27px" }}
								/>
							)}
						</Bottom>
					</Container>
				)}
			</Draggable>
		</Fragment>
	);
};

Ticket.propTypes = {
	linkedEpic: PropTypes.object,
	members: PropTypes.array.isRequired,
	ticket: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		members: selectMembers,
		linkedEpic: selectEpicById(ownProps.ticket.linkedEpic),
	});

export default compose(withRouter, connect(mapStateToProps, null))(Ticket);
