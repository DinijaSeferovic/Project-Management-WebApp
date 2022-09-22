export const projectCategories = {
	BUSINESS: "Business",
	MARKETING: "Marketing",
	SOFTWARE: "Software",
};

export const defaultProjectIcons = {
	FIRST: "https://i.ibb.co/gPSVF2v/project-1.png",
	SECOND: "https://i.ibb.co/gT2Hd6p/project-2.png",
	THIRD: "https://i.ibb.co/61khj1d/project-3.png",
	FOURTH: "https://i.ibb.co/m6MZ3Y8/project-4.png",
	FIFTH: "https://i.ibb.co/dmRfPqY/project-5.png",
};
export const getRandomProjectIcon = () => {
	// Get random int between 1 and 4.
	const rand = Math.floor(Math.random() * 5);
	const randomIcon = Object.values(defaultProjectIcons)[rand];

	if (!randomIcon) return Object.values(defaultProjectIcons)[0];

	return randomIcon;
};

export const defaultUserIcon = "https://i.ibb.co/YBKtrQx/default-profile.png";
