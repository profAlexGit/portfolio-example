import {FC} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Link from 'next/link';

interface IAppLink {
	className: string;
	href: string;
}

const AppLink: FC<IAppLink> = ({children, className, href}) => {
	return (
		<Link href={href}>
			<a className={className}>{children}</a>
		</Link>
	);
};

const AppNavbar: FC = () => {
	return (
		<div className="navbar-wrapper">
			<Navbar className="navbar-dark fj-mw9" expand="lg">
				<AppLink className="navbar-brand mr-3 font-weight-bold" href="/">
					AlekseyFedotov
				</AppLink>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav className="mr-auto">
						<AppLink className="mr-3 nav-link" href="/portfolios">
							Portfolio
						</AppLink>
						<AppLink className="mr-3 nav-link" href="/forum/categories">
							Forum
						</AppLink>
						<AppLink className="mr-3 nav-link" href="/cv">
							Cv
						</AppLink>
					</Nav>
					<Nav>
						<AppLink className="mr-3 nav-link" href="/login">
							Sign In
						</AppLink>
						<AppLink
							className="mr-3 nav-link btn btn-success bg-green-2 bright"
							href="/register"
						>
							Sign Up
						</AppLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export {AppNavbar};
