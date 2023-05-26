export interface IQuiz {
	id: string
	name: string
	grade: number
}

export interface ISection {
	id: string
	name: string
	quizzes: IQuiz[]
	average: number
}

export interface ICourse {
	id: string
	shortName: string
	sections: ISection[]
}

export interface IDisplayCourses {
	id: string
	shortName: string
	sectionsNumber: number
	progress: number
	icon: string
	code: string
}