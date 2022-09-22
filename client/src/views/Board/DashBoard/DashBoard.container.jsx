import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProjectsIds } from "../../../redux/projects/projects.selectors";
import { getTicketsOfOrganization } from "../../../redux/tickets/tickets.actions";
import { selectTickets } from "../../../redux/tickets/tickets.selectors";
import Spinner from "../../../shared/components/WithSpinner/Spinner";
import DashBoard from "./DashBoard";

const DashBoardContainer = ({
	projectIds,
	tickets,
	getTicketsOfOrganization,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(true);
	// Handles featching necessary data before rendering DashBoard component.
	useEffect(() => {
		const fetchAllTickets = async () => {
			// Get all tickets of organization.
			await getTicketsOfOrganization(projectIds);
			setIsLoading(false);
		};
		fetchAllTickets();
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<DashBoard
			key={props.match.params.dashboard}
			tickets={tickets}
			{...props}
		/>
	);
};

DashBoardContainer.propTypes = {
	projectIds: PropTypes.array.isRequired,
	getTicketsOfOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	projectIds: selectProjectsIds,
	tickets: selectTickets,
});

export default connect(mapStateToProps, { getTicketsOfOrganization })(
	DashBoardContainer
);
