function timeAgo(date) {
	const currentDate = new Date()
	const timeDifference = currentDate - date

	const seconds = Math.floor(timeDifference / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const weeks = Math.floor(days / 7)
	const months = Math.floor(days / 30.44) // Approximate average month length
	const years = Math.floor(days / 365)

	if (seconds < 60) {
		return seconds + " seconds"
	} else if (minutes < 60) {
		return minutes + " minutes"
	} else if (hours < 24) {
		return hours + " hours"
	} else if (days < 7) {
		return days + " days"
	} else if (weeks < 4.33) {
		// Approximate average month length
		return weeks + " weeks"
	} else if (months < 12) {
		return months + " months"
	} else {
		return years + " years"
	}
}

export { timeAgo }
