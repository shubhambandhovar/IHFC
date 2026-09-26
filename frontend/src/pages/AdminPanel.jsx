import React, { useEffect, useState, useContext } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Video, Users, Save } from 'lucide-react';

const AdminPanel = () => {
    useDocumentTitle('IHFC Portal | Admin');
    const [activeTab, setActiveTab] = useState('students'); // 'students' | 'resources'
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [editingLesson, setEditingLesson] = useState(null);
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
                    { _id: '1', name: 'Shubham Shrivastava', studentId: 'IHFC2026-001', email: 'shubham.shrivastava@ihfc.in', courseDetails: { progress: 0 } }
                ]);
            }
        };

        const fetchModules = async () => {
            try {
                const { data } = await axios.get('https://ihfc.onrender.com/api/learning/admin/modules', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setModules(data);
            } catch (error) {
                // Fallback for demonstration
                setModules([
                    {
                        _id: '1', title: 'Machine Learning', 
                        lessons: [
                            { _id: 'l1', title: '01 Introduction to ML', videoProvider: 'self-hosted', videoUrl: '', published: false },
                            { _id: 'l2', title: '02 Linear Regression', videoProvider: 'self-hosted', videoUrl: '', published: false }
                        ]
                    }
                ]);
            }
        };

        if (activeTab === 'students') fetchStudents();
        if (activeTab === 'resources') fetchModules();
    }, [activeTab, user]);

    const handleSaveLesson = async (lessonId) => {
        try {
            // Update on backend
            await axios.put(`https://ihfc.onrender.com/api/learning/admin/lessons/${lessonId}`, editingLesson, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            // Update local state
            setModules(modules.map(m => ({
                ...m,
                lessons: m.lessons.map(l => l._id === lessonId ? editingLesson : l)
            })));
            setEditingLesson(null);
            alert("Lesson updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Updated locally (Backend connection required)");
            setModules(modules.map(m => ({
                ...m,
                lessons: m.lessons.map(l => l._id === lessonId ? editingLesson : l)
            })));
            setEditingLesson(null);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('students')}
                    className={`pb-4 px-2 font-medium flex items-center ${activeTab === 'students' ? 'text-ihfcOrange border-b-2 border-ihfcOrange' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Users className="w-5 h-5 mr-2" />
                    Enrolled Students
                </button>
                <button 
                    onClick={() => setActiveTab('resources')}
                    className={`pb-4 px-2 font-medium flex items-center ${activeTab === 'resources' ? 'text-ihfcOrange border-b-2 border-ihfcOrange' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Video className="w-5 h-5 mr-2" />
                    Manage Course Videos
                </button>
            </div>

            {/* Students Tab */}
            {activeTab === 'students' && (
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
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
                <div className="space-y-6">
                    {modules.map(mod => (
                        <div key={mod._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-lg font-bold text-gray-900">{mod.title}</h2>
                            </div>
                            <div className="divide-y divide-gray-100 p-4 space-y-4">
                                {mod.lessons?.map(lesson => (
                                    <div key={lesson._id} className="p-4 border rounded-lg bg-gray-50">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                                            {!editingLesson || editingLesson._id !== lesson._id ? (
                                                <button 
                                                    onClick={() => setEditingLesson(lesson)}
                                                    className="text-sm bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50"
                                                >
                                                    Edit Lesson
                                                </button>
                                            ) : null}
                                        </div>
                                        
                                        {editingLesson && editingLesson._id === lesson._id ? (
                                            <div className="space-y-4 bg-white p-4 rounded border">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Video Provider</label>
                                                        <select 
                                                            className="w-full border rounded p-2 text-sm"
                                                            value={editingLesson.videoProvider}
                                                            onChange={(e) => setEditingLesson({...editingLesson, videoProvider: e.target.value})}
                                                        >
                                                            <option value="self-hosted">Self Hosted</option>
                                                            <option value="cloud-cdn">Cloud CDN</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                                                        <select 
                                                            className="w-full border rounded p-2 text-sm"
                                                            value={editingLesson.published ? 'published' : 'draft'}
                                                            onChange={(e) => setEditingLesson({...editingLesson, published: e.target.value === 'published'})}
                                                        >
                                                            <option value="published">Published</option>
                                                            <option value="draft">Draft / Coming Soon</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                                    <div className="flex-1">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Video URL (mp4 / youtube)</label>
                                                        <input 
                                                            type="text" 
                                                            className="w-full border rounded p-2 text-sm"
                                                            value={editingLesson.videoUrl || ''}
                                                            placeholder="https://cdn.example.com/course/ml/lesson-01.mp4"
                                                            onChange={(e) => setEditingLesson({...editingLesson, videoUrl: e.target.value})}
                                                        />
                                                    </div>
                                                    <div className="md:pt-5">
                                                        <label className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={editingLesson.isDemo || false}
                                                                onChange={(e) => setEditingLesson({...editingLesson, isDemo: e.target.checked})}
                                                                className="rounded border-gray-300 text-ihfcOrange focus:ring-ihfcOrange"
                                                            />
                                                            <span>Is Demo</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:flex-row justify-between gap-4 pt-4 border-t border-gray-100 mt-4">
                                                    <button 
                                                        onClick={() => {
                                                            if (editingLesson.videoProvider === 'self-hosted' && editingLesson.videoUrl) {
                                                                window.open(editingLesson.videoUrl, '_blank');
                                                            } else if (editingLesson.videoProvider === 'youtube' && editingLesson.videoUrl) {
                                                                window.open(editingLesson.videoUrl, '_blank');
                                                            } else {
                                                                alert('Please provide a valid URL to test.');
                                                            }
                                                        }}
                                                        className="px-4 py-2 text-sm border rounded text-ihfcOrange hover:bg-orange-50 font-medium w-full md:w-auto"
                                                    >
                                                        Test Video URL
                                                    </button>
                                                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                                                        <button 
                                                            onClick={() => setEditingLesson(null)}
                                                            className="px-4 py-2 text-sm border rounded text-gray-600 hover:bg-gray-50 w-full md:w-auto"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button 
                                                            onClick={() => handleSaveLesson(lesson._id)}
                                                            className="px-4 py-2 text-sm bg-ihfcOrange text-white rounded hover:bg-orange-600 flex justify-center items-center w-full md:w-auto"
                                                        >
                                                            <Save className="w-4 h-4 mr-2" /> Save Changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500 block text-xs">Video Provider</span>
                                                    <span className="font-medium">{lesson.videoProvider}</span>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <span className="text-gray-500 block text-xs">Video URL</span>
                                                    <span className={`font-medium truncate block ${lesson.videoUrl ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                                                        {lesson.videoUrl || 'Not provided'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {(!mod.lessons || mod.lessons.length === 0) && (
                                    <p className="text-gray-500 text-sm text-center py-4">No lessons in this module.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
