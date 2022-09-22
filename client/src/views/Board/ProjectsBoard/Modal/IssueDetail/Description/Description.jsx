import React, { Fragment, useState } from "react";
import Button from "../../../../../../shared/components/Button/Button";
import TextEditedContent from "../../../../../../shared/components/TextEditedContent/TextEditedContent";
import TextEditor from "../../../../../../shared/components/TextEditor/TextEditor";
import { Hover } from "../../../../../../shared/utils/global";
import { color } from "../../../../../../shared/utils/styles";
import { ButtonsContainer, Container, Label } from "./Description.style";

const Description = ({ currentValue, updateTicketField }) => {
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [description, setDescription] = useState(currentValue);
	return (
		<Container>
			<Label>Description</Label>
			{isEditorOpen ? (
				<Fragment>
					<TextEditor
						value={description}
						onChange={(text) => setDescription(text)}
					/>
					<ButtonsContainer>
						<Button
							text="Save"
							variant="primary"
							type="button"
							onClick={() => {
								updateTicketField({
									field: "description",
									value: description,
								});
								setIsEditorOpen(false);
							}}
						/>
						<Button
							text="Cancel"
							variant="text"
							type="button"
							onClick={() => setIsEditorOpen(false)}
						/>
					</ButtonsContainer>
				</Fragment>
			) : (
				<Hover bgColor={color.hoverGray} borderRadius={3}>
					<TextEditedContent
						content={currentValue}
						onClick={() => setIsEditorOpen(true)}
					/>
				</Hover>
			)}
		</Container>
	);
};

export default Description;
