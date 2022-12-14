import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setAlert } from "../../../../redux/alert/alert.actions";
import { selectMembers } from "../../../../redux/members/members.selectors";
import { selectProjects } from "../../../../redux/projects/projects.selectors";
import Button from "../../../../shared/components/Button/Button";
import SearchBox from "../../../../shared/components/SearchBox/SearchBox";
import { Margin } from "../../../../shared/utils/global";
import NewProjectModal from "./Modal/NewProjectModal/NewProjectModal";
import ProjectTable from "./ProjectTable/ProjectTable";
import { Container, Title, Top } from "./SettingBoard.style";

const ProjectSettingBoard = ({ projectList, memberList, setAlert }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchFilter, setSearchFilter] = useState("");

	return (
		<Fragment>
			<Container>
				<Top>
					<Title>All Projects</Title>
					<Button
						text="Create project"
						variant="primary"
						onClick={() => {
							if (Object.keys(projectList).length >= 5) {
								setAlert(
									"You cannot create more than 5 projects with your plan.",
									"error"
								);
								return;
							}
							setIsModalOpen(true);
						}}
					/>
				</Top>
				<Margin bottom={20}>
					<SearchBox
						placeholder="Filter projects"
						width={220}
						onChange={(e) => setSearchFilter(e.target.value)}
					/>
				</Margin>
				<ProjectTable
					searchFilter={searchFilter}
					projectList={projectList}
					memberList={memberList}
				/>
			</Container>
			{isModalOpen && (
				<NewProjectModal
					projectList={projectList}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</Fragment>
	);
};

ProjectSettingBoard.propTypes = {
	projectList: PropTypes.object.isRequired,
	memberList: PropTypes.array.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	projectList: selectProjects,
	memberList: selectMembers,
});

export default connect(mapStateToProps, { setAlert })(ProjectSettingBoard);
