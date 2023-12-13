export const useRequestDeleteTodo = (refreshTodos, idTodo) => {
	const requestDeleteTodo = () => {
		fetch(`http://localhost:3005/todos/${idTodo}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Фен удалён, ответ сервера:', response);
				refreshTodos();
			});
	};

	return requestDeleteTodo;
};
