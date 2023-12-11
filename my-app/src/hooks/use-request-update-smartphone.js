import { useState } from 'react';

export const useRequestUpdateSmartphone = (refreshProducts) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateSmartphone = () => {
		setIsUpdating(true);

		fetch('http://localhost:3005/produckts/002', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Сматрфон',
				price: 17900,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Смартфон обновлён, ответ сервера:', response);
				refreshProducts();
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		isUpdating,
		requestUpdateSmartphone,
	};
};
