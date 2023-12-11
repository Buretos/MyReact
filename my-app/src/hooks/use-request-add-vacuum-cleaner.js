import { useState } from 'react';

export const useRequestAddVacuumCleaner = (refreshProducts) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddVacuumCleaner = () => {
		setIsCreating(true);
		fetch('http://localhost:3005/produckts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Новый пылесос',
				price: 4690,
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
