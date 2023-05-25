function makeRoute<B extends string, R extends string>(
	base: B,
	route: R
): `${B}/${R}` {
	return `${base}/${route}` as const
}

const baseUrl = "http://192.168.1.169:5000/api"

const controllers = {
	auth: makeRoute(baseUrl, "auth"),
	user: makeRoute(baseUrl, "user"),
	person: makeRoute(baseUrl, "person"),
} as const

export const ApiEndpoints = {
	Auth: {
		login: makeRoute(controllers.auth, "login"),
		register: makeRoute(controllers.auth, "register"),
	},
	Person: {
		personByUserId: makeRoute(controllers.person, "userId"),
		personById: controllers.person,
	},
	User: {
		currentUser: makeRoute(controllers.user, "current-user"),
	},
} as const
