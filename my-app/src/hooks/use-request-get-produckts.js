import { useEffect, useState } from 'react';

export const useRequestGetProducts = (refreshProductsFlag) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, [refreshProductsFlag]);

	return {
		isLoading,
		products,
	};
};
