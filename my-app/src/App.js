import { useState, useEffect } from 'react';
import {
	useRequestAddTodo,
	useRequestUpdateTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
} from './hooks';
import styles from './app.module.css';

export const App = () => {
	const [newTodos, setNewTodos] = useState([]);
	const [sortAsc, setSortAsc] = useState(false); // Состояние для отслеживания направления сортировки
	const [itemButtonSort, setItemButtonSort] = useState('Сортировать');
	const [userFindInput, setUserFindInput] = useState('');
	const [userFind, setUserFind] = useState(false);

	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const [userInput, setUserInput] = useState('');
	const [idTodo, setIdTodo] = useState(null);
	const [toggle, setToggle] = useState(false);
	const [toggleItem, setToggleItem] = useState(false);
	const [isDelete, setIsDelete] = useState(false);

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag, userInput);

	const requestAddTodo = useRequestAddTodo(refreshTodos, userInput);
	const requestUpdateTodo = useRequestUpdateTodo(refreshTodos, idTodo, toggleItem);
	const requestDeleteTodo = useRequestDeleteTodo(refreshTodos, idTodo);

	const handleSortClick = () => {
		setSortAsc(!sortAsc);
		sortAsc
			? setItemButtonSort('Сортировать')
			: setItemButtonSort('Отмена сортировки');
	};

	useEffect(() => {
		// Локальная функция для сортировки
		const sortedTodos = [...todos].sort((a, b) => {
			const titleA = a.title.toUpperCase(); // Настройка сортировки по заглавным буквам
			const titleB = b.title.toUpperCase();
			if (sortAsc) {
				return titleA.localeCompare(titleB);
			} else {
				return [...todos];
			}
		});
		setNewTodos(sortedTodos); // setTodos(sortedTodos); // Обновление состояния с отсортированным списком
	}, [sortAsc, isLoading]); // Дополнительная зависимость от todos

	const handleChange = (e) => {
		setUserInput(e.currentTarget.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (userInput) {
			setUserInput(userInput);
			requestAddTodo();
			setUserInput('');
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	useEffect(() => {
		requestUpdateTodo();
	}, [toggle]);

	useEffect(() => {
		requestDeleteTodo();
	}, [isDelete]);

	useEffect(() => {
		const filtered = newTodos.filter((todo) =>
			todo.title.toLowerCase().includes(userFindInput.toLowerCase()),
		);
		setNewTodos(filtered);
		setUserFindInput('');
	}, [userFind]);

	const handleFindChange = (e) => {
		setUserFindInput(e.currentTarget.value);
	};

	const handleFindSubmit = (e) => {
		e.preventDefault();
		if (userFindInput) {
			setUserFindInput(userFindInput);
			setUserFind(!userFind);
		} else refreshTodos();
	};

	const handleFindKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleFindSubmit(e);
		}
	};

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1>Список дел с JSON Server</h1>
			</header>
			<form onSubmit={handleFindSubmit}>
				<input
					className={styles.input}
					value={userFindInput}
					type="text"
					onChange={handleFindChange}
					onKeyDown={handleFindKeyPress}
					placeholder="Введите для поиска..."
				/>
				<button className={styles.button}>Поиск</button>
			</form>
			<div>
				<button className={styles.buttonSort} onClick={handleSortClick}>
					{itemButtonSort}
				</button>
			</div>
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
				newTodos.map(({ id, title, completed }) => (
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
								setIsDelete(!isDelete);
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
