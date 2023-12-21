import { Routes, Route, Link, Outlet, useParams } from 'react-router-dom';
import styles from './App.module.css';

const fetchProductList = () => [
	{ id: 1, name: 'Телевизор' },
	{ id: 2, name: 'Сматрфон' },
	{ id: 3, name: 'Планшет' },
];

const fetchProduct = (id) =>
	({
		1: { id: 1, name: 'Телевизор', price: 29900, amount: 15 },
		2: { id: 2, name: 'Сматрфон', price: 13900, amount: 40 },
		3: { id: 3, name: 'Планшет', price: 18400, amount: 23 },
	})[id];

const Product = () => {
	const params = useParams();

	const { name, price, amount } = fetchProduct(params.id);
	return (
		<div>
			<h3>Товар - {name}</h3>
			<div> Цена: {price}</div>
			<div>Количество на складе: {amount}</div>
		</div>
	);
};

const MainPage = () => <div>Контент главной страницы</div>;
const Catalog = () => (
	<div>
		<h3>Каталог товаров</h3>
		<ul>
			{fetchProductList().map(({ id, name }) => (
				<li key={id}>
					<Link to={`product/${id}`}>{name}</Link>
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
					<Route path="product/:id" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
			</Routes>
		</div>
	);
};
