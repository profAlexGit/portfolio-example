import {AppNavbar} from '@/components/shared/NavBar';
import {Hero} from '@/components/shared/Hero';
import {Footer} from '@/components/shared/Footer';

import type {AppContext, AppProps} from 'next/app';
import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import {IPageProps} from '@/types/app';

const MyApp = ({Component, pageProps}: AppProps) => {
	return (
		<div className="portfolio-app">
			<AppNavbar />
			{Component.name === 'Home' && <Hero />}
			<div className="container">
				<Component {...pageProps} />
			</div>
			{Component.name === 'Home' && <Footer />}
		</div>
	);
};

MyApp.getInitialProps = async (context: AppContext): Promise<IPageProps> => {
	const initialProps = App.getInitialProps && (await App.getInitialProps(context));
	return {pageProps: {appData: 'App component', ...initialProps.pageProps}};
};

export default MyApp;
