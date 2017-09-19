export default function formatDisplayDate(date) {
	const d = new Date(date)
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return `${monthNames[d.getMonth()]} ${d.getDate()} ${(d.getHours() > 12) ? d.getHours() - 12 : d.getHours()}:${(d.getMinutes() >= 10) ? d.getMinutes() : '0' + d.getMinutes()}${(d.getHours() >= 12) ? "PM" : "AM"}`
}
