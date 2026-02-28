import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

// Read firebase.js to get config
const firebaseJs = fs.readFileSync('d:/Projects/Employee/vite-project/src/utils/firebase.js', 'utf8');

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

const employees = [
    {
        id: 1,
        password: "123",
        name: "John Smith",
        firstName: "John",
        email: "john.smith@example.com",
        taskNumbers: { active: 2, newTask: 1, completed: 1, failed: 1 },
        tasks: []
    },
    {
        id: 2,
        password: "123",
        name: "Sarah Johnson",
        firstName: "Sarah",
        email: "sarah.johnson@example.com",
        taskNumbers: { active: 2, newTask: 1, completed: 1, failed: 0 },
        tasks: []
    },
    {
        id: 3,
        password: "123",
        name: "Robert Brown",
        firstName: "Robert",
        email: "robert.brown@example.com",
        taskNumbers: { active: 2, newTask: 2, completed: 2, failed: 1 },
        tasks: []
    },
    {
        id: 4,
        password: "123",
        name: "Emily Davis",
        firstName: "Emily",
        email: "emily.davis@example.com",
        taskNumbers: { active: 1, newTask: 1, completed: 1, failed: 1 },
        tasks: []
    },
    {
        id: 5,
        password: "123",
        name: "Michael Wilson",
        firstName: "Michael",
        email: "michael.wilson@example.com",
        taskNumbers: { active: 3, newTask: 2, completed: 2, failed: 0 },
        tasks: []
    }
];

const admin = {
    id: 1,
    password: "123",
    name: "Sid",
    email: "sid@gmail.com",
};

async function seedData() {
    console.log("Seeding admin...");
    await setDoc(doc(db, "system", "admin"), admin);

    console.log("Seeding employees...");
    for (const emp of employees) {
        await setDoc(doc(db, "employees", emp.id.toString()), emp);
    }
    console.log("Done seeding database!");
}

seedData().catch(console.error);
