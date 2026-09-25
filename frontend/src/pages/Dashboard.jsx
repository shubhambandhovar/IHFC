import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Award, Clock, Calendar } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-blue-100 text-simpliBlue rounded-lg flex items-center justify-center mr-4">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Program Progress</p>
                        <p className="text-2xl font-bold text-gray-900">25%</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-orange-100 text-ihfcOrange rounded-lg flex items-center justify-center mr-4">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Certificates Earned</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-red-100 text-ihfcRed rounded-lg flex items-center justify-center mr-4">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Next Session</p>
                        <p className="text-lg font-bold text-gray-900">Today, 4:00 PM</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 text-ihfcGold rounded-lg flex items-center justify-center mr-4">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Course End Date</p>
                        <p className="text-lg font-bold text-gray-900">01/08/2027</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Current Module</h2>
                    <div className="border-l-4 border-ihfcOrange pl-4 py-2">
                        <h3 className="font-semibold text-lg">Applied Data Science With Python</h3>
                        <p className="text-gray-600 mt-1">Building on a strong Python foundation, this module introduces core data science principles.</p>
                        <div className="mt-4 flex gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">NumPy</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Pandas</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Matplotlib</span>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <div className="w-2 h-2 mt-2 bg-ihfcRed rounded-full mr-3"></div>
                            <div>
                                <p className="font-medium">Installment 3 Payment Received</p>
                                <p className="text-sm text-gray-500">Thank you for your payment of ₹25,000 on June 01, 2026.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="w-2 h-2 mt-2 bg-ihfcOrange rounded-full mr-3"></div>
                            <div>
                                <p className="font-medium">New Module Unlocked</p>
                                <p className="text-sm text-gray-500">Applied Data Science With Python is now available.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
