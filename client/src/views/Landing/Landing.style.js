import styled from "styled-components";
import { media } from "../../shared/utils/global";
import { color, padding } from "../../shared/utils/styles";
import LandingBg from "./assets/landing-bg.png";
import LogoImg from "./assets/logo.png";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	min-height: 700px;
	${media.medium2`
    min-height: auto;
  `}
`;

export const Left = styled.div`
	width: 50%;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	${media.medium2`
  width: 100%;
  `}
`;

export const Right = styled.div`
	width: 50%;
	height: 100%;
	border-left: 2px solid ${color.borderLightest};
	display: flex;
	flex-direction: column;
	${media.medium2`
    display: none;
  `}
`;

export const FormContainer = styled.div`
	margin-bottom: 20px;
`;

export const Logo = styled.div`
	margin-top: 30px;
	margin-left: 250px;
	height: 90px;
	width: 270px;
	background-image: url(${LogoImg});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

export const Options = styled.div`
	width: 100%;
	border-bottom: 1px solid transparent;
	border-top: 2px solid ${color.smokewhite};
`;

export const Image = styled.div`
	height: 70%;
	background-image: url(${LandingBg});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

export const Bottom = styled.div`
	height: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Headings = styled.div`
	max-width: 620px;
	text-align: center;
	padding: 0px 20px;
`;

export const MainHeading = styled.p`
	font-size: 34px;
	font-weight: 600;
	line-height: 1.6;
	color: ${color.textDark};
	margin-bottom: 14px;
	@media (max-width: 1100px) {
		font-size: 28px;
	}
`;

export const SubHeading = styled.p`
	font-size: 18px;
	font-weight: 500;
	color: ${color.textLight};
	@media (max-width: 1100px) {
		font-size: 16px;
	}
`;

export const SubmitButton = styled.input`
	display: inline-block;
	background: ${color.primary};
	line-height: 1;
	padding: ${padding.med} ${padding.double};
	border: 0;
	text-align: center;
	cursor: pointer;
	font-weight: 400;
	color: ${color.white};
	border-radius: 5px;
	width: 100%;
	box-shadow: 0 5px ${color.quarternary};
	top: 0;
	&:active {
		position: relative;
		outline: none;
		top: 5px;
		box-shadow: none;
	}
	&:hover {
		background: ${color.highlightPrimary};
	}
`;
