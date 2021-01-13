import {NextPage} from 'next';
interface IProps {
    id: string;
}

const PortfolioDetail: NextPage<IProps> = ({id}) => {
	return (
		<>
			<h1>Detail page for {id} </h1>
		</>
	);
};

PortfolioDetail.getInitialProps = ({query}) => {
    const id = query.id as string;
    return {id};
}

export default PortfolioDetail;
