import React, { useState, useEffect, useRef, useContext } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PlayCircle, CheckCircle, Video, Clock, AlertTriangle, Circle, Check } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { fallbackModules as initialFallbackModules } from '../data/fallbackData';
import { useSearchParams } from 'react-router-dom';

const LearningResources = () => {
    useDocumentTitle('IHFC Portal | Learning Resources');
    const { user } = useContext(AuthContext);
    const { markLessonCompleted, updateLessonProgress, getResourceProgress, getLessonStatus } = useProgress();
    const [searchParams] = useSearchParams();
    const [modules, setModules] = useState([]);
    const [activeModule, setActiveModule] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const targetResourceId = searchParams.get('resource') || searchParams.get('module');
        setModules(initialFallbackModules);
        
        let initialModule = null;
        if (targetResourceId) {
            initialModule = initialFallbackModules.find(m => m._id === targetResourceId);
        } else {
            initialModule = initialFallbackModules[0];
        }

        if (initialModule) {
            setActiveModule(initialModule);
            const targetLessonId = searchParams.get('lesson');
            if (targetLessonId && initialModule.lessons?.length > 0) {
                const specificLesson = initialModule.lessons.find(l => l._id === targetLessonId);
                setActiveLesson(specificLesson || initialModule.lessons[0]);
            } else if (initialModule.lessons?.length > 0) {
                setActiveLesson(initialModule.lessons[0]);
            } else {
                setActiveLesson(null);
            }
        } else if (targetResourceId) {
            setActiveModule(null);
            setActiveLesson(null);
        }
        
        setLoading(false);
    }, [searchParams]);

    const handleSelectModule = (mod) => {
        setActiveModule(mod);
        if (mod.lessons?.length > 0) setActiveLesson(mod.lessons[0]);
        else setActiveLesson(null);
    };

    const handleSelectLesson = (lesson) => {
        setVideoError(false);
        setActiveLesson(lesson);
        if (!lesson.isDemo) {
            updateLessonProgress(activeModule._id, lesson._id, 0);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current || !activeLesson || activeLesson.isDemo) return;
        const duration = videoRef.current.duration;
        const current = videoRef.current.currentTime;
        if (duration > 0 && Math.floor(current) % 5 === 0) {
            const percent = (current / duration) * 100;
            updateLessonProgress(activeModule._id, activeLesson._id, percent);
        }
    };

    const handleVideoEnded = () => {
        if (!activeLesson) return;
        if (!activeLesson.isDemo) {
            markLessonCompleted(activeModule._id, activeLesson._id);
        }
        const currentIndex = activeModule.lessons.findIndex(l => l._id === activeLesson._id);
        if (currentIndex !== -1 && currentIndex < activeModule.lessons.length - 1) {
            setActiveLesson(activeModule.lessons[currentIndex + 1]);
        }
    };

    const handleVideoError = (e) => {
        console.error("Video Playback Error:", e);
        setVideoError(true);
    };

    if (loading) return <div className="p-8">Loading course architecture...</div>;
    if (!modules.length) return <div className="p-8">No learning resources available yet.</div>;
    
    if (!activeModule) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">AI Learning Resources</h1>
                    <p className="text-gray-600 mt-2">Strengthen your concepts with authorized expert-led learning resources.</p>
                </div>
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center mt-8">
                    <AlertTriangle className="w-16 h-16 text-ihfcOrange mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Resource not found</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        The requested learning resource could not be found. It may have been removed or the link is incorrect.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/learning-resources'}
                        className="bg-ihfcDark text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black transition-colors"
                    >
                        Back to Learning Resources
                    </button>
                </div>
            </div>
        );
    }

    // Filter out demo lessons for completion calculations
    const resProg = getResourceProgress(activeModule._id);
    const activeLessonStatus = activeLesson ? getLessonStatus(activeLesson._id) : null;

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
                    <div className="overflow-y-auto space-y-3 flex-1 pr-2">
                        {modules.map((mod) => {
                            const modProg = getResourceProgress(mod._id);
                            return (
                            <button 
                                key={mod._id}
                                onClick={() => handleSelectModule(mod)}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${activeModule._id === mod._id ? 'bg-ihfcDark text-white border-ihfcDark shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                            >
                                <h4 className="font-semibold">{mod.title}</h4>
                                <p className={`text-xs mt-1 ${activeModule._id === mod._id ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {mod.instructor || mod.author}
                                </p>
                                
                                {modProg.total > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-200/20">
                                        <p className={`text-xs mb-1 ${activeModule._id === mod._id ? 'text-gray-300' : 'text-gray-500'}`}>
                                            {modProg.completed} / {modProg.total} completed
                                        </p>
                                        <div className="w-full bg-gray-200/30 rounded-full h-1.5 mb-1 flex overflow-hidden">
                                            <div className="bg-ihfcOrange h-1.5 rounded-full" style={{ width: `${modProg.percent}%` }}></div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-bold ${activeModule._id === mod._id ? 'text-gray-300' : 'text-gray-500'}`}>{modProg.percent}%</span>
                                        </div>
                                    </div>
                                )}
                            </button>
                        )})}
                    </div>
                </div>

                {/* Video Player & Lesson List Area */}
                <div className="lg:col-span-3 flex flex-col space-y-6">
                    
                    {/* Video Player Container */}
                    <div className="bg-black rounded-xl overflow-hidden shadow-xl border border-gray-800 aspect-video relative group">
                        {!activeLesson?.videoUrl ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                                <Clock className="w-12 h-12 text-gray-500 mb-4" />
                                <h3 className="text-2xl font-bold">Video coming soon</h3>
                                <p className="text-gray-400 mt-2 text-center max-w-md">Video unavailable — authorized course video not yet uploaded.</p>
                            </div>
                        ) : activeLesson?.videoProvider === 'youtube' ? (
                            <iframe 
                                key={activeLesson.videoUrl}
                                src={`${activeLesson.videoUrl}?rel=0&modestbranding=1`} 
                                className="w-full h-full border-0" 
                                allowFullScreen 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        ) : videoError ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
                                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                                <h3 className="text-2xl font-bold">Unable to load this video</h3>
                                <p className="text-gray-400 mt-2">The authorized video file could not be played. Please contact the program administrator if the problem persists.</p>
                            </div>
                        ) : (
                            <video
                                key={activeLesson.videoUrl}
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                                preload="metadata"
                                onTimeUpdate={handleTimeUpdate}
                                onEnded={handleVideoEnded}
                                onError={handleVideoError}
                            >
                                <source src={activeLesson.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    
                    {/* Completion Button & Actions */}
                    {activeLesson && !activeLesson.isDemo && (
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <div>
                                <h3 className="font-bold text-gray-900">{activeLesson.title}</h3>
                                {activeLessonStatus?.status === 'in_progress' && activeLessonStatus.watchedPercent > 0 && (
                                    <p className="text-xs text-gray-500 mt-1">{Math.round(activeLessonStatus.watchedPercent)}% watched</p>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => markLessonCompleted(activeModule._id, activeLesson._id)}
                                className={`flex items-center px-6 py-2.5 rounded-lg font-bold shadow-sm transition-all ${
                                    activeLessonStatus?.status === 'completed' 
                                        ? 'bg-green-50 text-green-700 border border-green-200 cursor-default' 
                                        : 'bg-ihfcOrange text-white hover:bg-orange-600'
                                }`}
                            >
                                {activeLessonStatus?.status === 'completed' ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2" />
                                        Completed
                                    </>
                                ) : (
                                    'Mark as Completed'
                                )}
                            </button>
                        </div>
                    )}

                    {/* Demo Warning Label */}
                    {activeLesson?.isDemo && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700 font-bold uppercase tracking-wide">
                                        Demo Video — Not Official Course Content
                                    </p>
                                    <p className="text-xs text-yellow-600 mt-1">
                                        This is a playable test video for development purposes. It will be replaced once the authorized video URL is supplied.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lesson Library */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1 min-h-[300px]">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <Video className="w-5 h-5 mr-2 text-ihfcRed" /> 
                                Lessons in this Module
                            </h3>
                        </div>
                        
                        <div className="divide-y divide-gray-100 overflow-y-auto max-h-[500px]">
                            {activeModule.lessons?.map((lesson) => {
                                const lStatus = getLessonStatus(lesson._id);
                                return (
                                <button 
                                    key={lesson._id} 
                                    onClick={() => handleSelectLesson(lesson)}
                                    className={`w-full text-left p-4 flex items-center transition-colors ${activeLesson?._id === lesson._id ? 'bg-ihfcOrange/5 border-l-4 border-l-ihfcOrange' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                                >
                                    <div className="mr-4">
                                        {lStatus.status === 'completed' ? (
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        ) : lStatus.status === 'in_progress' ? (
                                            <PlayCircle className="w-6 h-6 text-ihfcOrange" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-medium ${activeLesson?._id === lesson._id ? 'text-ihfcOrange font-bold' : 'text-gray-800'}`}>
                                            {lesson.title} {lesson.isDemo ? '(Demo)' : ''}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {lStatus.status === 'in_progress' ? `${Math.round(lStatus.watchedPercent)}% watched` : lStatus.status === 'not_started' ? 'Not Started' : 'Completed'}
                                        </p>
                                    </div>
                                </button>
                            )})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningResources;
