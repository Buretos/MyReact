import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTodo = (idTodo, toggleItem) => {
	const requestUpdateTodo = () => {
		const updateDbRef = ref(db, `todos/${idTodo}`);
		update(updateDbRef, {
			completed: toggleItem,
		}).then((response) => {
			console.log(' ответ сервера:', response);
		});
	};

	return requestUpdateTodo;
};
