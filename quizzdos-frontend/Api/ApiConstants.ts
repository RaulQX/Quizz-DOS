function makeRoute<B extends string, R extends string>(
	base: B,
	route: R
): `${B}/${R}` {
	return `${base}/${route}` as const
}
export const pageSize = 8

const baseUrl = "http://192.168.1.168:5000/api"

const controllers = {
	auth: makeRoute(baseUrl, "auth"),
	user: makeRoute(baseUrl, "user"),
	person: makeRoute(baseUrl, "person"),
	course: makeRoute(baseUrl, "course"),
	section: makeRoute(baseUrl, "section"),
	quiz: makeRoute(baseUrl, "quiz"),
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
	Course: {
		joinedCourses: controllers.course,
		createdCourses: controllers.course,
		joinCourse: controllers.course,
		addCourse: controllers.course,
		getCourse: makeRoute(controllers.course, "courses"),
	},
	Section: {
		addSection: controllers.section,
	},
	Quiz: {
		addQuiz: controllers.quiz,
	},
} as const