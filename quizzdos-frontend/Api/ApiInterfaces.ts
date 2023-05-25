
export interface User {
	username: string
	email: string
	phoneNumber: string
	password: string
}

export type EGender = 0 | 1 | 2
export type PRole = 0 | 1 | 2

export interface NewAccountDetails {
	firstName: string
	lastName: string
	gender: EGender
}