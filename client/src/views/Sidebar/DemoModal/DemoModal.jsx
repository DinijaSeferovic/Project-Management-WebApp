import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
	demoLogin,
	logout,
	updateCurrentUserRole,
} from "../../../redux/auth/auth.actions";
import { selectUser } from "../../../redux/auth/auth.selectors";
import { selectMembers } from "../../../redux/members/members.selectors";
import Button from "../../../shared/components/Button/Button";
import DropDownMemu from "../../../shared/components/DropDownMenu/DropDownMenu";
import Icon from "../../../shared/components/Icon/Icon";
import Modal from "../../../shared/components/Modal/Modal";
import { descriptiveRoleNames } from "../../../shared/constants/roles";
import {
	Action,
	CloseButton,
	MemberOption,
	MenuOption,
} from "./DemoModal.style";

const DemoModal = ({
	closeModal,
	currentUser,
	memberList,
	updateCurrentUserRole,
	demoLogin,
	logout,
	...props
}) => {
	const [formValues, setFormValues] = useState({
		role: currentUser.role,
		user: currentUser._id,
	});

	const { role, user } = formValues;

	const newUser = memberList.find((member) => member._id === user);
	const newRole = Object.values(descriptiveRoleNames).find(
		(descRole) => descRole.id === role
	);

	const handleRoleUpdate = async () => {
		if (role === currentUser.role) return;

		// Update user with a new role.
		await updateCurrentUserRole(currentUser._id, role);

		props.history.push("/");
	};

	const handleUserChange = async () => {
		if (user === currentUser._id) return;
		// Logout.
		await logout();
		// Login for demo without validating password.
		await demoLogin({ email: newUser.email });
	};

	return (
		<Modal
			title="Demo Options"
			modalWidth={650}
			closeOnBlanket={closeModal}
		>
			<CloseButton onClick={closeModal}>
				<Icon type="times" size={20} isSolid={true} />
			</CloseButton>
			<DropDownMemu
				title="Choose a role"
				currentItem={() => (
					<MenuOption>
						{newRole.id}{" "}
						<span>
							(Have access to : <em>{newRole.description}</em>)
						</span>
					</MenuOption>
				)}
				onChange={(option) =>
					setFormValues({ ...formValues, role: option.key })
				}
				options={Object.values(descriptiveRoleNames)
					.filter((descRole) => descRole.id !== role)
					.map((role) => ({
						key: role.id,
						value: role.description,
					}))}
				renderValue={(option) => (
					<MenuOption>
						{option.key}{" "}
						<span>
							(Have access to : <em>{option.value}</em>)
						</span>
					</MenuOption>
				)}
				description="Please choose a role you want to play."
				style={{
					marginBottom: "5px",
				}}
			/>
			<Action>
				<Button
					text="Update role"
					variant="primary"
					type="submit"
					onClick={handleRoleUpdate}
					inactive={role === currentUser.role}
				/>
			</Action>
			<DropDownMemu
				title="Choose a user"
				currentItem={() => (
					<MemberOption>
						<Icon
							type="user-icon"
							imageUrl={newUser.pictureUrl}
							size={25}
							top={2}
						/>
						{newUser.name}
						<span>({newUser.role})</span>
					</MemberOption>
				)}
				onChange={(option) =>
					setFormValues({ ...formValues, user: option.key })
				}
				options={memberList
					.filter((member) => member._id !== formValues.user)
					.map((member) => ({
						key: member._id,
						value: member,
					}))}
				renderValue={({ value: member }) => (
					<MemberOption>
						<Icon
							type="user-icon"
							imageUrl={member.pictureUrl}
							size={25}
							top={2}
						/>
						{member.name}
						<span>({member.role})</span>
					</MemberOption>
				)}
				description="Please choose a member you want to demo."
				style={{
					marginBottom: "5px",
				}}
			/>
			<Action>
				<Button
					text="Login as this user"
					variant="primary"
					onClick={handleUserChange}
					inactive={user === currentUser._id}
				/>
			</Action>
		</Modal>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectUser,
	memberList: selectMembers,
});

export default compose(
	withRouter,
	connect(mapStateToProps, { updateCurrentUserRole, demoLogin, logout })
)(DemoModal);
