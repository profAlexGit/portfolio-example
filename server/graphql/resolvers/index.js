const data = {
	portfolios: [
		{
			_id: 'sad87da79',
			title: 'Job in Netcentric',
			company: 'Netcentric',
			companyWebsite: 'https://google.com',
			location: 'Spain, Barcelona!',
			jobTitle: 'Engineer',
			description: 'Doing something, programing....',
			startDate: '01/01/2014',
			endDate: '01/01/2016',
		},
		{
			_id: 'da789ad1',
			title: 'Job in Siemens',
			company: 'Siemens',
			companyWebsite: 'https://google.com',
			location: 'Slovakia, Kosice',
			jobTitle: 'Software Engineer',
			description: 'Responsoble for parsing framework for JSON medical data.',
			startDate: '01/01/2011',
			endDate: '01/01/2013',
		},
		{
			_id: 'sadcxv9',
			title: 'Work in USA',
			company: 'WhoKnows',
			companyWebsite: 'https://google.com',
			location: 'USA, Montana',
			jobTitle: 'Housekeeping',
			description: 'So much responsibility....Overloaaaaaad',
			startDate: '01/01/2010',
			endDate: '01/01/2011',
		},
	],
};

exports.portfolioQueries = {
	hello: () => {
		return 'Hello world!!';
	},
	portfolio: (root, {id}) => {
		const portfolio = data.portfolios.find(({_id}) => _id === id);
		return portfolio;
	},
	portfolios: () => {
		return data.portfolios;
	},	
};

exports.portfolioMutations = {
	createPortfolio: (root, {portfolio}) => {
		const _id = require('crypto').randomBytes(10).toString('hex');
		const newPortfolio = {...portfolio, _id};
		// portfolio._id = _id;
		data.portfolios.push(newPortfolio);
		return newPortfolio;
	},

	updatePortfolio: (root, {id, portfolio}) => {
		const idx = data.portfolios.findIndex(({_id}) => _id === id );
		const oldPortfolio = data.portfolios[idx];
		const newPortfolio = {_id: id, ...portfolio};
		data.portfolios[idx] = {...oldPortfolio, ...newPortfolio};
		return data.portfolios[idx];
	},

	deletePortfolio: (root, {id}) => {
		const idx = data.portfolios.findIndex(({_id}) => _id === id);
		const portfolios = [...data.portfolios];
		portfolios.splice(idx,1);
		data.portfolios = portfolios;
		return id
	}
}