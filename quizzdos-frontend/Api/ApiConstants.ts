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
	user: makeRoute(baseUrl, "users"),
	person: makeRoute(baseUrl, "people"),
	course: makeRoute(baseUrl, "courses"),
	section: makeRoute(baseUrl, "sections"),
	quiz: makeRoute(baseUrl, "quizzes"),
} as const

export const ApiEndpoints = {
	Auth: {
		login: makeRoute(controllers.auth, "login"),
		register: makeRoute(controllers.auth, "register"),
	},
	People: {
		personByUserId: makeRoute(controllers.person, "userId"),
		personById: controllers.person,
	},
	Users: {
		currentUser: makeRoute(controllers.user, "current-user"),
	},
	Courses: {
		joinedCourses: controllers.course,
		createdCourses: makeRoute(controllers.course, "creators"),
		joinCourse: controllers.course,
		addCourse: controllers.course,
		getCourse: controllers.course,
	},
	Sections: {
		addSection: controllers.section,
	},
	Quizzes: {
		addQuiz: controllers.quiz,
		fetchQuizQuestions: controllers.quiz,
		putQuizQuestions: controllers.quiz,
		getQuiz: controllers.quiz,
		gradeQuiz: controllers.quiz,
	},
} as const
