import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMembers } from "../../../../redux/members/members.selectors";
import { selectProjects } from "../../../../redux/projects/projects.selectors";
import { IssueTypes } from "../../../../shared/constants/issues";
import {
	Row,
	SectionContainer,
	SectionContent,
	SectionTitle,
} from "../DashBoard.style";
import BarChart from "./BarChart/BarChart";
import MembersList from "./MembersList/MembersList";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProjectsList from "./ProjectsList/ProjectsList";

const OverviewDashBoard = ({ tickets, projects, members }) => {
	const nonEpicTickets = tickets.filter(
		(ticket) => ticket.issueType !== IssueTypes.EPIC
	);

	return (
		<Fragment>
			<Row>
				<SectionContainer width="68%">
					<SectionTitle>Tasks</SectionTitle>
					<SectionContent height="350px">
						<BarChart
							tickets={nonEpicTickets}
							projects={projects}
						/>
					</SectionContent>
				</SectionContainer>
				<SectionContainer width="30%">
					<ProgressBar tickets={nonEpicTickets} projects={projects} />
				</SectionContainer>
			</Row>
			<ProjectsList
				tickets={nonEpicTickets}
				projects={projects}
				members={members}
			/>
			<Row>
				<SectionContainer width="100%">
					<SectionTitle>Members</SectionTitle>
					<MembersList members={members} />
				</SectionContainer>
			</Row>
		</Fragment>
	);
};

OverviewDashBoard.propTypes = {};

const mapStateToProps = createStructuredSelector({
	projects: selectProjects,
	members: selectMembers,
});

export default connect(mapStateToProps, null)(OverviewDashBoard);
