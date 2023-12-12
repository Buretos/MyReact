import { useState, useEffect } from 'react';
import {
	useRequestAddVacuumCleaner,
	useRequestUpdateSmartphone,
	useRequestDeleteHairDryer,
	useRequestGetProducts,
} from './hooks';
import styles from './app.module.css';

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const [userInput, setUserInput] = useState('');
	const [idTodo, setIdTodo] = useState(null);
	const [toggle, setToggle] = useState(false);

	const { isLoading, todos } = useRequestGetProducts(refreshTodosFlag, userInput);

	const { isCreating, requestAddVacuumCleaner } = useRequestAddVacuumCleaner(
		refreshTodos,
		userInput,
	);
	const { isUpdating, requestUpdateSmartphone } = useRequestUpdateSmartphone(
		refreshTodos,
		idTodo,
		toggle,
	);
	const { isDeleting, requestDeleteHairDryer } = useRequestDeleteHairDryer(
		refreshTodos,
		idTodo,
	);

	const handleChange = (e) => {
		setUserInput(e.currentTarget.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUserInput(userInput);
		requestAddVacuumCleaner();
		setUserInput('');
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	useEffect(() => {
		requestUpdateSmartphone();
	}, [toggle]);

	return (
		<div className={styles.app}>
			<header>
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
					<div className={styles.itemTodo}>
						<div
							key={id}
							className={
								completed ? styles.itemTextStrike : styles.itemText
							}
							// onMouseOver={() => {
							// 	setToggle(completed);
							// }}
							onClick={() => {
								setIdTodo(id);
								setToggle(!toggle);
							}}
						>
							{title}
						</div>
						<div
							className={styles.itemDelete}
							onClick={() => {
								setIdTodo(id);
								requestDeleteHairDryer();
							}}
						>
							x
						</div>
					</div>
				))
			)}
			<button disabled={isCreating} onClick={requestAddVacuumCleaner}>
				Добавить пылесос
			</button>
			<button disabled={isUpdating} onClick={requestUpdateSmartphone}>
				Обновить смартфон
			</button>
			<button disabled={isDeleting} onClick={requestDeleteHairDryer}>
				Удалить фен
			</button>
		</div>
	);
};
