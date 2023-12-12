import { useState } from 'react';

export const useRequestDeleteHairDryer = (refreshProducts, idTodo) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteHairDryer = () => {
		setIsDeleting(true);

		fetch(`http://localhost:3005/todos/${idTodo}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Фен удалён, ответ сервера:', response);
				refreshProducts();
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		isDeleting,
		requestDeleteHairDryer,
	};
};
