import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const AddEmployee = () => {
    const [userData] = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!firstName || !email || !password) {
            alert("Please fill in all required fields (First Name, Email, Password).");
            return;
        }

        // Check for duplicate email
        const emailExists = userData?.some(emp => emp.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            alert("An employee with this email already exists!");
            return;
        }

        // Determine the next ID
        const maxId = userData?.length > 0 ? Math.max(...userData.map(emp => emp.id)) : 0;

        const newEmployee = {
            id: maxId + 1,
            firstName: firstName,
            name: lastName ? `${firstName} ${lastName}` : firstName,
            email: email,
            password: password,
            tasksNumbers: { active: 0, newTask: 0, completed: 0, failed: 0 },
            tasks: []
        };

        try {
            // Write directly to Firestore
            await setDoc(doc(db, "employees", newEmployee.id.toString()), newEmployee);

            // The AuthProvider's onSnapshot listener will automatically update the 
            // userData array across the app, so we don't need to manually update state here.

            // Reset Form
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            alert("Employee successfully added!");
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee to database. Please try again.");
        }
    };

    return (
        <div className="p-5 bg-[#1c1c1c] rounded">
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <h3 className="text-sm text-gray-300 mb-0.5">First Name *</h3>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 focus:border-purple-500 transition-colors text-gray-200"
                            type="text"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-sm text-gray-300 mb-0.5">Last Name</h3>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 focus:border-purple-500 transition-colors text-gray-200"
                            type="text"
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <h3 className="text-sm text-gray-300 mb-0.5">Email Address *</h3>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 focus:border-purple-500 transition-colors text-gray-200"
                            type="email"
                            placeholder="employee@example.com"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-sm text-gray-300 mb-0.5">Password *</h3>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-sm py-2 px-3 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 focus:border-purple-500 transition-colors text-gray-200"
                            type="password"
                            placeholder="Enter a secure password"
                            required
                        />
                    </div>
                </div>


                <button className="bg-gradient-to-r from-purple-600 to-purple-700 py-3 hover:from-purple-700 hover:to-purple-800 px-5 rounded text-sm mt-2 w-full font-medium text-white shadow-lg transition-all">
                    Create Employee Account
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
