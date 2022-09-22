import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
	buildStyles,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { Link } from "react-router-dom";
import Icon from "../../../../../../shared/components/Icon/Icon";
import ProgressProvider from "../../../../../../shared/components/ProgressProvider/ProgressProvider";
import {
	Bottom,
	BottomLeftText,
	CategoryText,
	Center,
	Container,
	DescriptionText,
	ImageWithProgressBar,
	MemberList,
	NameText,
	ProgressBarInner,
	Top,
	TopRight,
} from "./ProjectBlock.style";

const ProjectBlock = ({ project, members, tickets }) => {
	const [completedPercentage, setCompletedPercentage] = useState(0);

	useEffect(() => {
		const completedPercentage = getCompletedPercentage(project, tickets);
		setCompletedPercentage(completedPercentage);
	}, []);

	const getCompletedPercentage = (project, tickets) => {
		const doneColumn = Object.values(project.columns).find(
			(column) => column.isDoneColumn
		);
		const doneIssues = 1; //doneColumn.tickets.length;

		if (doneIssues === 0) return 0;

		return Math.floor((doneIssues / tickets.length) * 100);
	};

	return (
		<Container>
			<Top>
				<div>
					<NameText>
						<Link to={`/app/projects/${project._id}`}>
							{project.name}
						</Link>
					</NameText>
					<CategoryText>{project.category}</CategoryText>
				</div>
				<TopRight>
					<ImageWithProgressBar>
						<ProgressProvider
							valueStart={0}
							valueEnd={completedPercentage}
						>
							{(value) => (
								<CircularProgressbarWithChildren
									value={value}
									strokeWidth={8}
									styles={buildStyles({
										textColor: "#fff",
										trailColor: "#dfe1e6",
										strokeLinecap: "butt",
										pathTransitionDuration: 0.8,
										pathColor: "#00cc88",
									})}
								>
									<ProgressBarInner
										imageUrl={project.projectIconUrl}
									></ProgressBarInner>
								</CircularProgressbarWithChildren>
							)}
						</ProgressProvider>
					</ImageWithProgressBar>
				</TopRight>
			</Top>
			<Center>
				<DescriptionText>{project.description}</DescriptionText>
			</Center>
			<Bottom>
				<BottomLeftText>Team: </BottomLeftText>
				<MemberList>
					{project.members.map((memberId) => {
						const memberData = members.find(
							(member) => member._id === memberId
						);
						return (
							memberData && (
								<li key={memberData._id}>
									<Icon
										type="user-icon"
										imageUrl={memberData.pictureUrl}
										size={25}
										top={1}
									/>
								</li>
							)
						);
					})}
				</MemberList>
			</Bottom>
		</Container>
	);
};

ProjectBlock.propTypes = {
	project: PropTypes.object.isRequired,
	members: PropTypes.array.isRequired,
	tickets: PropTypes.array.isRequired,
};

export default ProjectBlock;
