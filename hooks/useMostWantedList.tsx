import { useEffect, useState } from 'react'
import { PeopleListType } from '../context/WantedListProvider'
import { isInt } from '../utils'

const URL = `https://api.fbi.gov/wanted/v1/list?page=`

const useMostWantedList = () => {
	const [list, setList] = useState<PeopleListType | any>({})

	const { currentPage, totalPages }: PeopleListType = ({} = list)

	const pages = totalPages ? totalPages / 20 : 0
	const amtOfPages = !currentPage ? 0 : isInt(pages) ? pages : Math.round(pages) + 1

	const prevPage = currentPage - 1
	const nextPage = currentPage + 1

	useEffect(() => {
		fetchDataByPageNum(1)
	}, [])

	const fetchDataByPageNum = async (pageNum: number | string) => {
		return await fetch(`${URL}${pageNum}`)
			.then((res) => res.json())
			.then((data) => {
				const pageNum = data.page
				setList((prevState: any) => ({
					...prevState,
					currentPage: data.page,
					totalPages: data.total,
					[pageNum]: {
						...data,
					}
				}))
			}).catch(err => console.error(err))
	}

	return {
		list,
		currentPage,
		prevPage,
		amtOfPages,
		nextPage,
		totalPages,
		fetchDataByPageNum
	}
}

export default useMostWantedList
