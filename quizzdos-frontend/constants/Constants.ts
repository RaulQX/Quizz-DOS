export const ROLES = {
	student: 0,
	professor: 1,
	admin: 2,
} as const

export const GENDERS = {
	notSpecified: 0,
	male: 1,
	female: 2,
} as const

export const QUIZ_STATUS = {
	unopened: 0,
	inProgress: 1,
	done: 2,
}
