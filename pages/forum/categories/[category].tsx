import {NextPage} from 'next';
import {Navbar} from '@/components/shared/NavBar';

interface IProps {
	category: string;
}

const Topics: NextPage<IProps> = ({category}) => {
	return (
		<>
			<Navbar />
			<div className="container">
				<section className="section-title">
					<div className="px-2">
						<div className="pt-5 pb-4">
							<h1>{category}</h1>
						</div>
					</div>
				</section>
				<section className="fj-topic-list">
					<table className="table table-hover ">
						<thead>
							<tr>
								<th scope="col">Topic</th>
								<th scope="col">Category</th>
								<th scope="col">Author</th>
								<th scope="col">Replies</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Some Topic Info</th>
								<td className="category">General Discussion</td>
								<td>Filip Jerga</td>
								<td>2</td>
							</tr>
							<tr>
								<th>Some Topic Info</th>
								<td className="category">General Discussion</td>
								<td>Filip Jerga</td>
								<td>2</td>
							</tr>
							<tr>
								<th>Some Topic Info</th>
								<td className="category">General Discussion</td>
								<td>Filip Jerga</td>
								<td>2</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
		</>
	);
};

Topics.getInitialProps = ({query}) => {
	const category = query.category as string;
	return {category};
};

export default Topics;
