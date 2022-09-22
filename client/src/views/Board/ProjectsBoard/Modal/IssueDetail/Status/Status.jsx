import React, { useState } from "react";
import { connect } from "react-redux";
import { updateTicketStatus } from "../../../../../../redux/projects/projects.actions";
import { updateTicket } from "../../../../../../redux/tickets/tickets.actions";
import SelectMenu from "../../../../../../shared/components/SelectMenu/SelectMenu";
import { Button, Container, StyledText } from "./Status.style";

const IssueStatusMenu = ({
	columns,
	columnOrder,
	projectId,
	ticket,
	updateTicketStatus,
	updateTicket,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { _id: ticketId, columnId: currentColumnId } = ticket;

	const currentColumnData = columns[currentColumnId];

	const handleStatusChange = (newColumnId) => {
		const columnMove = {
			beforeColumn: currentColumnId,
			afterColumn: newColumnId,
		};

		updateTicketStatus(columnMove, ticketId, projectId);

		// Update columnId field of the ticket.
		updateTicket(ticketId, { field: "columnId", value: newColumnId });

		// If a new column is DONE, update completed date.
		if (columns[newColumnId].isDoneColumn) {
			updateTicket(ticketId, { field: "completedAt", value: new Date() });
		}
		// If a current column is DONE, initiate completed date.
		else if (currentColumnData.isDoneColumn) {
			updateTicket(ticketId, { field: "completedAt", value: null });
		}
	};

	return (
		<Container>
			<Button
				isFirstColumn={currentColumnId === columnOrder[0]}
				isDoneColumn={currentColumnData.isDoneColumn}
				type="button"
				className="icon-angle-down"
				onClick={() => setIsMenuOpen(true)}
			>
				{currentColumnId && currentColumnData.title}
			</Button>
			<SelectMenu
				value={currentColumnId}
				isActive={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				onChange={(updatedColumn) => {
					handleStatusChange(updatedColumn.id);
				}}
				options={Object.values(columns)
					.filter((column) => column.id !== currentColumnId)
					.map((column) => ({
						value: column.title,
						id: column.id,
						key: column.id,
					}))}
				renderValue={({ value, id }) => {
					const isFirstColumn = id === columnOrder[0];
					const isDoneColumn = columns[id].isDoneColumn;
					return (
						<StyledText
							isFirstColumn={isFirstColumn}
							isDoneColumn={isDoneColumn}
						>
							{value}
						</StyledText>
					);
				}}
			/>
		</Container>
	);
};

export default connect(null, { updateTicketStatus, updateTicket })(
	IssueStatusMenu
);
