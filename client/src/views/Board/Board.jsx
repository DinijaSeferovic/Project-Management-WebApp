import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectRoles } from "../../redux/roles/roles.selectors";
import Alert from "../Alert/Alert";
import NotFound from "../NotFound/NotFound";
import Sidebar from "../Sidebar/Sidebar";
import { Container, LayoutContainer } from "./Board.style";
import * as Components from "./components";

const Board = ({ user, roles }) => {
	const [secondaryView, setSecondaryView] = useState(false);
	return (
		<LayoutContainer>
			<Sidebar
				user={user}
				roles={roles}
				secondaryView={secondaryView}
				setSecondaryView={() => setSecondaryView(!secondaryView)}
			/>
			<Container secondaryView={secondaryView}>
				<Alert />
				<Switch>
					{Object.values(roles).map((role) => {
						const Component = Components[role.component];
						return (
							<Route
								key={role.id}
								path={`/app/${role.linkUrl}/${role.linkVariable}`}
								render={(props) => (
									<Component
										component={role}
										baseUrl={`/app/${role.linkUrl}`}
										{...props}
									/>
								)}
							/>
						);
					})}
					<Route component={NotFound} />
				</Switch>
			</Container>
		</LayoutContainer>
	);
};

Board.propTypes = {
	user: PropTypes.object.isRequired,
	roles: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
	roles: selectRoles,
});

export default connect(mapStateToProps)(Board);
