
import type {AppContext, AppProps} from 'next/app';
import App from 'next/app';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import 'isomorphic-unfetch';

import {AppNavbar} from '@/components/shared/NavBar';
import {Hero} from '@/components/shared/Hero';
import {Footer} from '@/components/shared/Footer';
import {IPageProps} from '@/types/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';


const client = new ApolloClient<any>({
	uri: 'http://localhost:3000/graphql'
})

const MyApp = ({Component, pageProps}: AppProps) => {
	return (
		<ApolloProvider client={client}>
			<div className="portfolio-app">
				<AppNavbar />
				{Component.name === 'Home' && <Hero />}
				<div className="container">
					<Component {...pageProps} />
				</div>
				{Component.name === 'Home' && <Footer />}
			</div>
		</ApolloProvider>
	);
};

MyApp.getInitialProps = async (context: AppContextф): Promise<IPageProps> => {
	const initialProps = App.getInitialProps && (await App.getInitialProps(context));
	return {pageProps: {appData: 'App component', ...initialProps.pageProps}};
};

export default MyApp;
