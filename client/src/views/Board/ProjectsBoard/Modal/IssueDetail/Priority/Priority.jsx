import React, { Fragment, useState } from "react";
import Icon from "../../../../../../shared/components/Icon/Icon";
import SelectMenu from "../../../../../../shared/components/SelectMenu/SelectMenu";
import { IssuePriorities } from "../../../../../../shared/constants/issues";
import {
	IconCont,
	SectionContainer,
	SectionContent,
	SectionTitle,
} from "../IssueDetail.style";

function Priority({ value: currentPriority, updateTicketField }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<SectionContainer>
			<SectionTitle>Priority</SectionTitle>
			<SectionContent
				className="icon-angle-down"
				onClick={() => setIsMenuOpen(true)}
			>
				<IconCont>
					<Icon
						type={`priority-${currentPriority.toLowerCase()}`}
						isSolid={true}
						size={12}
					/>
				</IconCont>
				{currentPriority}
			</SectionContent>
			<SelectMenu
				name="issuePriority"
				value={currentPriority}
				isActive={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				onChange={({ value: updatedPriority }) => {
					updateTicketField({
						field: "issuePriority",
						value: updatedPriority,
					});
				}}
				options={Object.values(IssuePriorities)
					.filter((option) => option !== currentPriority)
					.map((option) => ({
						key: option,
						value: option,
					}))}
				renderValue={({ value: priority }) => (
					<Fragment>
						<IconCont>
							<Icon
								type={`priority-${priority.toLowerCase()}`}
								isSolid={true}
								size={12}
							/>
						</IconCont>
						{priority}
					</Fragment>
				)}
			/>
		</SectionContainer>
	);
}

Priority.propTypes = {};

export default Priority;
