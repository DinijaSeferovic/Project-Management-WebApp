import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOrganizationMembers } from "../../redux/members/members.actions";
import { getOrganization } from "../../redux/organizations/organizations.actions";
import { getProjects } from "../../redux/projects/projects.actions";
import { getRoles } from "../../redux/roles/roles.actions";
import Spinner from "../../shared/components/WithSpinner/Spinner";
import Board from "./Board";

const BoardContainer = ({
	user,
	getRoles,
	getOrganization,
	getProjects,
	getOrganizationMembers,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(true);

	// Handles featching all the necessary data before rendering Board component.
	useEffect(() => {
		const fetchInitialData = async () => {
			// Get roles of the user based on user role.
			await getRoles(user.role);
			// Get organization data of the user.
			// @TODO: not perform if already stored.
			await getOrganization(user.orgId);
			// Get all the projects of the organization.
			await getProjects(user.orgId);
			// Get all the members of the organization.
			await getOrganizationMembers(user.orgId);

			setIsLoading(false);
		};
		fetchInitialData();
	}, []);

	return isLoading ? <Spinner /> : <Board user={user} {...props} />;
};

BoardContainer.propTypes = {
	user: PropTypes.object.isRequired,
	getRoles: PropTypes.func.isRequired,
	getProjects: PropTypes.func.isRequired,
	getOrganization: PropTypes.func.isRequired,
	getOrganizationMembers: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	getRoles: (userRole) => dispatch(getRoles(userRole)),
	getOrganization: (userId) => dispatch(getOrganization(userId)),
	getProjects: (orgId) => dispatch(getProjects(orgId)),
	getOrganizationMembers: (orgId) => dispatch(getOrganizationMembers(orgId)),
});

export default connect(null, mapDispatchToProps)(BoardContainer);
