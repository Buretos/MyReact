import { useEffect, useState } from 'react';

export const useRequestGetProducts = (refreshTodosFlag) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(' http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setTodos(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodosFlag]);

	return {
		isLoading,
		todos,
	};
};
