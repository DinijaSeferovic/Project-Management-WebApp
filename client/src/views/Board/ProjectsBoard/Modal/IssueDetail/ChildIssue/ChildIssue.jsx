import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
	selectEpicTickets,
	selectNonEpicTickets,
} from "../../../../../../redux/tickets/tickets.selectors";
import Icon from "../../../../../../shared/components/Icon/Icon";
import SelectMenu from "../../../../../../shared/components/SelectMenu/SelectMenu";
import { IssueColors } from "../../../../../../shared/constants/issues";
import { SectionContainer } from "../IssueDetail.style";
import {
	AddButton,
	Close,
	IconCont,
	Key,
	Left,
	LinkedEpic,
	List,
	ListContainer,
	Right,
	RightBottom,
	RightTop,
	SectionTitle,
	SelectItem,
	Summary,
} from "./ChildIssue.style";

const IssueDetailChildIssue = ({
	epicId,
	epics,
	updateTicket,
	tickets,
	childIssues,
	setChildIssues,
	projectKey,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const addChildIssue = (ticket) => {
		setChildIssues([...childIssues, ticket._id]);
		updateTicket(ticket._id, { field: "linkedEpic", value: epicId });
	};
	const deleteChildIssue = (event, ticketId) => {
		// Prevent parent onClick firing.
		event.stopPropagation();
		setChildIssues(childIssues.filter((issue) => issue !== ticketId));
		updateTicket(ticketId, { field: "linkedEpic", value: null });
	};

	return (
		<SectionContainer>
			<SectionTitle>Child issues</SectionTitle>
			<ListContainer onClick={() => setIsMenuOpen(true)}>
				{childIssues.length > 0 ? (
					childIssues.map((issue) => {
						const thisIssue = tickets.find(
							(ticket) => ticket._id === issue
						);
						return (
							<List key={thisIssue.key} isEpicTicket={true}>
								<Close
									onClick={(event) =>
										deleteChildIssue(event, issue)
									}
								>
									<Icon
										type="close"
										isSolid={true}
										size={11}
									/>
								</Close>
								<IconCont>
									<Icon
										type={thisIssue.issueType.toLowerCase()}
										isSolid={true}
										size={12}
										top={-1}
									/>
								</IconCont>
								<Key>
									{projectKey}-{thisIssue.key}:
								</Key>
								<Summary>{thisIssue.summary}</Summary>
							</List>
						);
					})
				) : (
					<AddButton>+ Add child issue</AddButton>
				)}
			</ListContainer>
			<SelectMenu
				isActive={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				onChange={(option) => addChildIssue(option.value)}
				options={issueOptions(tickets, childIssues)}
				renderValue={({ value: ticket }) =>
					renderOption(ticket, epics, projectKey)
				}
			/>
		</SectionContainer>
	);
};

const issueOptions = (tickets, childIssues) =>
	tickets
		.filter((ticket) => !childIssues.includes(ticket._id))
		.map((ticket) => ({
			key: ticket._id,
			value: ticket,
		}));

const renderOption = (ticket, epics, projectKey) => {
	const linkedEpic = epics.find((epic) => epic._id === ticket.linkedEpic);
	return (
		<SelectItem>
			<Left>
				<Icon
					type={ticket.issueType.toLowerCase()}
					isSolid={true}
					size={13}
					top={1}
				/>
			</Left>
			<Right>
				<RightTop>
					<Key>
						{projectKey}-{ticket.key}:
					</Key>
					{ticket.summary}
				</RightTop>
				<RightBottom>
					{linkedEpic && (
						<LinkedEpic
							style={{
								backgroundColor:
									IssueColors[
										linkedEpic.issueColor.toUpperCase()
									].bg,
								color: IssueColors[
									linkedEpic.issueColor.toUpperCase()
								].font,
							}}
						>
							{linkedEpic.summary}
						</LinkedEpic>
					)}
				</RightBottom>
			</Right>
		</SelectItem>
	);
};

IssueDetailChildIssue.propTypes = {
	tickets: PropTypes.array.isRequired,
	childIssues: PropTypes.array.isRequired,
	epics: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
	tickets: selectNonEpicTickets,
	epics: selectEpicTickets,
});

export default connect(mapStateToProps, null)(IssueDetailChildIssue);
