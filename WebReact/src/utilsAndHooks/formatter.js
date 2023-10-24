export function getLocaleDateString(dateAndTime, options) {
	const formatted = new Date(dateAndTime);
	//Options är en objekt där man lägger till vilka tider som ska visas exempelvis år, månad, osv
	// Exempel: const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
	return formatted.toLocaleDateString(`sv-SE`, options);
}

export function getLocaleTimeString(dateAndTime, options) {
	const formatted = new Date(dateAndTime);
	return formatted.toLocaleTimeString(`sv-SE`, options);
}

export function capitalize(dateAndTime) {
	let capitalized = `${dateAndTime.charAt(0).toUpperCase()}${dateAndTime.substring(1, dateAndTime.length)}`;
	return capitalized;
}

/// call for every item in array to get , and . appropriately
export function getSentenceDelimiter(array, i) {
	if (i + 1 === array.length) {
		return `.`
	} else {
		return `, `
	}
}

export function compareScreeningDate(dateAndTime) {
	const screeningDate = new Date(dateAndTime);
	return screeningDate.toLocaleDateString(`sv-SE`, { day: `numeric`, month: `numeric` });
}

export function displayScreeningDate(dateAndTime) {
	let date = compareScreeningDate(new Date(dateAndTime));
	let today = new Date();
	let compareToday = compareScreeningDate(today);
	let compareTomorrow = compareScreeningDate(new Date().setDate(1));
	if (date === compareToday) {
		return `Idag`;
	} else if (date === compareTomorrow) {
		return `Imorgon`;
	} else {
		return `${capitalize(getLocaleDateString(dateAndTime, { weekday: `short` }))}, ${getLocaleDateString(dateAndTime, { day: `numeric` })} ${getLocaleDateString(dateAndTime, { month: `short` }).slice(0, -1)}`
	}
}
