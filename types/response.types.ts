import { IPortfolio } from "./portfolio.types"

interface IResponse<U, T extends keyof any = ''> {
	data: {[P in T]: U};
}

export type TPortfoliosResponse = IResponse<IPortfolio[], 'portfolios'>;


