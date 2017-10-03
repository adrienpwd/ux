export const capitalizeFirst = (str) => {
	if (typeof str !== "string") return str;

	return str.replace(/\w\S*/g, (str) =>
		{
			return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
		}
	);
};
