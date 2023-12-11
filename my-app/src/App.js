import { useState } from 'react';
import {
	useRequestAddVacuumCleaner,
	useRequestUpdateSmartphone,
	useRequestDeleteHairDryer,
	useRequestGetProducts,
} from './hooks';
import styles from './app.module.css';

export const App = () => {
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const refreshProducts = () => setRefreshProductsFlag(!refreshProductsFlag);

	const { isLoading, products } = useRequestGetProducts(refreshProductsFlag);

	const { isCreating, requestAddVacuumCleaner } =
		useRequestAddVacuumCleaner(refreshProducts);
	const { isUpdating, requestUpdateSmartphone } =
		useRequestUpdateSmartphone(refreshProducts);
	const { isDeleting, requestDeleteHairDryer } =
		useRequestDeleteHairDryer(refreshProducts);

	return (
		<div className={styles.app}>
			<header>
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
			<button disabled={isCreating} onClick={requestAddVacuumCleaner}>
				Добавить пылесос
			</button>
			<button disabled={isUpdating} onClick={requestUpdateSmartphone}>
				Обновить смартфон
			</button>
			<button disabled={isDeleting} onClick={requestDeleteHairDryer}>
				Удалить фен
			</button>
		</div>
	);
};
