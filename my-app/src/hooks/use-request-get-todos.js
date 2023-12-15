import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodos = (refreshTodos) => {
	const [todos, setTodos] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			console.log(loadedTodos);
			setTodos(loadedTodos);
			console.log(loadedTodos);
			setIsLoading(false);
		});
	}, [refreshTodos]);

	return {
		isLoading,
		todos,
	};
};
