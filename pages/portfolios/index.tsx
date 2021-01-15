import {NextPage} from 'next';
import axios from 'axios';
import {IAppProps} from '@/types/app';
import {PortfolioCard} from '@/components/portfolios/PortfolioCard';
import {IPortfolio} from '@/types/portfolio.types';
import { TPortfoliosResponse } from '@/types/response.types';

interface IProps extends IAppProps {
	portfolios: IPortfolio[];
}

const fetchPortfolios = () => {
	const query = `query Portfolios {
			portfolios {
				_id
				title
				company,
				companyWebsite
				location
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

const Portfolios: NextPage<IProps> = ({portfolios}) => {
	return (
		<>
			<section className="section-title">
				<div className="px-2">
					<div className="pt-5 pb-4">
						<h1>Portfolios</h1>
					</div>
				</div>
			</section>
			<section className="pb-5">
				<div className="row">
					{portfolios.map((portfolio) => (
						<PortfolioCard key={portfolio._id} {...portfolio} />
					))}
				</div>
			</section>
		</>
	);
};

Portfolios.getInitialProps = async () => {
	const portfolios = await fetchPortfolios();
	return {portfolios} as IProps;
};

export default Portfolios;
