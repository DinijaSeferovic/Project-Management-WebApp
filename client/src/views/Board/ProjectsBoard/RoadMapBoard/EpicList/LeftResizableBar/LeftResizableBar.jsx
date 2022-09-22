import moment from "moment";
import React from "react";
import Draggable from "react-draggable";
import Icon from "../../../../../../shared/components/Icon/Icon";
import { ResizeBar } from "../EpicList.style";

const LeftResizableBar = ({
	epic: { id: epicId, key: epicKey, summary },
	projectId,
	epicWidth,
	setEpicWidth,
	setDragProperties,
	dateRange,
	resizeProperties,
	setResizeProperties,
	updateTicket,
	epicColorProperty,
	draggableWrapperRef,
}) => {
	const onResizeDrag = (e, ui) => {
		// When epic length is minimum length, skip.
		if (epicWidth <= 50 && ui.deltaX > 0) return;
		// Change width of the epic bar based on how much scrolled.
		setEpicWidth((lastEpicWidth) => lastEpicWidth - ui.deltaX);
		// Adjust the positoin of the epic bar.
		setDragProperties((prevState) => ({
			...prevState,
			lastPosition: prevState.currentPostion + ui.deltaX,
			currentPostion: prevState.currentPostion + ui.deltaX,
		}));
	};

	const onResizeStop = (e, ui) => {
		const newPosition = ui.lastX;
		const { startDate, endDate } = dateRange;
		const difference =
			(newPosition - resizeProperties.lastLeftResizeX) / 50;
		const newStartDate = moment(startDate).add(difference, "days");
		const isBeforeEndDate = newStartDate.isBefore(moment(endDate), "days");
		const prevDayOfEndDate = moment(endDate).subtract(1, "days");

		// Check if there's no difference.
		if (difference === 0) {
			return;
		}
		// Check if it's resized beyond the end date and current start date is
		// the prev day of end date.
		else if (
			!isBeforeEndDate &&
			moment(startDate).isSame(prevDayOfEndDate, "days")
		) {
			// Update resize properties with the new position.
			setResizeProperties({
				...resizeProperties,
				lastLeftResizeX: newPosition,
			});
			return;
		} else {
			// Prepare values for epic update.
			const updateData = {
				field: "dateRange",
				value: { ...dateRange, startDate: newStartDate },
			};

			// Update resize properties with the new position.
			setResizeProperties({
				...resizeProperties,
				lastLeftResizeX: newPosition,
			});

			// If new start date is not before the end date, set the previous day of the end date.
			if (!isBeforeEndDate) {
				updateData.value.startDate = prevDayOfEndDate;
			}
			// Update epic data on db.
			updateTicket(epicId, updateData);
		}
	};

	return (
		<Draggable
			axis="none"
			handle=".left-resize-bar"
			grid={[50, 50]}
			onDrag={onResizeDrag}
			onStop={onResizeStop}
			// Set offsetParent tp DraggableWrapper to prevent bugs.
			offsetParent={draggableWrapperRef.current}
		>
			<ResizeBar
				className="left-resize-bar"
				style={{ backgroundColor: epicColorProperty.light }}
			>
				<Icon
					type="grip-lines-vertical"
					size={10}
					isSolid={true}
					top={-1}
				/>
			</ResizeBar>
		</Draggable>
	);
};

LeftResizableBar.propTypes = {};

export default LeftResizableBar;
