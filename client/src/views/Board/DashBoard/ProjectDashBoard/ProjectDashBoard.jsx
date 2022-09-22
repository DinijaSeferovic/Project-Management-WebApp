import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectProjectById } from "../../../../redux/projects/projects.selectors";
import { IssueTypes } from "../../../../shared/constants/issues";
import {
	Row,
	SectionContainer,
	SectionContent,
	SectionTitle,
} from "../DashBoard.style";
import AssignedList from "./AssignedList/AssignedList";
import DoughnutChart from "./DoughnutChart/DoughnutChart";
import IssueTypeBlocks from "./IssueTypes/IssueTypes";
import ProjectOverview from "./ProjectOverview/ProjectOverview";

const ProjectDashBoard = ({ projectId, tickets, project }) => {
	// If the project does not exist, redirect back.
	if (project === null) {
		return <Redirect to="/app/dashboard" />;
	}

	return (
		<Fragment>
			<Row>
				<SectionContainer width="55%">
					<ProjectOverview projectId={projectId} />
				</SectionContainer>
				<SectionContainer width="43%" noBoxShadow={true}>
					<IssueTypeBlocks tickets={tickets} />
				</SectionContainer>
			</Row>
			<Row>
				<SectionContainer width="49%">
					<SectionTitle>Issue Status</SectionTitle>
					<DoughnutChart
						projectId={projectId}
						tickets={tickets.filter(
							(ticket) => ticket.issueType !== IssueTypes.EPIC
						)}
					/>
				</SectionContainer>
				<SectionContainer width="49%">
					<SectionTitle>Assigned to me</SectionTitle>
					<SectionContent height="400px">
						<AssignedList
							projectId={projectId}
							tickets={tickets}
							projectKey={project.key}
						/>
					</SectionContent>
				</SectionContainer>
			</Row>
		</Fragment>
	);
};

ProjectDashBoard.propTypes = {};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		project: selectProjectById(ownProps.projectId),
	});

export default connect(mapStateToProps, null)(ProjectDashBoard);
