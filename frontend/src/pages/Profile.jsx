import React, { useState, useContext } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { AuthContext } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { User, Mail, BookOpen, Calendar, Activity, Edit3, X, AlertCircle, Lock } from 'lucide-react';
import { studentProfile, courseData } from '../data/portalData';

const Profile = () => {
    useDocumentTitle('IHFC Portal | Student Profile');
    const { user } = useContext(AuthContext);
    const { courseStartDateStr, getProgramProgress } = useProgress();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const progress = getProgramProgress();
    // Use studentProfile directly as source of truth for the Profile page
    const profile = studentProfile;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your personal information and program details.</p>
                </div>
                <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                </button>
            </div>
            
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#2D1B19] h-32 relative"></div>
                <div className="px-6 md:px-8 pb-6 md:pb-8 relative">
                    <div className="w-24 h-24 bg-ihfcOrange rounded-xl border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-white absolute -top-12">
                        {profile.name.charAt(0)}
                    </div>
                    
                    <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                            <p className="text-gray-500 font-medium mt-0.5">{profile.studentId}</p>
                            <span className="inline-flex items-center mt-3 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                Student
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center uppercase tracking-wider text-sm">
                            <User className="w-5 h-5 mr-2 text-ihfcOrange" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                                <p className="text-gray-900 font-medium">{profile.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Student ID</label>
                                <p className="text-gray-900 font-medium">{profile.studentId}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Enrollment Number</label>
                                <p className="text-gray-900 font-medium">{profile.enrollmentNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Email Information */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center uppercase tracking-wider text-sm">
                            <Mail className="w-5 h-5 mr-2 text-ihfcOrange" />
                            Email Information
                        </h3>
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-4">
                                <div className="min-w-0 flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Institutional Email</label>
                                    <p className="text-gray-900 font-medium break-all">{profile.institutionalEmail}</p>
                                </div>
                                <div className="shrink-0 md:mt-0 mt-2">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                        Verified / Institutional
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4">
                                <div className="min-w-0 flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Personal Email</label>
                                    <p className="text-gray-900 font-medium break-all">{profile.personalEmail}</p>
                                </div>
                                <div className="shrink-0 md:mt-0 mt-2">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                                        Personal
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Information */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center uppercase tracking-wider text-sm">
                            <BookOpen className="w-5 h-5 mr-2 text-ihfcOrange" />
                            Program Information
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Program</label>
                                <p className="text-gray-900 font-medium leading-snug">{courseData.title}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Provider</label>
                                    <p className="text-gray-900 font-medium">{courseData.provider}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">In Collaboration With</label>
                                    <p className="text-gray-900 font-medium">{courseData.collaboration}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Institution</label>
                                    <p className="text-gray-900 font-medium">IHFC, Technology Innovation Hub of IIT Delhi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Course Details */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center uppercase tracking-wider text-sm">
                            <Calendar className="w-5 h-5 mr-2 text-ihfcOrange" />
                            Course Details
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <span className="text-gray-500 text-sm font-medium">Start Date</span>
                                <span className="font-bold text-gray-900">{courseStartDateStr || courseData.startDate}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <span className="text-gray-500 text-sm font-medium">Duration</span>
                                <span className="font-bold text-gray-900">{courseData.duration}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <span className="text-gray-500 text-sm font-medium">Expected Completion</span>
                                <span className="font-bold text-gray-900">{courseData.completionDate}</span>
                            </div>
                            <div className="pt-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-500 text-sm font-medium">Current Progress</span>
                                    <span className="font-bold text-gray-900">{progress.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className="bg-ihfcOrange h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress.percentage}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center uppercase tracking-wider text-sm">
                            <Activity className="w-5 h-5 mr-2 text-ihfcOrange" />
                            Account Status
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm font-medium">Enrollment</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                                    Active
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm font-medium">Course</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                                    Active
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm font-medium">Certificate</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600">
                                    Not Yet Earned
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact & Account Summary (Bottom Card) */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                            Contact & Account
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="block text-gray-500 text-xs font-semibold mb-0.5">Institutional Email</span>
                                <span className="font-medium text-gray-900 break-all">{profile.institutionalEmail}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-xs font-semibold mb-0.5">Personal Email</span>
                                <span className="font-medium text-gray-900 break-all">{profile.personalEmail}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <span className="block text-gray-500 text-xs font-semibold mb-0.5">Student ID</span>
                                    <span className="font-bold text-gray-900">{profile.studentId}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs font-semibold mb-0.5">Enrollment Number</span>
                                    <span className="font-bold text-gray-900">{profile.enrollmentNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                            
                            <div className="bg-blue-50 border border-blue-100 text-blue-800 p-3 rounded-lg text-sm flex items-start">
                                <AlertCircle className="w-5 h-5 mt-0.5 mr-2 shrink-0" />
                                <p>Some fields cannot be changed directly. Please contact the administrator to update locked fields.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <input type="text" defaultValue={profile.name} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ihfcOrange focus:border-ihfcOrange outline-none transition-all" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                        Student ID
                                        <Lock className="w-3 h-3 text-gray-400" />
                                    </label>
                                    <input type="text" value={profile.studentId} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                        Enrollment Number
                                        <Lock className="w-3 h-3 text-gray-400" />
                                    </label>
                                    <input type="text" value={profile.enrollmentNumber} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg cursor-not-allowed" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                    Institutional Email
                                    <Lock className="w-3 h-3 text-gray-400" />
                                </label>
                                <input type="text" value={profile.institutionalEmail} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg cursor-not-allowed" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                    Personal Email
                                    <Lock className="w-3 h-3 text-gray-400" />
                                </label>
                                <input type="text" value={profile.personalEmail} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg cursor-not-allowed" />
                                <p className="text-xs text-gray-500 mt-1.5">Verification required to change email addresses.</p>
                            </div>
                            
                        </div>
                        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2 font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2 font-bold text-white bg-ihfcDark hover:bg-black rounded-lg shadow-sm transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
