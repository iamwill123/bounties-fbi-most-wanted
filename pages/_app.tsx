import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { MostWantedProvider } from '../context/WantedListProvider'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<MostWantedProvider>
				<Component {...pageProps} />
			</MostWantedProvider>
		</ChakraProvider>
	)
}

export default MyApp
