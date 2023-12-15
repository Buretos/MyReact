import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBmvJQEZ8GxxXWRN0bnYvHaBHv-eg30NF0',
	authDomain: 'mytodos-91e26.firebaseapp.com',
	projectId: 'mytodos-91e26',
	storageBucket: 'mytodos-91e26.appspot.com',
	messagingSenderId: '1032621001448',
	appId: '1:1032621001448:web:888af0a02e61218957d75d',
	databaseURL: 'https://mytodos-91e26-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
