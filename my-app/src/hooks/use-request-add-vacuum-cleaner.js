import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddVacuumCleaner = () => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddVacuumCleaner = () => {
		setIsCreating(true);

		const productsDbRef = ref(db, 'products');

		push(productsDbRef, {
			name: 'Новый пылесос',
			price: 5990,
		})
			.then((response) => {
				console.log('Пылесос добавлен, ответ сервера:', response);
			})
			.finally(() => setIsCreating(false));
	};

	return {
		isCreating,
		requestAddVacuumCleaner,
	};
};
