import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectAuthInfo } from "../redux/auth/auth.selectors";
import Spinner from "../shared/components/WithSpinner/Spinner";

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, checkUserCredentials, user },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!checkUserCredentials ? (
				<Spinner />
			) : isAuthenticated && user.orgId && user.role ? (
				<Component {...props} user={user} />
			) : (
				<Redirect to="/" />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
	auth: selectAuthInfo,
});

export default connect(mapStateToProps)(PrivateRoute);
