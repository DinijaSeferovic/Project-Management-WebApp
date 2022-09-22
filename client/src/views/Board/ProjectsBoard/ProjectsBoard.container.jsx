import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUser } from "../../../redux/auth/auth.selectors";
import { setCurrentProjectId } from "../../../redux/projects/projects.actions";
import { selectProjectById } from "../../../redux/projects/projects.selectors";
import { getTicketsByProjectId } from "../../../redux/tickets/tickets.actions";
import Spinner from "../../../shared/components/WithSpinner/Spinner";
import NotFound from "../../NotFound/NotFound";
import ProjectsBoard from "./ProjectsBoard";

const ProjectsBoardContainer = ({
	project,
	getTicketsByProjectId,
	setCurrentProjectId,
	currentUser,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(true);

	// Check if the project is loaded. Returns false if it's been deleted by someone.
	const isProjectLoaded = project !== null;

	useEffect(() => {
		if (!isProjectLoaded) return;

		const fetchTickets = async () => {
			await getTicketsByProjectId(project._id);
			await setCurrentProjectId(project._id);
			setIsLoading(false);
		};
		fetchTickets();
	}, []);

	if (!isProjectLoaded) {
		return <NotFound />;
	}

	// Check if the current user is a member of the project.
	const isMember = true;
	/*project.members.filter((member) => member._id === currentUser._id)
			.length > 0;

	if (!isMember) {
		return <AccessDenied {...props} />;
	}*/

	return isLoading ? (
		<Spinner />
	) : (
		<ProjectsBoard
			key={props.match.params.tab}
			project={project}
			{...props}
		/>
	);
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		project: selectProjectById(ownProps.match.params.project),
		currentUser: selectUser,
	});

export default connect(mapStateToProps, {
	getTicketsByProjectId,
	setCurrentProjectId,
})(ProjectsBoardContainer);
