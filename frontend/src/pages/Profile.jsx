import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Hash } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-ihfcDark h-32 relative"></div>
                <div className="px-8 pb-8 relative">
                    <div className="w-24 h-24 bg-ihfcOrange rounded-xl border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-white absolute -top-12">
                        {user?.name?.charAt(0)}
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                                    <User className="w-4 h-4 mr-2" /> Full Name
                                </h2>
                                <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
                            </div>
                            <div>
                                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                                    <Mail className="w-4 h-4 mr-2" /> Email Address
                                </h2>
                                <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                                    <Hash className="w-4 h-4 mr-2" /> Enrollment Number
                                </h2>
                                <p className="text-lg font-semibold text-gray-900">ENR-2026-4589</p>
                            </div>
                            <div>
                                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                                    <Hash className="w-4 h-4 mr-2" /> Student ID
                                </h2>
                                <p className="text-lg font-semibold text-gray-900">{user?.studentId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
