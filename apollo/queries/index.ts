import {gql} from 'apollo-boost';

export const GET_PORTFOLIO = gql`
	query Portfolio($id: ID) {
		portfolio(id: $id) {
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
	}
`;

export const GET_PORTFOLIOS = gql`
	query Portfolios {
		portfolios {
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
	}
`;

export const CREATE_PORTFOLIO = gql`mutation CreatePortfolio {
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
	}
`;

export 	const UPDATE_PORTFOLIO = gql`
		mutation UpdatePortfolio($id: ID) {
			updatePortfolio (id: $id, portfolio: {
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
		}
`;

export const DELETE_PORTFOLIO = gql`
	mutation DeletePortfolio($id: ID) {
		deletePortfolio(id: $id)
	}`;
