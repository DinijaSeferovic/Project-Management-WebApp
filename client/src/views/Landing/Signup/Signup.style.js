import { Link } from "react-router-dom";
import styled from "styled-components";
import { color, fontSize } from "../../../shared/utils/styles";

export const LoginContainer = styled.div`
	padding: 0 1.5em;
	max-width: 400px;
	margin: 0 auto;
`;

export const FormTitle = styled.h2`
	color: ${color.textDark};
	margin-bottom: 1.7em;
	margin-top: 1em;
	font-weight: 600;
	font-size: 24px;
`;

export const GrayText = styled.span`
	color: ${color.textVeryLight};
	font-weight: 500;
`;

export const FormSmallText = styled.p`
	font-size: ${fontSize.small};
	text-align: left;
`;
export const LinkText = styled(Link)`
	color: ${color.textLink};
	font-weight: 600;
`;
