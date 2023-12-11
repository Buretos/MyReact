import { useRequestGetProducts } from './hooks';
import styles from './app.module.css';

export const App = () => {
	const { isLoading, products } = useRequestGetProducts();

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1>Список дел с Placeholder</h1>
			</header>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				products.map(({ id, title }) => (
					<div key={id} className={styles.itemTodo}>
						{title}
					</div>
				))
			)}
		</div>
	);
};
