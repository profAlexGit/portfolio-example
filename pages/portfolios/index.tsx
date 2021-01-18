import {NextPage} from 'next';
import Link from 'next/link';
import {PortfolioCard} from '@/components/portfolios/PortfolioCard';
import {useGetPortfolios, useCreatePortfolio, useUpdatePortfolio, useDeletePortfolio} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import {getDataFromTree} from '@apollo/react-ssr';

const Portfolios: NextPage = () => {
	const {data, loading} = useGetPortfolios();

	const [createPortfolio] = useCreatePortfolio();

	const [updatePortfolio] = useUpdatePortfolio();

	const [deletePortfolio] = useDeletePortfolio();

	if (loading) {
		return <> Loading... </>;
	}

	const portfolios = data.portfolios;

	return (
		<>
			<section className="section-title">
				<div className="px-2">
					<div className="pt-5 pb-4">
						<h1>Portfolios</h1>
					</div>
				</div>
				<button className="btn btn-primary" onClick={() => createPortfolio()}>
					Create portfolio
				</button>
			</section>
			<section className="pb-5">
				<div className="row">
					{portfolios &&
						portfolios.map((portfolio) => (
							<div key={portfolio._id} className="col-md-4">
								<Link href={`/portfolios/[id]`} as={`/portfolios/${portfolio._id}`}>
									<a className="card-link">
										<PortfolioCard {...portfolio} />
									</a>
								</Link>
								<button
									className="btn btn-warning"
									onClick={() =>
										updatePortfolio({variables: {id: portfolio._id}})
									}
								>
									Update
								</button>
								<button
									className="btn btn-danger"
									onClick={() =>
										deletePortfolio({variables: {id: portfolio._id}})
									}
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

export default withApollo(Portfolios, {getDataFromTree});
