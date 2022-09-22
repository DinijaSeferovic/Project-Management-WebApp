import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import short from "short-uuid";
import styled from "styled-components";
import { setAlert } from "../../../../../redux/alert/alert.actions";
import { updateProject } from "../../../../../redux/projects/projects.actions";
import store from "../../../../../redux/store";
import Icon from "../../../../../shared/components/Icon/Icon";
import useOutsideClick from "../../../../../shared/hooks/useOutsideClick";
import {
	Container,
	Content,
	Option,
	Options,
	TitleInput,
	Top,
	TopContent,
} from "./Column.style";

const ColumnCreate = ({
	closeColumn,
	project: { _id: projectId, columns, columnOrder },
}) => {
	const [title, setTitle] = useState("");
	const containerRef = useRef();

	useOutsideClick(containerRef, () => {
		// Close create column field.
		closeColumn();
	});

	useEffect(() => {
		containerRef.current.scrollIntoView();
	}, []);

	const createNewColumn = () => {
		const trimmedTitle = title.trim();

		// Close create column field.
		closeColumn();

		if (trimmedTitle.length === 0) return;
		// Generate a short uuid for a new column id.
		const newColumnId = short.generate();
		const formValue = {
			columns: {
				...columns,
				[newColumnId]: {
					id: newColumnId,
					title: trimmedTitle,
					isDoneColumn: false,
					taskIds: [],
				},
			},
			columnOrder: [...columnOrder, newColumnId],
		};
		store.dispatch(updateProject(projectId, formValue));
		store.dispatch(setAlert("A new column is created !", "success"));
	};

	return (
		<OuterContainer>
			<Container ref={containerRef}>
				<Top>
					<TopContent>
						<TitleInput
							type="text"
							autoFocus
							maxLength="30"
							placeholder="Column name"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Options>
							<Option onClick={createNewColumn}>
								<Icon type="check" size={12} isSolid={true} />
							</Option>
							<Option onClick={closeColumn}>
								<Icon type="close" size={12} isSolid={true} />
							</Option>
						</Options>
					</TopContent>
				</Top>
				<Content></Content>
			</Container>
		</OuterContainer>
	);
};

const OuterContainer = styled.div`
	display: flex;
	padding-right: 5px;
`;

ColumnCreate.propTypes = {
	project: PropTypes.object.isRequired,
	closeColumn: PropTypes.func.isRequired,
};

export default ColumnCreate;
