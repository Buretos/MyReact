import { useState } from 'react';

export const useRequestUpdateSmartphone = (refreshTodos, idTodo, toggle) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateSmartphone = () => {
		setIsUpdating(true);

		fetch(`http://localhost:3005/todos/${idTodo}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: toggle,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(' ответ сервера:', response);
				refreshTodos();
			})
			.finally(() => {
				setIsUpdating(false);
			});
	};

	return {
		isUpdating,
		requestUpdateSmartphone,
	};
};
