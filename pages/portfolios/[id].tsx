import {useRouter} from 'next/router';
import {NextPage} from 'next';
import {Navbar} from '../../components/shared/NavBar';

interface IProps {
    id: string;
}

const PortfolioDetail: NextPage<IProps> = ({id}) => {
	return (
		<>
			<Navbar />
			<div className="container">
				<h1>Detail page for {id} </h1>
			</div>
		</>
	);
};

PortfolioDetail.getInitialProps = ({query}) => {
    const id = query.id as string;
    return {id};
}

export default PortfolioDetail;
