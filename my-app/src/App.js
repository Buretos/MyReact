import { Routes, Route, Link, Outlet } from 'react-router-dom';
import styles from './App.module.css';

const fetchProductList = () => [
	{ id: 1, name: 'Телевизор' },
	{ id: 2, name: 'Сматрфон' },
	{ id: 3, name: 'Планшет' },
];

const Product = () => <>Контент странички товара</>;

const MainPage = () => <div>Контент главной страницы</div>;
const Catalog = () => (
	<div>
		<h3>Каталог товаров</h3>
		<ul>
			{fetchProductList().map(({ id, name }) => (
				<li key={id}>
					<Link to="product">{name}</Link>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
);
const Contacts = () => <div>Контент контактов</div>;

export const App = () => {
	return (
		<div className={styles.app}>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/catalog">Каталог</Link>
					</li>
					<li>
						<Link to="/contacts">Контакты</Link>
					</li>
				</ul>
			</div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />}>
					<Route path="product" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
			</Routes>
		</div>
	);
};
