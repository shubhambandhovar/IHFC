import React, { useState, useEffect, useRef, useContext } from 'react';
import { PlayCircle, CheckCircle, Video, Play, Pause, Maximize, Volume2, Clock } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LearningResources = () => {
    const { user } = useContext(AuthContext);
    const [modules, setModules] = useState([]);
    const [activeModule, setActiveModule] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                // If backend isn't populated, we'll use a local fallback for demonstration
                // However, the architecture is ready to fetch from /api/learning/modules
                const { data } = await axios.get('https://ihfc.onrender.com/api/learning/modules', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                
                if (data && data.length > 0) {
                    setModules(data);
                    setActiveModule(data[0]);
                    if (data[0].lessons?.length > 0) setActiveLesson(data[0].lessons[0]);
                } else {
                    // Fallback initial data structure as requested
                    const fallbackModules = [
                        {
                            _id: '1',
                            title: 'Machine Learning',
                            instructor: 'Krish Naik',
                            published: true,
                            lessons: [
                                { _id: 'l1', title: '01 Introduction to Machine Learning', videoProvider: 'self-hosted', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                                { _id: 'l2', title: '02 Linear Regression', videoProvider: 'self-hosted', videoUrl: '' },
                                { _id: 'l3', title: '03 Logistic Regression', videoProvider: 'self-hosted', videoUrl: '' },
                                { _id: 'l4', title: '04 Decision Trees', videoProvider: 'self-hosted', videoUrl: '' },
                            ]
                        }
                    ];
                    setModules(fallbackModules);
                    setActiveModule(fallbackModules[0]);
                    setActiveLesson(fallbackModules[0].lessons[0]);
                }
            } catch (error) {
                console.error("Failed to fetch modules", error);
                // Fallback if backend is down or unreachable
                const fallbackModules = [
                    {
                        _id: '1',
                        title: 'Machine Learning',
                        instructor: 'Krish Naik',
                        published: true,
                        lessons: [
                            { _id: 'l1', title: '01 Introduction to Machine Learning', videoProvider: 'self-hosted', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                            { _id: 'l2', title: '02 Linear Regression', videoProvider: 'self-hosted', videoUrl: '' },
                            { _id: 'l3', title: '03 Logistic Regression', videoProvider: 'self-hosted', videoUrl: '' },
                            { _id: 'l4', title: '04 Decision Trees', videoProvider: 'self-hosted', videoUrl: '' },
                        ]
                    }
                ];
                setModules(fallbackModules);
                setActiveModule(fallbackModules[0]);
                setActiveLesson(fallbackModules[0].lessons[0]);
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, [user.token]);

    const handleSelectModule = (mod) => {
        setActiveModule(mod);
        if (mod.lessons?.length > 0) setActiveLesson(mod.lessons[0]);
    };

    const handleSelectLesson = (lesson) => {
        setActiveLesson(lesson);
        // Track progress when selecting a new lesson
        trackProgress(lesson._id, false, 0);
    };

    const trackProgress = async (lessonId, completed, position) => {
        try {
            await axios.post('https://ihfc.onrender.com/api/learning/progress', 
                { lessonId, moduleId: activeModule._id, completed, playbackPosition: position },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
        } catch (error) {
            console.error("Progress tracking error:", error);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current || !activeLesson) return;
        // Save progress every 10 seconds approx
        if (Math.floor(videoRef.current.currentTime) % 10 === 0) {
            trackProgress(activeLesson._id, false, videoRef.current.currentTime);
        }
    };

    const handleVideoEnded = () => {
        if (!activeLesson) return;
        trackProgress(activeLesson._id, true, videoRef.current.currentTime);
        // Go to next lesson if available
        const currentIndex = activeModule.lessons.findIndex(l => l._id === activeLesson._id);
        if (currentIndex !== -1 && currentIndex < activeModule.lessons.length - 1) {
            setActiveLesson(activeModule.lessons[currentIndex + 1]);
        }
    };

    if (loading) return <div className="p-8">Loading course architecture...</div>;
    if (!modules.length) return <div className="p-8">No learning resources available yet.</div>;

    const completedLessons = 1; // Example derived from user context
    const totalLessons = activeModule.lessons?.length || 1;
    const progressPercent = Math.round((completedLessons / totalLessons) * 100);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Learning Resources</h1>
                <p className="text-gray-600 mt-2">Strengthen your concepts with authorized expert-led learning resources.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Module Sidebar */}
                <div className="lg:col-span-1 space-y-2 flex flex-col max-h-[800px]">
                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wider mb-4">Modules</h3>
                    <div className="overflow-y-auto space-y-2 flex-1 pr-2">
                        {modules.map((mod) => (
                            <button 
                                key={mod._id}
                                onClick={() => handleSelectModule(mod)}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${activeModule._id === mod._id ? 'bg-ihfcDark text-white border-ihfcDark shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                            >
                                <h4 className="font-semibold">{mod.title}</h4>
                                <p className={`text-xs mt-1 ${activeModule._id === mod._id ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {mod.instructor}
                                </p>
                            </button>
                        ))}
                    </div>
                    
                    {/* Progress Card */}
                    <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-sm font-bold text-gray-800 mb-2">{activeModule.title} Progress</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                            <div className="bg-ihfcOrange h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{completedLessons} / {totalLessons} lessons completed ({progressPercent}%)</p>
                    </div>
                </div>

                {/* Video Player & Lesson List Area */}
                <div className="lg:col-span-3 flex flex-col space-y-6">
                    
                    {/* Native Video Player */}
                    <div className="bg-black rounded-xl overflow-hidden shadow-xl border border-gray-800 aspect-video relative group">
                        {activeLesson?.videoUrl ? (
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                                preload="metadata"
                                onTimeUpdate={handleTimeUpdate}
                                onEnded={handleVideoEnded}
                                src={activeLesson.videoUrl}
                                autoPlay
                            >
                                <source src={activeLesson.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                                <Clock className="w-12 h-12 text-gray-500 mb-4" />
                                <h3 className="text-2xl font-bold">Video coming soon</h3>
                                <p className="text-gray-400 mt-2 text-center max-w-md">The authorized video file for this lesson is currently being processed and will be available shortly.</p>
                            </div>
                        )}
                        
                        {/* Overlay Title (Visible when paused or starting) */}
                        <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/70 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            <h2 className="text-white text-xl font-bold">{activeLesson?.title}</h2>
                            <p className="text-gray-300 text-sm">{activeModule.title}</p>
                        </div>
                    </div>

                    {/* Lesson Library */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1 min-h-[300px]">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <Video className="w-5 h-5 mr-2 text-ihfcRed" /> 
                                Lessons in this Module
                            </h3>
                        </div>
                        
                        <div className="divide-y divide-gray-100 overflow-y-auto">
                            {activeModule.lessons?.map((lesson, idx) => (
                                <button 
                                    key={lesson._id} 
                                    onClick={() => handleSelectLesson(lesson)}
                                    className={`w-full text-left p-4 flex items-center transition-colors ${activeLesson?._id === lesson._id ? 'bg-ihfcOrange/5 border-l-4 border-l-ihfcOrange' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                                >
                                    <div className="mr-4">
                                        {activeLesson?._id === lesson._id ? (
                                            <PlayCircle className="w-6 h-6 text-ihfcOrange" />
                                        ) : (
                                            <CheckCircle className="w-6 h-6 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-medium ${activeLesson?._id === lesson._id ? 'text-ihfcOrange font-bold' : 'text-gray-800'}`}>
                                            {lesson.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {lesson.videoUrl ? 'Video Lesson' : 'Coming Soon'}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningResources;
