import moment from "moment";
import PropTypes from "prop-types";
import queryString from "query-string";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectMembers } from "../../../../../../redux/members/members.selectors";
import { selectIssuesOfDueDate } from "../../../../../../redux/tickets/tickets.selectors";
import Icon from "../../../../../../shared/components/Icon/Icon";
import {
	IssueColors,
	IssueTypes,
} from "../../../../../../shared/constants/issues";
import {
	Container,
	Content,
	Header,
	MonthName,
	QuickAddButton,
	Summary,
	Task,
} from "./DayCell.style";
import QuickIssueCreate from "./QuickIssueCreate/QuickIssueCreate";

const DayCell = ({ momentDate, issues, members, ...props }) => {
	const [isContentActive, setIsContentActive] = useState(false);

	// Open this ticket detail modal when clicked.
	const openIssueDetailModal = (key) => {
		const stringified = queryString.stringify({ selectedIssue: key });
		props.history.push(`${props.match.url}?${stringified}`);
	};

	return (
		<Container>
			<Content
				className="day-cell"
				isToday={momentDate.isSame(moment(), "day", "month")}
				isFirstDay={momentDate.format("D") === 1}
			>
				<Header>
					<QuickAddButton
						className="icon-plus quick-add-button"
						onClick={() => {
							setIsContentActive(true);
						}}
					/>
					<MonthName>
						{momentDate.format("D") === 1 &&
							momentDate.format("MMMM")}
					</MonthName>
					{momentDate.format("D")}
				</Header>
				{issues.map((issue) => {
					const member = members.find(
						(member) => member._id === issue.assigneeId
					);
					const isEpic = issue.issueType === IssueTypes.EPIC;
					return (
						<Task
							key={issue._id}
							onClick={() => openIssueDetailModal(issue.key)}
							colorProps={
								isEpic &&
								IssueColors[issue.issueColor.toUpperCase()]
							}
						>
							{issue.assigneeId && member && (
								<Icon
									type="user-icon"
									imageUrl={member.pictureUrl}
									size={24}
									top={2}
								/>
							)}
							<Summary>{issue.summary}</Summary>
						</Task>
					);
				})}
				{isContentActive && (
					<QuickIssueCreate
						momentDate={momentDate}
						setIsContentActive={() => setIsContentActive(false)}
					/>
				)}
			</Content>
		</Container>
	);
};

DayCell.propTypes = {
	momentDate: PropTypes.object.isRequired,
	issues: PropTypes.array.isRequired,
	members: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		issues: selectIssuesOfDueDate(ownProps.momentDate),
		members: selectMembers,
	});

export default compose(withRouter, connect(mapStateToProps, null))(DayCell);
