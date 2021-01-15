import {IPortfolio} from '@/types/portfolio.types';
import {FC} from 'react';
import Link from 'next/link';

const PortfolioCard: FC<IPortfolio> = ({_id, title, description, jobTitle, startDate, endDate}) => {
	return (
		<div className="card subtle-shadow no-border">
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<h6 className="card-subtitle mb-2 text-muted">{jobTitle}</h6>
				<p className="card-text fs-2">{description}</p>
			</div>
			<div className="card-footer no-border">
				<small className="text-muted">
					{startDate} - {endDate}
				</small>
			</div>
		</div>
	);
};

export {PortfolioCard};
