import { User } from "Api/ApiInterfaces"
import axios from "axios"
import { ApiEndpoints } from "Api/ApiConstants"

export const registerUser = async (payload: User) => {
	const res = await axios.post(ApiEndpoints.Auth.register, payload)
	return res.data
}

export const findFirstError = (
	response: ValidationResponses
): string | null => {
	const errorMessages = Object.values(response).flatMap((nestedResponse) =>
		nestedResponse ? Object.values(nestedResponse) : []
	)

	const firstError: any = errorMessages.find(
		(error: any) => error && error.error && error.message
	)

	return firstError ? firstError.message : null
}

interface ValidationResult {
	error?: boolean
	message: string
}

interface EmailValidationResponse {
	emailEmpty: ValidationResult
	emailFormat: ValidationResult
	emailTooLong: ValidationResult
	emailTooShort: ValidationResult
}

interface ExistingUserResponse {
	emailAlreadyExists: ValidationResult
	phoneNumberAlreadyExists: ValidationResult
	usernameAlreadyExists: ValidationResult
}

interface PasswordValidationResponse {
	passwordEmpty: ValidationResult
	passwordTooLong: ValidationResult
	passwordTooShort: ValidationResult
}

interface PhoneNumberValidationResponse {
	phoneNumberEmpty: ValidationResult
	phoneNumberFormat: ValidationResult
	phoneNumberLength: ValidationResult
}

interface UsernameValidationResponse {
	usernameEmpty: ValidationResult
	usernameFormat: ValidationResult
	usernameTooLong: ValidationResult
	usernameTooShort: ValidationResult
}

interface ValidationResponses {
	emailValidationResponse: EmailValidationResponse
	existingUserResponse: ExistingUserResponse
	passwordValidationResponse: PasswordValidationResponse
	phoneNumberValidationResponse: PhoneNumberValidationResponse
	usernameValidationResponse: UsernameValidationResponse
}
