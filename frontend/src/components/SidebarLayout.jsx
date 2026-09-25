import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Map, CreditCard, FileText, User, LogOut, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SidebarLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const links = user?.role === 'admin' 
      ? [{ name: 'Admin Dashboard', path: '/admin', icon: Shield }]
      : [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Course Details', path: '/course', icon: BookOpen },
        { name: 'Learning Path', path: '/learning-path', icon: Map },
        { name: 'Payments & Receipts', path: '/payments', icon: CreditCard },
        { name: 'Documents', path: '/documents', icon: FileText },
        { name: 'Profile', path: '/profile', icon: User },
      ];

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-64 bg-ihfcDark text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-ihfcGold">IHFC Portal</h1>
                    <p className="text-sm text-gray-400 mt-1">IIT Delhi & Simplilearn</p>
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                end={link.path === '/'}
                                className={({ isActive }) => cn(
                                    "flex items-center px-4 py-3 rounded-lg transition-colors",
                                    isActive ? "bg-ihfcRed text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {link.name}
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center px-4 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-ihfcOrange flex items-center justify-center font-bold text-white mr-3">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.studentId}</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto bg-gray-50">
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;
