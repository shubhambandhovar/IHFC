import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
    const [students, setStudents] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await axios.get('https://ihfc.onrender.com/api/admin/students', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStudents(data);
            } catch (error) {
                setStudents([
                    { _id: '1', name: 'Shubham Shrivastava', studentId: 'IHFC2026-001', email: 'shubham@example.com', courseDetails: { progress: 25 } }
                ]);
            }
        };
        fetchStudents();
    }, [user]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Enrolled Students</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                                <th className="p-4 font-semibold text-sm">Student Name</th>
                                <th className="p-4 font-semibold text-sm">Student ID</th>
                                <th className="p-4 font-semibold text-sm">Email</th>
                                <th className="p-4 font-semibold text-sm">Program Progress</th>
                                <th className="p-4 font-semibold text-sm text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student) => (
                                <tr key={student._id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium text-gray-900">{student.name}</td>
                                    <td className="p-4 text-sm text-gray-600">{student.studentId}</td>
                                    <td className="p-4 text-sm text-gray-600">{student.email}</td>
                                    <td className="p-4 text-sm text-gray-900">
                                        <div className="flex items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                                <div className="bg-ihfcOrange h-2.5 rounded-full" style={{ width: `${student.courseDetails?.progress || 0}%` }}></div>
                                            </div>
                                            <span>{student.courseDetails?.progress || 0}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-simpliBlue hover:text-blue-800 text-sm font-medium">View Details</button>
                                    </td>
                                </tr>
                            ))}
                            {students.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">No students found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
