import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAMabCukF-JmsPYQkvODIz7w9j_1U7VoWk",
	authDomain: "netflix-2f31d.firebaseapp.com",
	projectId: "netflix-2f31d",
	storageBucket: "netflix-2f31d.appspot.com",
	messagingSenderId: "1066349981274",
	appId: "1:1066349981274:web:d4a1e7db2cde1d6316b263"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { auth };
export default db;