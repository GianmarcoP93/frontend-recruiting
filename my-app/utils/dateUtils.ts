export function formatLocalTime(isoString: string) {
	const date = new Date(isoString);
	return date.toLocaleTimeString("it-IT", {
		hour: "2-digit",
		minute: "2-digit",
	});
}
