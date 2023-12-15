import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTodo = (userInput) => {
	const requestAddTodo = () => {
		const todoDbRef = ref(db, 'todos');
		push(todoDbRef, {
			title: userInput,
			completed: false,
		});
	};

	return requestAddTodo;
};
