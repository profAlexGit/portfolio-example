import {IPortfolio} from './portfolio.types';

interface IResponse<U, T extends keyof any = ''> {
	data: {[P in T]: U};
}

export type TPortfoliosResponse = IResponse<IPortfolio[], 'portfolios'>;
export type TSinglePortfolioResponse = IResponse<IPortfolio, 'portfolio'>;
export  type TCreatePortfolioResponse = IResponse<IPortfolio, 'createPortfolio'>;
export  type TUpdatePortfolioResponse = IResponse<IPortfolio, 'updatePortfolio'>;
export  type TDeletePortfolioResponse = IResponse<string, 'deletePortfolio'>;

interface IApolloResponse<U, T extends keyof any = ''> {
	[P: string]: U
}

export type TResponseSinglePortfolio = IApolloResponse<IPortfolio, 'portfolio'>;
