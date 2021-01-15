import {NextPage} from 'next';
import Link from 'next/link';
import axios from 'axios';
import {IAppProps} from '@/types/app';
import {PortfolioCard} from '@/components/portfolios/PortfolioCard';
import {IPortfolio} from '@/types/portfolio.types';
import {TPortfoliosResponse} from '@/types/response.types';


interface IProps extends IAppProps {
	portfolios: IPortfolio[];
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
						<div key={portfolio._id} className="col-md-4">
							<Link href={`/portfolios/[id]`} as={`/portfolios/${portfolio._id}`}>
								<a className="card-link">
									<PortfolioCard {...portfolio} />
								</a>
							</Link>
						</div>
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
