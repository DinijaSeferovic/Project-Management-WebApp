import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
	buildStyles,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "../../../../../shared/components/ProgressProvider/ProgressProvider";
import {
	Bottom,
	CompleteText,
	Container,
	Content,
	InnerText,
	Percentage,
	Title,
	Top,
} from "./ProgressBar.style";

export const ProgressBar = ({ tickets, projects }) => {
	const [completedPercentage, setCompletedPercentage] = useState(0);

	useEffect(() => {
		const completedPercentage = getCompletedPercentage(projects, tickets);
		setCompletedPercentage(completedPercentage);
	}, []);

	const getCompletedPercentage = (projects, tickets) => {
		let doneIssues = 0;

		Object.values(projects).forEach((project) => {
			const doneColumn = Object.values(project.columns).find(
				(column) => column.isDoneColumn
			);
			doneIssues = doneIssues + doneColumn.taskIds.length;
		});

		if (doneIssues === 0) return 0;

		return Math.floor((doneIssues / tickets.length) * 100);
	};

	return (
		<Container>
			<Top>
				<Title>Overall Progress</Title>
			</Top>
			<Content>
				<ProgressProvider valueStart={0} valueEnd={completedPercentage}>
					{(value) => (
						<CircularProgressbarWithChildren
							value={value}
							strokeWidth={3}
							circleRatio={0.75}
							styles={buildStyles({
								rotation: 1 / 2 + 1 / 8,
								textColor: "#fff",
								trailColor: "#fff",
								pathTransitionDuration: 0.8,
								pathColor: "#e93773",
							})}
						>
							<InnerText style={{ fontSize: 12, marginTop: -5 }}>
								<Percentage>
									{completedPercentage}
									<span className="percent-mark">%</span>
								</Percentage>
								<CompleteText>COMPLETED</CompleteText>
							</InnerText>
						</CircularProgressbarWithChildren>
					)}
				</ProgressProvider>
				<Bottom>
					<span>
						Completed {completedPercentage}% of {tickets.length}{" "}
						issues.
					</span>
				</Bottom>
			</Content>
		</Container>
	);
};

ProgressBar.propTypes = {
	tickets: PropTypes.array.isRequired,
	projects: PropTypes.object.isRequired,
};

export default ProgressBar;
