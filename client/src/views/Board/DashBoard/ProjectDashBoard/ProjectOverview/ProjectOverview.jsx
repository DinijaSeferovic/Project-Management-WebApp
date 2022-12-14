import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectMembers } from "../../../../../redux/members/members.selectors";
import { selectProjectById } from "../../../../../redux/projects/projects.selectors";
import Icon from "../../../../../shared/components/Icon/Icon";
import {
	Bottom,
	BottomTitle,
	Category,
	Container,
	CustomButton,
	Description,
	IconCont,
	Member,
	MemberList,
	Name,
	NameCont,
	Top,
} from "./ProjectOverview.style";

export const ProjectOverview = ({ project, members }) => {
	const membersOfProject = members.filter((member) =>
		project.members.includes(member._id)
	);
	return (
		<Container>
			<Top>
				<NameCont>
					<IconCont>
						<Icon
							type="project-icon"
							imageUrl={project.projectIconUrl}
							size={45}
						/>
					</IconCont>
					<Name>{project.name}</Name>
				</NameCont>
				<Category>{project.category}</Category>
				<Description>{project.description}</Description>
			</Top>
			<Bottom>
				<Member>
					<BottomTitle>Member : </BottomTitle>
					<MemberList>
						{membersOfProject.map((member) => {
							return (
								<li key={member._id}>
									<Icon
										type="user-icon"
										imageUrl={member.pictureUrl}
										size={30}
										top={1}
									/>
								</li>
							);
						})}
					</MemberList>
				</Member>
				<CustomButton variant="primary">
					<Link to={`/app/projects/${project._id}`}>View Board</Link>
				</CustomButton>
			</Bottom>
		</Container>
	);
};

ProjectOverview.propTypes = {
	project: PropTypes.object.isRequired,
	members: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		project: selectProjectById(ownProps.projectId),
		members: selectMembers,
	});

export default connect(mapStateToProps, null)(ProjectOverview);
