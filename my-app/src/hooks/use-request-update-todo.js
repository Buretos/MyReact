export const useRequestUpdateTodo = (refreshTodos, idTodo, toggleItem) => {
	const requestUpdateTodo = () => {
		fetch(`http://localhost:3005/todos/${idTodo}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: toggleItem,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(' ответ сервера:', response);
				refreshTodos();
			});
	};

	return requestUpdateTodo;
};
