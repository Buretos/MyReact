import { useState } from 'react';

export const useRequestAddVacuumCleaner = (refreshProducts, userInput) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddVacuumCleaner = () => {
		setIsCreating(true);
		console.log(userInput);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 1,
				title: userInput,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Пылесос добавлен, ответ сервера:', response);
				refreshProducts();
			})
			.finally(() => setIsCreating(false));
	};

	return {
		isCreating,
		requestAddVacuumCleaner,
	};
};
