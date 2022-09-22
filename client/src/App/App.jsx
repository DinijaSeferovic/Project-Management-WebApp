import React, { Fragment, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { loadUser } from "../redux/auth/auth.actions";
import store from "../redux/store";
import setAuthToken from "../shared/utils/setAuthToken";
import Routes from "./Routes";
import BaseStyles from "./styles/BaseStyles";
import IconStyles from "./styles/IconStyles";
import NormalizeStyles from "./styles/NormalizeStyles";

const App = () => {
	useEffect(() => {
		setAuthToken(localStorage.token);
		// Check if current token is valid.
		store.dispatch(loadUser());
	}, []);

	return (
		<Fragment>
			<NormalizeStyles />
			<BaseStyles />
			<IconStyles />
			<Routes />
		</Fragment>
	);
};

export default hot(App);
