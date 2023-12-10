import {
	useRequestAddVacuumCleaner,
	useRequestUpdateSmartphone,
	useRequestDeleteHairDryer,
	useRequestGetProducts,
} from './hooks';
import styles from './app.module.css';

export const App = () => {
	const { isLoading, products } = useRequestGetProducts();

	const { isCreating, requestAddVacuumCleaner } = useRequestAddVacuumCleaner();
	const { isUpdating, requestUpdateSmartphone } = useRequestUpdateSmartphone();
	const { isDeleting, requestDeleteHairDryer } = useRequestDeleteHairDryer();

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				Object.entries(products).map(([id, { name, price }]) => (
					<div key={id}>
						{name} - {price} руб.
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
