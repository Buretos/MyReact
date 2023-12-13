import { useState, useEffect } from 'react';
import {
	useRequestAddTodo,
	useRequestUpdateTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
} from './hooks';
import styles from './app.module.css';

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const [userInput, setUserInput] = useState('');
	const [idTodo, setIdTodo] = useState(null);
	const [toggle, setToggle] = useState(false);
	const [toggleItem, setToggleItem] = useState(false);

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag, userInput);

	const requestAddTodo = useRequestAddTodo(refreshTodos, userInput);
	const requestUpdateTodo = useRequestUpdateTodo(refreshTodos, idTodo, toggleItem);
	const requestDeleteTodo = useRequestDeleteTodo(refreshTodos, idTodo);

	const handleChange = (e) => {
		setUserInput(e.currentTarget.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUserInput(userInput);
		requestAddTodo();
		setUserInput('');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	useEffect(() => {
		requestUpdateTodo();
	}, [toggle]);

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1>Список дел с JSON Server</h1>
			</header>
			<form onSubmit={handleSubmit}>
				<input
					className={styles.input}
					value={userInput}
					type="text"
					onChange={handleChange}
					onKeyDown={handleKeyPress}
					placeholder="Введите значение..."
				/>
				<button className={styles.button}>Сохранить</button>
			</form>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, title, completed }) => (
					<div className={completed ? styles.itemTodoStrike : styles.itemTodo}>
						<div
							key={id}
							className={
								completed ? styles.itemTextStrike : styles.itemText
							}
							onClick={() => {
								setIdTodo(id);
								setToggle(!toggle);
								setToggleItem(!completed);
							}}
						>
							{title}
						</div>
						<div
							className={styles.itemDelete}
							onClick={() => {
								setIdTodo(id);
								requestDeleteTodo();
							}}
						>
							x
						</div>
					</div>
				))
			)}
		</div>
	);
};
