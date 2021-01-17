import {NextPage} from 'next';
import Link from 'next/link';
import axios from 'axios';
import {IAppProps} from '@/types/app';
import {PortfolioCard} from '@/components/portfolios/PortfolioCard';
import {IPortfolio} from '@/types/portfolio.types';
import {
	TCreatePortfolioResponse,
	TDeletePortfolioResponse,
	TPortfoliosResponse,
	TUpdatePortfolioResponse,
} from '@/types/response.types';
import {useState} from 'react';

interface IProps extends IAppProps {
	graphPortfolios: IPortfolio[];
}

const fetchPortfolios = () => {
	const query = `query Portfolios {
			portfolios {
				_id
				title
				jobTitle
				description
				startDate
				endDate
			}
		}`;

	return axios
		.post<TPortfoliosResponse>('http://localhost:3000/graphql', {query})
		.then(({data: graph}) => graph.data)
		.then((data) => data.portfolios);
};

const graphCreatePortfolio = async () => {
	const query = `mutation CreatePortfolio {
			createPortfolio (portfolio: {
				title: "New title"
				company: "New Company"
				companyWebsite: "https://google.com"
				location: "New location"
				jobTitle: "New JobTitle"
				description: "New Description"
				startDate: "New StartDate"
				endDate: "New EndDate"
			}) {
				_id
				title
				company
				companyWebsite
				location
				jobTitle
				description
				startDate
				endDate
			}
		}`;

	return axios
		.post<TCreatePortfolioResponse>('http://localhost:3000/graphql', {query})
		.then(({data: graph}) => graph.data)
		.then((data) => data.createPortfolio);
};

const graphDeletePortfolio = async (id: string) => {
	const query = `mutation DeletePortfolio {
		deletePortfolio(id: "${id}")
	}`;

	return axios
		.post<TDeletePortfolioResponse>('http://localhost:3000/graphql', {query})
		.then(({data: graph}) => graph.data)
		.then((data) => data.deletePortfolio);
};
const graphUpdatePortfolio = async (id: string) => {
	const query = `mutation UpdatePortfolio {
			updatePortfolio (id: "${id}", portfolio: {
				title: "Update title"
				company: "Update Company"
				companyWebsite: "https://google.com"
				location: "Update location"
				jobTitle: "Update JobTitle"
				description: "Update Description"
				startDate: "Update StartDate"
				endDate: "Update EndDate"
			}) {
				_id
				title
				company
				companyWebsite
				location
				jobTitle
				description
				startDate
				endDate
			}
		}`;

	return axios
		.post<TUpdatePortfolioResponse>('http://localhost:3000/graphql', {query})
		.then(({data: graph}) => graph.data)
		.then((data) => data.updatePortfolio);
};

const Portfolios: NextPage<IProps> = ({graphPortfolios}) => {
	const [portfolios, setPortfolios] = useState<IPortfolio[]>(graphPortfolios);

	const createPortfolio = async () => {
		const portfolio = await graphCreatePortfolio();
		setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
	};

	const updatePortfolio = async (id: string) => {
		const newPortfolio = await graphUpdatePortfolio(id);
		const idx = portfolios.findIndex((p) => p._id === id);
		const newPortfolios = [...portfolios];
		newPortfolios[idx] = newPortfolio;
		setPortfolios(newPortfolios);
	};

	const deletePortfolio = async (id: string) => {
		const deletedId = await graphDeletePortfolio(id);
		const idx = portfolios.findIndex((p) => p._id === deletedId);
		const newPortfolios = [...portfolios];
		newPortfolios.splice(idx, 1);
		setPortfolios(newPortfolios);
	};

	return (
		<>
			<section className="section-title">
				<div className="px-2">
					<div className="pt-5 pb-4">
						<h1>Portfolios</h1>
					</div>
				</div>
				<button className="btn btn-primary" onClick={createPortfolio}>
					Create portfolio
				</button>
			</section>
			<section className="pb-5">
				<div className="row">
					{portfolios.map((portfolio) => (
						<div key={portfolio._id} className="col-md-4">
							<Link href={`/portfolios/[id]`} as={`/portfolios/${portfolio._id}`}>
								<a className="card-link">
									<PortfolioCard {...portfolio} />
								</a>
							</Link>
							<button
								className="btn btn-warning"
								onClick={() => updatePortfolio(portfolio._id)}
							>
								Update
							</button>
							<button
								className="btn btn-danger"
								onClick={() => deletePortfolio(portfolio._id)}
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

Portfolios.getInitialProps = async () => {
	const graphPortfolios = await fetchPortfolios();
	return {graphPortfolios} as IProps;
};

export default Portfolios;
