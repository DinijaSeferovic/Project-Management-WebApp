import React, { useState } from "react";
import { connect } from "react-redux";
import { refreshErrorMessage } from "../../redux/auth/auth.actions";
import store from "../../redux/store";
import CustomLinkButton from "../../shared/components/Button/CustomLinkButton/CustomLinkButton";
import WelcomePage from "../Welcome/Welcome";
import {
	Bottom,
	Container,
	FormContainer,
	Headings,
	Image,
	Left,
	Logo,
	MainHeading,
	Options,
	Right,
	SubHeading,
} from "./Landing.style";
import LoginForm from "./Login/Login";
import SignupForm from "./Signup/Signup";

const Landing = ({ errorMessage, isAuthenticated, checkUserCredentials }) => {
	const [isActive, setisActive] = useState("login");

	if (isAuthenticated && checkUserCredentials) {
		return <WelcomePage />;
	}

	return (
		<Container>
			<Left>
				<FormContainer>
					<Logo />
					{isActive !== "signup" ? <LoginForm /> : <SignupForm />}
				</FormContainer>
				<Options>
					<CustomLinkButton
						iconType="user"
						to="/"
						text="Log in"
						className={isActive === "login" ? "active" : ""}
						onClick={() => {
							setisActive("login");
							if (errorMessage)
								store.dispatch(refreshErrorMessage());
						}}
					/>
					<CustomLinkButton
						iconType="unlock"
						to="/"
						text="Sign up"
						className={isActive === "signup" ? "active" : ""}
						onClick={() => {
							setisActive("signup");
							if (errorMessage)
								store.dispatch(refreshErrorMessage());
						}}
					/>
				</Options>
			</Left>
			<Right>
				<Image />
				<Bottom>
					<Headings>
						<MainHeading>
							Prioritiz is an Easy to Use
							<br />
							Project Management Tool
						</MainHeading>
						<SubHeading>
							{" "}
							See how you can simplify your project management. It
							takes just a moment to sign in.
						</SubHeading>
					</Headings>
				</Bottom>
			</Right>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	checkUserCredentials: state.auth.checkUserCredentials,
	errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps)(Landing);
