import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProjectMembers } from "../../../../../../redux/members/members.selectors";
import Icon from "../../../../../../shared/components/Icon/Icon";
import SelectMenu from "../../../../../../shared/components/SelectMenu/SelectMenu";
import {
	IconCont,
	SectionContainer,
	SectionContent,
	SectionTitle,
} from "../IssueDetail.style";

function Reporter({ value, updateTicketField, members }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const currentReporter = members.find((member) => member._id === value);
	return (
		<SectionContainer>
			<SectionTitle>Reporter</SectionTitle>
			<SectionContent
				className="icon-angle-down"
				onClick={() => setIsMenuOpen(true)}
			>
				<IconCont>
					<Icon
						type="user-icon"
						imageUrl={currentReporter && currentReporter.pictureUrl}
						size={30}
						top={2}
					/>
				</IconCont>
				{currentReporter && currentReporter.name}
			</SectionContent>
			<SelectMenu
				name="reporterId"
				value={value}
				isActive={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				onChange={({ value: reporter }) => {
					updateTicketField({
						field: "reporterId",
						value: reporter._id,
					});
				}}
				options={members
					.filter((member) => member._id !== value)
					.map((reporter) => ({
						key: reporter._id,
						value: reporter,
					}))}
				renderValue={({ value: reporter }) =>
					renderUser(reporter._id, members)
				}
			/>
		</SectionContainer>
	);
}

const renderUser = (reporterId, members) => {
	const member = members.find((member) => member._id === reporterId);
	return (
		<Fragment>
			<IconCont>
				<Icon
					type="user-icon"
					imageUrl={member && member.pictureUrl}
					size={30}
					top={2}
				/>
			</IconCont>
			{member && member.name}
		</Fragment>
	);
};

Reporter.propTypes = {
	value: PropTypes.string,
	updateTicketField: PropTypes.func.isRequired,
	members: PropTypes.array,
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		members: selectProjectMembers(ownProps.projectMembersList),
	});

export default connect(mapStateToProps, null)(Reporter);
