import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDdSrSNLyVZUu7U4_xrqQsSx9DUTE85I0U',
	authDomain: 'productsproject-b0b47.firebaseapp.com',
	projectId: 'productsproject-b0b47',
	storageBucket: 'productsproject-b0b47.appspot.com',
	messagingSenderId: '198135904580',
	appId: '1:198135904580:web:8645dc02e5c72b2e53ff11',
	databaseURL:
		'https://productsproject-b0b47-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
