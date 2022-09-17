import {
	createContext,
	JSXElementConstructor,
	ReactElement,
	ReactFragment,
	ReactPortal,
	useContext,
} from 'react'
import useMostWantedList from '../hooks/useMostWantedList'

export type File = {
	name: string | null
	url: string | null
}

export type ImageType = {
	caption: string | any
	large: string | any
	original: string | any
	thumb: string | any
}

export type ItemsType = {
	'@id': string | null
	additional_information: string | null
	age_max: number | null
	age_min: number | null
	age_range: number | null
	aliases: [] | null
	build: string | null
	caution: string | null
	complexion: [] | null
	coordinates: [] | null
	dates_of_birth_used: [] | null
	description: string | null
	details: string | any
	eyes: string | null
	eyes_raw: string | null
	field_offices: [] | null
	files: File[] | null
	hair: string | null
	hair_raw: string | null
	height_max: number | null
	height_min: number | null
	images: ImageType[] | string | any
	languages: [] | null
	legat_names: [] | null
	locations: [] | null
	modified: string | null
	nationality: string | null
	ncic: string | null
	occupations: string[] | null
	path: string | null
	person_classification: string | null
	place_of_birth: string | null
	possible_countries: null
	possible_states: null
	publication: string | null
	race: string | null
	race_raw: string | null
	remarks: string | null
	reward_max: number | 0
	reward_min: number | 0
	reward_text: string | null
	scars_and_marks: string | null
	sex: string | null
	status: string | null
	subjects: string[] | null
	suspects: string[] | null
	title: string | any
	uid: string | null
	url: string | null
	warning_message: string | null
	weight: string | null
	weight_max: number | null
	weight_min: number | null
}

export interface PeopleListType {
	currentPage: number
	totalPages: number
	[page: number]: {
		total: number
		items: ItemsType[]
		page: number
	}
}

const MostWantedContext = createContext<PeopleListType | any>({})

export const useMostWantedContext = () => {
	const context = useContext(MostWantedContext)
	return context
}

export const MostWantedProvider = (props: {
	children:
	| string
	| number
	| boolean
	| ReactElement<any, string | JSXElementConstructor<any>>
	| ReactFragment
	| ReactPortal
	| null
	| undefined
}) => {
	const {
		list,
		currentPage,
		prevPage,
		amtOfPages,
		nextPage,
		totalPages,
		fetchDataByPageNum
	} = useMostWantedList()

	if (!list) return null

	const providerValues = {
		list,
		currentPage,
		prevPage,
		amtOfPages,
		nextPage,
		totalPages,
		fetchDataByPageNum
	}

	return (
		<MostWantedContext.Provider
			value={providerValues}>
			{props.children}
		</MostWantedContext.Provider>
	)
}
