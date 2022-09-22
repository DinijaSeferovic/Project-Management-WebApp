import React, { useState } from "react";
import Icon from "../Icon/Icon";
import SelectMenu from "../SelectMenu/SelectMenu";
import {
	AngleDownIcon,
	Container,
	Content,
	CurrentItem,
	Description,
	Title,
} from "./DropDownMenu.style";

function DropDownMemu({
	title,
	currentItem,
	onChange,
	options,
	renderValue,
	description,
	...props
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Container {...props}>
			<Title>{title}</Title>
			<Content
				className="drop-down-menu-content"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				<CurrentItem>{currentItem()}</CurrentItem>
				<AngleDownIcon>
					<Icon type="angle-down" isSolid={true} size={14} />
				</AngleDownIcon>
			</Content>
			<SelectMenu
				isActive={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				onChange={(option) => onChange(option)}
				options={options}
				renderValue={renderValue}
			/>
			{description && <Description>{description}</Description>}
		</Container>
	);
}

export default DropDownMemu;
