import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

// Read firebase.js to get config
const firebaseJs = fs.readFileSync('d:/Projects/Employee/vite-project/src/utils/firebase.js', 'utf8');

// Extract apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
const extract = (key) => {
    const match = firebaseJs.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`));
    return match ? match[1] : '';
};

const firebaseConfig = {
    apiKey: extract('apiKey'),
    authDomain: extract('authDomain'),
    projectId: extract('projectId'),
    storageBucket: extract('storageBucket'),
    messagingSenderId: extract('messagingSenderId'),
    appId: extract('appId')
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkUsers() {
    const snapshot = await getDocs(collection(db, 'employees'));
    console.log("Employees found in Firestore:");
    snapshot.forEach(doc => {
        console.log(`ID: ${doc.id} | Email: ${doc.data().email} | Password: ${doc.data().password}`);
    });
}

checkUsers().catch(console.error);
