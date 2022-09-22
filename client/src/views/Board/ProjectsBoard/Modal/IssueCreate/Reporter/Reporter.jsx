import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import { selectProjectMembers } from "../../../../../../redux/members/members.selectors";
import Icon from "../../../../../../shared/components/Icon/Icon";
import SelectMenu from "../../../../../../shared/components/SelectMenu/SelectMenu";
import {
	AngleDownIcon,
	SectionContainer,
	SectionContent,
	SectionTitle,
	SelectItem,
} from "../IssueCreate.style";

const UnassignedText = styled.p`
	color: rgb(137, 147, 164);
	font-size: 14px;
`;

function IssueCreateReporterField({
	reporterId,
	handleSelectMenu,
	membersList,
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const currentMember = membersList.find(
		(member) => member._id === reporterId
	);
	return (
		<SectionContainer>
			<SectionTitle>Reporter</SectionTitle>
			<SectionContent onClick={() => setIsMenuOpen(true)}>
				<SelectItem>
					{currentMember !== undefined ? (
						<Fragment>
							<Icon
								type="user-icon"
								imageUrl={currentMember.pictureUrl}
								size={20}
								top={1}
							/>
							{currentMember.name}
						</Fragment>
					) : (
						<UnassignedText>Unassigned</UnassignedText>
					)}
				</SelectItem>
				<AngleDownIcon>
					<Icon type="angle-down" isSolid={true} size={14} />
				</AngleDownIcon>
			</SectionContent>
			<SelectMenu
				isActive={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				onChange={(option) =>
					handleSelectMenu("reporterId", option.value._id)
				}
				options={membersList
					.filter((member) => member._id !== reporterId)
					.map((member) => ({
						key: member._id,
						value: member,
					}))}
				renderValue={({ value: member }) => renderOption(member)}
			/>
		</SectionContainer>
	);
}

const renderOption = (member) => {
	return (
		<SelectItem>
			<Icon
				type="user-icon"
				imageUrl={member.pictureUrl}
				size={20}
				top={1}
			/>
			{member.name}
		</SelectItem>
	);
};

IssueCreateReporterField.propTypes = {
	reporterId: PropTypes.string.isRequired,
	membersList: PropTypes.array.isRequired,
	handleSelectMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		membersList: selectProjectMembers(ownProps.projectMembersList),
	});

export default connect(mapStateToProps, null)(IssueCreateReporterField);
