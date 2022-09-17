import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MostWantedProvider } from '../context/WantedListProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MostWantedProvider>
			<Component {...pageProps} />
		</MostWantedProvider>
	)
}

export default MyApp
