import { useCallback, useEffect } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { PeopleListType, useMostWantedContext, ItemsType, ImageType } from '../context/WantedListProvider'
import useMediaQuery from '../hooks/useMediaQuery'
import ImageWithHideOnError from '../components/ImageWithOnError'
import { useLocalStorage } from 'usehooks-ts'

type MostWantedContextType = {
	list: PeopleListType
	currentPage: number
	prevPage: number
	nextPage: number
	amtOfPages: number
	totalPages: number
	fetchDataByPageNum: (x: number) => Promise<any>
}

const inlineStyles = {
	noMargin: { margin: 0, width: '250px' },
	nav: { position: 'sticky', top: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'end', margin: '5px', background: 'black', zIndex: 9, borderBottom: '1px solid rgb(255 255 255 / 40%)' }
}

const Pagination = ({ currentPage, prevPage, nextPage, getPageBy }: any) => {
	return <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px' }}>
		{currentPage === 1 ? <></> : <button style={{ cursor: 'pointer' }} onClick={() => getPageBy(prevPage)}>Previous</button>}
		<button style={{ cursor: 'pointer' }} onClick={() => getPageBy(nextPage)}>Next</button>
	</div>
}

// todo add loader for images
// todo

const getRewardMoney = (str: string | any) => !!str && str.match(/[\d,]+\.\d+/)[0]

const Home: NextPage = () => {
	const data: MostWantedContextType = useMostWantedContext()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const [savedCurrentPage, setSavedCurrentPage] = useLocalStorage('current-page', 1)

	const {
		list,
		currentPage,
		prevPage,
		nextPage,
		amtOfPages,
		totalPages,
		fetchDataByPageNum
	} = data

	const items: ItemsType[] = list[list.currentPage]?.items

	useEffect(() => {
		fetchDataByPageNum(savedCurrentPage)
	}, [savedCurrentPage])

	const getPageBy = useCallback(async (pg: number) => {
		setSavedCurrentPage(pg)
		await fetchDataByPageNum(pg)
	}
		, [fetchDataByPageNum])

	return (
		<div className={styles.container}>
			<Head>
				<title>fbi most wanted</title>
				<meta name="description" content="fbi's most wanted bounties" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div style={inlineStyles.nav}>
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
						<h2 style={inlineStyles.noMargin}>Bounties</h2>
						<h3 style={inlineStyles.noMargin}>FBIs most wanted</h3>
					</div>
					<b style={{ width: '100%', textAlign: 'right' }}>pg {currentPage} of {amtOfPages}</b>

				</div>
				<div>
					{items &&
						items.map((item: ItemsType) => {
							return (
								<div
									key={item.uid}
									style={{
										display: 'block', width: '100%', position: 'relative'
									}}>
									{/* <p>{getRewardMoney(item?.reward_text || '')}</p> */}
									<p>{item?.reward_text || 'No reward listed'}</p>
									<p>{item?.description || 'No description'}</p>
									{item?.details && <div dangerouslySetInnerHTML={{ __html: item?.details }} />}
									<div
										style={{
											display: 'flex', maxWidth: '1000px', margin: 'auto', justifyContent: 'center', flexFlow: 'wrap'
										}}
									>
										{item?.images.map(({ caption, original }: ImageType, i: number) => {
											return (
												<div key={caption + i}>
													<ImageWithHideOnError
														src={original}
														alt={caption}
														layout="fill"
														objectFit="contain"
													/>
												</div>
											)
										})}
									</div>
									<hr />
								</div>
							)
						})}
				</div>
			</main>
			<Pagination currentPage={currentPage} prevPage={prevPage} nextPage={nextPage} getPageBy={getPageBy} />

			<footer className={styles.footer}>💰 Get that 💰</footer>
		</div >
	)
}

export default Home