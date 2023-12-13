export const useRequestAddTodo = (refreshTodos, userInput) => {
	const requestAddTodo = () => {
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
				refreshTodos();
			});
	};

	return requestAddTodo;
};
