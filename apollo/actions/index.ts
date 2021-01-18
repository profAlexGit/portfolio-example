import {
	IResponseCreatePortfolio,
	IResponseDeletePortfolio,
	IResponsePortfolios,
	IResponseSinglePortfolio,
	IResponseUpdatePortfolio,
} from '@/types/response.types';
import {GET_PORTFOLIOS, UPDATE_PORTFOLIO, CREATE_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIO} from '@/apollo/queries';
import {useQuery, useMutation} from '@apollo/react-hooks';

export const useGetPortfolios = () => useQuery<IResponsePortfolios>(GET_PORTFOLIOS);

export const useGetSinglePortfolio = (id: string) => useQuery<IResponseSinglePortfolio>(GET_PORTFOLIO, {variables: {id}});

export const useUpdatePortfolio = () => useMutation<IResponseUpdatePortfolio>(UPDATE_PORTFOLIO);

export const useCreatePortfolio = () => useMutation<IResponseCreatePortfolio>(
	CREATE_PORTFOLIO,
	{
		update(cache, {data: {createPortfolio}}) {
			const {portfolios} = cache.readQuery({query: GET_PORTFOLIOS});
			cache.writeQuery({
				query: GET_PORTFOLIOS,
				data: {portfolios: [...portfolios, createPortfolio]},
			});
		},
	}
);

export const useDeletePortfolio = () => useMutation<IResponseDeletePortfolio>(DELETE_PORTFOLIO, {
	update(cache, {data: {deletePortfolio}}) {
		const {portfolios} = cache.readQuery<IResponsePortfolios>({
			query: GET_PORTFOLIOS,
		});
		const newPortfolios = portfolios.filter(p => p._id !== deletePortfolio);
		cache.writeQuery({
			query: GET_PORTFOLIOS,
			data: {portfolios: newPortfolios},
		});
	}
});
