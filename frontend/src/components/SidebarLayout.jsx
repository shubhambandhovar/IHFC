import React, { useContext, useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Map, CreditCard, FileText, User, LogOut, Shield, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SidebarLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

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
        { name: 'Learning Resources', path: '/learning-resources', icon: BookOpen },
        { name: 'Payments & Receipts', path: '/payments', icon: CreditCard },
        { name: 'Documents', path: '/documents', icon: FileText },
        { name: 'Profile', path: '/profile', icon: User },
      ];

    const SidebarContent = () => (
        <>
            <div className="p-6 shrink-0">
                <h1 className="text-2xl font-bold text-ihfcGold">IHFC Portal</h1>
                <p className="text-sm text-gray-400 mt-1">IIT Delhi & Simplilearn</p>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === '/'}
                            className={({ isActive }) => cn(
                                "flex items-center px-4 py-3 rounded-lg transition-colors font-medium",
                                isActive ? "bg-ihfcRed text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5 mr-3 shrink-0" />
                            <span className="truncate">{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-700 shrink-0">
                <div className="flex items-center px-4 py-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-ihfcOrange flex items-center justify-center font-bold text-white mr-3 shrink-0">
                        {user?.name?.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.studentId}</p>
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                    <LogOut className="w-5 h-5 mr-3 shrink-0" />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden">
            
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between bg-ihfcDark text-white h-16 px-4 shrink-0 shadow-md z-20">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 -ml-2 text-white hover:bg-gray-800 rounded-lg focus:outline-none"
                    aria-label="Open navigation"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="font-bold text-ihfcGold text-lg tracking-wide">IHFC Portal</div>
                <div className="w-8 h-8 rounded-full bg-ihfcOrange flex items-center justify-center font-bold text-sm shrink-0">
                    {user?.name?.charAt(0)}
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Mobile Drawer Content */}
            <div className={cn(
                "md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-ihfcDark text-white flex flex-col transform transition-transform duration-300 ease-in-out",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="absolute top-4 right-4">
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg focus:outline-none"
                        aria-label="Close navigation"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <SidebarContent />
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-[270px] bg-ihfcDark text-white flex-col shrink-0">
                <SidebarContent />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto bg-gray-50 relative w-full">
                <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;
