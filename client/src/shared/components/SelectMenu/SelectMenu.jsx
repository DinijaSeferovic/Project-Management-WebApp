import React, { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Container, EmptyMessage, List, Lists } from "./SelectMenu.style";

const SelectMenu = ({
	options,
	width,
	isActive,
	onChange,
	renderValue,
	setIsMenuOpen,
	...props
}) => {
	const menuRef = useRef();

	useOutsideClick(menuRef, () => {
		if (!isActive) return;
		//else setIsMenuOpen(false);
	});

	return (
		<Container width={width} isActive={isActive} ref={menuRef} {...props}>
			<Lists>
				{options.map((option) => {
					return (
						<List
							key={option.key}
							onClick={() => {
								onChange(option);
								setIsMenuOpen(false);
							}}
						>
							{renderValue
								? renderValue({
										value: option.value,
										...option,
								  })
								: option.value}
						</List>
					);
				})}
				{options.length === 0 && (
					<EmptyMessage>No options found.</EmptyMessage>
				)}
			</Lists>
		</Container>
	);
};

export default SelectMenu;
