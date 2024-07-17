// utils/sanitizeUsername.js
import { transliterate } from "transliteration"

const sanitizeUsername = username => {
	// Transliterate non-ASCII characters to ASCII
	let sanitized = transliterate(username)
		.replace(/[^a-zA-Z0-9._]/g, "") // Remove invalid characters
		.replace(/^[_.]+|[_.]+$/g, "") // Remove leading and trailing _ or .
		.replace(/[_.]{2,}/g, ".") // Replace multiple _ or . with a single .

	// Ensure the length is between 8 and 20 characters
	if (sanitized.length < 8) {
		sanitized = sanitized.padEnd(8, "0") // Pad with 0s if too short
	} else if (sanitized.length > 20) {
		sanitized = sanitized.substring(0, 20) // Truncate if too long
	}

	return sanitized
}

export default sanitizeUsername
