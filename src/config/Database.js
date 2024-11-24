import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDstb61s1aMuBJp-IyR1Wed91iKg6rILWg",
  authDomain: "sispar-eff9f.firebaseapp.com",
//   databaseURL: "https://sispar-eff9f-default-rtdb.firebaseio.com",
  projectId: "sispar-eff9f",
  storageBucket: "sispar-eff9f.firebasestorage.app",
  messagingSenderId: "99273987169",
  appId: "1:99273987169:web:d2f1516937663547310620",
  measurementId: "G-DNKPXRRLQN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
