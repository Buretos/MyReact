import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = (idTodo) => {
	const requestDeleteTodo = () => {
		const dellDbRef = ref(db, `todos/${idTodo}`);
		remove(dellDbRef);
	};

	return requestDeleteTodo;
};
