import React from "react";
import AdminSettingBoard from "./AdminSettingBoard/AdminSettingBoard";
import DashBoardContainer from "./DashBoard/DashBoard.container";
import ProjectManagementBoard from "./ProjectManagementBoard/ProjectManagementBoard";
import ProjectsBoardContainer from "./ProjectsBoard/ProjectsBoard.container";

// Private routes.
export const Dashboard = (props) => <DashBoardContainer {...props} />;
export const Projects = (props) => (
	<ProjectsBoardContainer key={props.match.params.project} {...props} />
);
export const ProjectManagement = (props) => (
	<ProjectManagementBoard {...props} />
);
export const AdminSetting = (props) => <AdminSettingBoard {...props} />;
