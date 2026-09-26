import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, Award, Clock, Calendar, PlayCircle, 
    CheckCircle, Lock, Video, CreditCard, ChevronRight, 
    FileText, Bell, Activity, ArrowRight, Check
} from 'lucide-react';
import { 
    courseData, progressData, paymentData, 
    notificationData, activityData, resourceData 
} from '../data/portalData';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const currentModule = courseData.modules.find(m => m.status === 'current');
    const upcomingModules = courseData.modules.filter(m => m.status === 'upcoming').slice(0, 3);
    const pendingPayment = paymentData.installments.find(p => p.status === 'Pending');

    return (
        <div className="space-y-8 pb-12">
            
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'Shubham'}! 👋</h1>
                <p className="text-gray-600 mt-2 text-lg">Continue your AI learning journey and track your progress.</p>
            </div>
            
            {/* Payment Notification (Subtle) */}
            {pendingPayment && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center text-orange-800">
                        <CreditCard className="w-5 h-5 mr-3 shrink-0 text-ihfcOrange" />
                        <div>
                            <p className="font-semibold">{pendingPayment.type} of ₹{pendingPayment.amount.toLocaleString()} is pending.</p>
                            <p className="text-sm text-orange-700/80 mt-0.5">Complete your payment when the installment becomes due.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/payment/final-installment')}
                        className="bg-white border border-orange-200 text-ihfcOrange px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-orange-50 transition-colors whitespace-nowrap"
                    >
                        View Payment
                    </button>
                </div>
            )}

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Progress Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{progressData.percentage}%</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Program Progress</p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progressData.percentage}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">{progressData.completedModules} of {progressData.totalModules} core modules completed</p>
                </div>

                {/* Certificates */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-orange-50 text-ihfcOrange rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{progressData.certificatesEarned}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Certificates Earned</p>
                    <p className="text-xs text-gray-500 font-medium">Certificate available after program completion</p>
                </div>

                {/* Next Session */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Next Live Session</p>
                    <p className="text-lg font-bold text-gray-900">Schedule will be updated</p>
                </div>

                {/* Course End Date */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold text-gray-900">{courseData.completionDate}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Course End Date</p>
                    <p className="text-xs text-gray-500 font-medium">{courseData.duration} program</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => navigate('/learning-path')} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center hover:border-ihfcOrange hover:shadow-sm transition-all group">
                        <BookOpen className="w-5 h-5 text-ihfcOrange mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-gray-800 text-sm">Continue Learning</span>
                    </button>
                    <button onClick={() => navigate('/learning-resources')} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center hover:border-ihfcOrange hover:shadow-sm transition-all group">
                        <Video className="w-5 h-5 text-ihfcOrange mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-gray-800 text-sm">Learning Resources</span>
                    </button>
                    <button onClick={() => navigate('/payments')} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center hover:border-ihfcOrange hover:shadow-sm transition-all group">
                        <CreditCard className="w-5 h-5 text-ihfcOrange mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-gray-800 text-sm">Payments & Receipts</span>
                    </button>
                    <button onClick={() => navigate('/course')} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center hover:border-ihfcOrange hover:shadow-sm transition-all group">
                        <FileText className="w-5 h-5 text-ihfcOrange mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-gray-800 text-sm">Course Details</span>
                    </button>
                </div>
            </div>

            {/* Main Content Grid 1: Current Learning & Payment Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Current Learning */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-ihfcOrange opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Learning</h2>
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                                <PlayCircle className="w-3.5 h-3.5 mr-1" /> In Progress
                            </span>
                        </div>

                        {currentModule ? (
                            <>
                                <h3 className="text-2xl font-bold text-gray-900">{currentModule.title}</h3>
                                <p className="text-gray-600 mt-3 max-w-xl leading-relaxed">{currentModule.description}</p>
                                
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {currentModule.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="py-8">
                                <h3 className="text-xl font-bold text-gray-400">Course resources will be added soon.</h3>
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button 
                            onClick={() => navigate('/learning-path')}
                            className="bg-ihfcDark text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors flex items-center"
                        >
                            Continue Learning <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>

                {/* Payment Status Card */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Payment Status</h2>
                        <button onClick={() => navigate('/payments')} className="text-ihfcOrange text-sm font-semibold hover:underline">
                            View Payments
                        </button>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                        {paymentData.installments.map((inst) => (
                            <div key={inst.id} className="flex justify-between items-center">
                                <div>
                                    <p className={`text-sm font-semibold ${inst.status === 'Paid' ? 'text-gray-700' : 'text-gray-900'}`}>{inst.type}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">₹{inst.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                    {inst.status === 'Paid' ? (
                                        <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                                            <Check className="w-3 h-3 mr-1" /> Paid
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">Total Paid:</span>
                            <span className="text-sm font-bold text-gray-900">₹{paymentData.totalPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">Amount Due:</span>
                            <span className="text-lg font-bold text-red-600">₹{paymentData.amountDue.toLocaleString()}</span>
                        </div>
                        
                        {pendingPayment && (
                            <button 
                                onClick={() => navigate('/payment/final-installment')}
                                className="w-full bg-ihfcOrange text-white font-bold py-2.5 rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                </div>

            </div>

            {/* Main Content Grid 2: Learning Path & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Learning Path Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Your Learning Path</h2>
                        <button onClick={() => navigate('/learning-path')} className="text-ihfcOrange text-sm font-semibold hover:underline">
                            View Learning Path
                        </button>
                    </div>

                    <div className="flex-1 space-y-4">
                        {courseData.modules.slice(0, 5).map((mod, idx) => (
                            <div key={mod.id} className="flex items-start">
                                <div className="flex flex-col items-center mr-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                        mod.status === 'completed' ? 'bg-green-100 text-green-600' :
                                        mod.status === 'current' ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' :
                                        'bg-gray-100 text-gray-400'
                                    }`}>
                                        {mod.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : 
                                         mod.status === 'current' ? <PlayCircle className="w-5 h-5" /> : 
                                         <Lock className="w-4 h-4" />}
                                    </div>
                                    {idx !== 4 && <div className="w-0.5 h-full min-h-[1.5rem] bg-gray-100 mt-2"></div>}
                                </div>
                                <div className="mt-1 pb-4">
                                    <p className="text-xs font-bold text-gray-400 mb-0.5">MODULE {mod.number}</p>
                                    <h4 className={`font-semibold ${mod.status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'}`}>
                                        {mod.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Modules */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Upcoming Modules</h2>
                    
                    <div className="space-y-4">
                        {upcomingModules.map((mod) => (
                            <div key={mod.id} className="flex items-center p-4 border border-gray-100 bg-gray-50/50 rounded-xl">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-gray-500 mb-0.5">MODULE {mod.number}</p>
                                    <h4 className="font-semibold text-gray-700 truncate">{mod.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 truncate">{mod.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Recommended Learning Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recommended Learning Resources</h2>
                    <button onClick={() => navigate('/learning-resources')} className="text-ihfcOrange text-sm font-semibold flex items-center hover:underline">
                        View All Resources <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {resourceData.slice(0, 3).map((res) => (
                        <div key={res.id} onClick={() => navigate(`/learning-resources?resource=${res.moduleId}`)} className="group cursor-pointer p-4 border border-gray-200 rounded-xl hover:border-ihfcOrange hover:shadow-sm transition-all flex flex-col h-full">
                            <div className="w-full aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                <Video className="w-8 h-8 text-gray-300 group-hover:scale-110 transition-transform" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <h4 className="font-bold text-gray-900 group-hover:text-ihfcOrange transition-colors line-clamp-2">{res.title}</h4>
                            <p className="text-xs text-gray-500 mt-auto pt-2">{res.author}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid 3: Activity, Notifications, Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Recent Activity</h2>
                    {activityData.length > 0 ? (
                        <ul className="space-y-5">
                            {activityData.map(act => (
                                <li key={act.id} className="flex items-start">
                                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mr-3 shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-800">{act.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">{act.date}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No recent activity</p>
                    )}
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Notifications</h2>
                    {notificationData.length > 0 ? (
                        <ul className="space-y-5">
                            {notificationData.map(notif => (
                                <li key={notif.id} className="flex items-start">
                                    <div className={`w-2 h-2 mt-2 rounded-full mr-3 shrink-0 ${notif.type === 'payment' ? 'bg-ihfcRed' : 'bg-ihfcOrange'}`}></div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{notif.title}</p>
                                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No new notifications</p>
                    )}
                </div>

                {/* Program Overview */}
                <div className="bg-ihfcDark rounded-xl shadow-sm p-6 text-white relative overflow-hidden flex flex-col">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                    <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-6">Program Overview</h2>
                    
                    <div className="space-y-4 flex-1">
                        <div>
                            <p className="text-xs text-gray-400">Duration</p>
                            <p className="font-semibold">{courseData.duration}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Start Date</p>
                            <p className="font-semibold">{courseData.startDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Expected Completion</p>
                            <p className="font-semibold">{courseData.completionDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Mode</p>
                            <p className="font-semibold">{courseData.mode}</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/course')}
                        className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-lg transition-colors border border-white/10 text-sm"
                    >
                        View Course Details
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;
