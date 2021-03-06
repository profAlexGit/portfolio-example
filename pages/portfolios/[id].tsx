import {NextPage} from 'next';
import { ParsedUrlQuery } from 'querystring';
import withApollo from '@/hoc/withApollo';
import {getDataFromTree} from '@apollo/react-ssr';
import { useGetSinglePortfolio } from '@/apollo/actions';

interface IProps {
	query: ParsedUrlQuery;
}

const PortfolioDetail: NextPage<IProps> = ({query}) => {
	const {data, loading} = useGetSinglePortfolio(query.id as string);
	
	if (loading) {
		return <> Loading... </>
	}
	
	const {title, jobTitle, location, description, companyWebsite, startDate, endDate} = data.portfolio || {};

	return (
		<div className="portfolio-detail">
			<div className="container">
				<div className="jumbotron">
					<h1 className="display-3">{title}</h1>
					<p className="lead">{jobTitle}</p>
					<p>
						<a className="btn btn-lg btn-success" href={companyWebsite} role="button">
							See Company
						</a>
					</p>
				</div>

				<div className="row marketing">
					<div className="col-lg-6">
						<h4 className="title">Location</h4>
						<p className="text">{location}</p>

						<h4 className="title">Start Date</h4>
						<p className="text">{startDate}</p>
					</div>

					<div className="col-lg-6">
						<h4 className="title">Days</h4>
						<p className="text">44</p>

						<h4 className="title">End Date</h4>
						<p className="text">{endDate}</p>
					</div>
					<div className="col-md-12">
						<hr />
						<h4 className="title">Description</h4>
						<p>{description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

PortfolioDetail.getInitialProps = async ({query}) => {
	return {query};
};

export default withApollo(PortfolioDetail, {getDataFromTree});
