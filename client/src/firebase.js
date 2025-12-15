import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyA68C8VGlwP-0flR9DMhwh_ax1o1th-8LI",
   authDomain: "fitness-tracking-system-57a16.firebaseapp.com",
   projectId: "fitness-tracking-system-57a16",
   storageBucket: "fitness-tracking-system-57a16.firebasestorage.app",
   messagingSenderId: "913399598610",
   appId: "1:913399598610:web:9a43f7863cc713dd37d2cb"
 };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
