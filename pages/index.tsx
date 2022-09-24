import { useCallback, useEffect, useState } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
	PeopleListType,
	useMostWantedContext,
	ItemsType,
	ImageType,
} from '../context/WantedListProvider'
import useMediaQuery from '../hooks/useMediaQuery'
import ImageWithHideOnError from '../components/ImageWithOnError'
import { useLocalStorage } from 'usehooks-ts'
import { replace, match, keys, uniq, descend } from 'ramda'

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
	nav: {
		position: 'sticky' as 'sticky',
		top: '0px',
		display: 'flex',
		flexDirection: 'row' as 'row',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'end',
		margin: '5px',
		background: 'black',
		zIndex: 9,
		borderBottom: '1px solid rgb(255 255 255 / 40%)',
	},
}

const scrollBackToTop = () => {
	return window.scroll({
		top: 0,
		left: 0,
		behavior: 'auto'
	})
}

const Pagination = ({ currentPage, prevPage, nextPage, getPageBy }: any) => {
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				justifyContent: 'space-between',
				marginBottom: '10px',
			}}
		>
			{currentPage === 1 ? (
				<></>
			) : (
				<button
					style={{ cursor: 'pointer' }}
					onClick={() => getPageBy(prevPage)}
				>
					Previous
				</button>
			)}
			<button style={{ cursor: 'pointer' }} onClick={() => getPageBy(nextPage)}>
				Next
			</button>
		</div>
	)
}

// * Match number
const numAfter$OnlyRegex = /\$\d+(?:,\d+)*(?:\.\d+)?/

const getRewardMoney = (str: string | any) => !!str && match(numAfter$OnlyRegex, str)
// const getHighestBounty = (arr: [string]) => { }
// const getInteger = (str: string | any): any => typeof str[0] === "string" && str[0].replace(/[^\d]/g, '')
const getInteger = (str: string | any): any => str[0] && replace(/[^\d]/g, '', str[0])

const TopBountyHeader = ({ items }: any) => {
	let unorderedHashTable: any = {}
	if (items && items.length) {
		for (const i of items) {
			unorderedHashTable = { ...unorderedHashTable, [getInteger(getRewardMoney(i?.reward_text))]: getRewardMoney(i?.reward_text) }
		}
	}

	console.log("🚀 ~ file: index.tsx ~ line 96 ~ TopBountyHeader ~ keys(unorderedHashTable).reverse()", keys(unorderedHashTable).reverse())
	const orderedHashTable = keys(unorderedHashTable).reverse().reduce(
		(arr: any, key: any) => {
			arr.push(unorderedHashTable[key])
			return arr
		},
		[]
	)

	console.log("🚀 ~ file: index.tsx ~ line 89 ~ hashTable ~ hashTable", orderedHashTable[1][0])
	// TODO: sort below using hash table
	return <>{
		items && items.map((i: ItemsType) => (
			<div key={i.uid}>{getRewardMoney(i?.reward_text)}</div>
		))
	}</>
}
const Home: NextPage = () => {
	const data: MostWantedContextType = useMostWantedContext()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const [, setSavedCurrentPage] = useLocalStorage(
		'current-page',
		1
	)

	const {
		list,
		currentPage,
		prevPage,
		nextPage,
		amtOfPages,
		totalPages,
		fetchDataByPageNum,
	} = data

	const items: ItemsType[] = list[list.currentPage]?.items
	// let rangeOfBounties: string[] = []

	const getPageBy = useCallback(
		async (pg: number) => {
			scrollBackToTop()
			setSavedCurrentPage(pg)
			await fetchDataByPageNum(pg)
		},
		[fetchDataByPageNum]
	)


	return (
		<div className={styles.container}>
			<Head>
				<title>FBI's most wanted</title>
				<meta name="author" content="supwill.dev" />
				<meta name="description" content="fbi's most wanted bounties" />
				<link rel="icon" href="/favicon.ico" />

			</Head>

			<main className={styles.main}>
				<div style={inlineStyles.nav}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<h2 style={inlineStyles.noMargin}>Bounties</h2>
						<h3 style={inlineStyles.noMargin}>FBIs most wanted</h3>
					</div>
					<b style={{ width: '100%', textAlign: 'right' }}>
						pg {currentPage} of {amtOfPages}
					</b>
				</div>
				<div>
					<TopBountyHeader items={items} />

					<hr />
					{items &&
						items.map((item: ItemsType) => {
							return (
								<div
									key={item.uid}
									style={{
										display: 'block',
										width: '100%',
										position: 'relative',
									}}
								>
									{item?.reward_text && <h3 style={{ color: 'gold' }}>Bounty {getRewardMoney(item?.reward_text || '')}</h3>}
									<p>{item?.reward_text || 'No reward listed'}</p>
									<p>{item?.description || 'No description'}</p>
									{item?.details && (
										<div dangerouslySetInnerHTML={{ __html: item?.details }} />
									)}
									<div
										style={{
											display: 'flex',
											maxWidth: '1000px',
											margin: 'auto',
											justifyContent: 'center',
											flexFlow: 'wrap',
										}}
									>
										{item?.images.map(
											({ caption, original }: ImageType, i: number) => {
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
											}
										)}
									</div>
									<hr />
								</div>
							)
						})
					}

				</div>
			</main>
			<Pagination
				currentPage={currentPage}
				prevPage={prevPage}
				nextPage={nextPage}
				getPageBy={getPageBy}
			/>

			<footer className={styles.footer}>💰 Get that 💰</footer>
		</div>
	)
}

export default Home
