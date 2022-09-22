import React, { Fragment, useState } from "react";
import { logout } from "../../redux/auth/auth.actions";
import store from "../../redux/store";
import Icon from "../../shared/components/Icon/Icon";
import DemoModal from "./DemoModal/DemoModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import LinkList from "./LinkList/LinkList";
import {
	Blanket,
	Container,
	DemoSettingButton,
	EditButton,
	Logo,
	LogoutButton,
	MainContent,
	ResizeButton,
	Top,
	UserIcon,
	UserProfile,
	UserProfileOverview,
	Wrapper,
} from "./Sidebar.style";

const Sidebar = ({
	user: { name, role, pictureUrl },
	roles,
	secondaryView,
	setSecondaryView,
}) => {
	const [profileModal, setProfileModal] = useState(false);
	const [demoModal, setDemoModal] = useState(false);
	return (
		<Fragment>
			<Blanket
				onClick={setSecondaryView}
				className="side-bar-blanket"
				isActive={secondaryView}
			></Blanket>
			<Container
				className={
					secondaryView ? "secondary-side-bar" : "default-side-bar"
				}
			>
				<Wrapper>
					<div>
						<Top className="side-bar-top">
							<Logo className="side-bar-logo" />
							<ResizeButton className="resize-button">
								<Icon
									onClick={setSecondaryView}
									type="circle-left"
									size={22}
									isSolid={true}
								/>
							</ResizeButton>
						</Top>
						<MainContent className="side-bar-main">
							<UserProfile>
								<EditButton
									onClick={() => setProfileModal(true)}
								>
									<Icon type="pen" size={11} isSolid={true} />
								</EditButton>
								<UserIcon>
									<Icon
										onClick={() => setProfileModal(true)}
										type="user-icon"
										imageUrl={pictureUrl}
										size={47}
									/>
								</UserIcon>
								<UserProfileOverview>
									<p className="profile-name">{name}</p>
									<p className="profile-role">{role}</p>
								</UserProfileOverview>
							</UserProfile>
							<nav>
								<ul>
									{Object.values(roles).map((component) => (
										<LinkList
											key={component._id}
											{...component}
											closeModal={() => {
												if (secondaryView) {
													setSecondaryView();
												}
											}}
										/>
									))}
								</ul>
							</nav>
						</MainContent>
					</div>
					<div>
						<DemoSettingButton
							className="side-bar-demo-button"
							onClick={() => setDemoModal(true)}
						>
							<Icon type="demo" size={13} isSolid={true} />
							<span>Demo Options</span>
						</DemoSettingButton>
						<LogoutButton
							className="side-bar-logout"
							onClick={() => store.dispatch(logout())}
						>
							<i className="fas fa-sign-out-alt"></i>
							<span>Logout</span>
						</LogoutButton>
					</div>
				</Wrapper>
			</Container>
			{profileModal && (
				<EditProfileModal closeModal={() => setProfileModal(false)} />
			)}
			{demoModal && <DemoModal closeModal={() => setDemoModal(false)} />}
		</Fragment>
	);
};

export default Sidebar;
