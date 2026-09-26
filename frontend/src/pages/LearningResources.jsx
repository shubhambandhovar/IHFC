import React, { useState, useEffect } from 'react';
import { PlayCircle, CheckCircle, Video } from 'lucide-react';

const modules = [
    {
        id: 'ihfc-induction',
        title: 'Program Induction & Overview',
        type: 'official',
        videoProvider: 'self-hosted',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder self-hosted video
        thumbnail: '',
        duration: '10:00',
        instructor: 'IHFC Academic Team',
        lessons: ['Welcome to IHFC', 'Platform Tour', 'Curriculum Overview']
    },
    {
        id: 'python-data-science',
        title: 'Python & Data Science',
        type: 'supplementary',
        videoProvider: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLZoTAELRMXVNUL99R4bDlVYsncUNvwUBB',
        instructor: 'Krish Naik',
        lessons: ['Introduction to Python', 'Pandas Tutorial', 'NumPy Basics', 'Matplotlib & Seaborn', 'Data Preprocessing']
    },
    {
        id: 'machine-learning',
        title: 'Machine Learning',
        type: 'supplementary',
        videoProvider: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe',
        instructor: 'Krish Naik',
        lessons: ['Introduction', 'Regression', 'Classification', 'Clustering', 'Ensemble Learning']
    },
    {
        id: 'deep-learning',
        title: 'Deep Learning',
        type: 'supplementary',
        videoProvider: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi',
        instructor: 'Krish Naik',
        lessons: ['Neural Networks', 'Forward & Backpropagation', 'Activation Functions', 'CNNs', 'RNNs']
    },
    {
        id: 'generative-ai',
        title: 'Generative AI',
        type: 'supplementary',
        videoProvider: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/pSVk-5WemQ0',
        instructor: 'Simplilearn',
        lessons: ['Generative AI Full Course']
    },
    {
        id: 'advanced-generative-ai',
        title: 'Advanced Generative AI / LangChain',
        type: 'supplementary',
        videoProvider: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0',
        instructor: 'CampusX',
        lessons: ['LangChain Introduction', 'LLM Wrappers', 'Prompt Templates', 'Chains', 'Agents']
    },
    {
        id: 'rag-ai-agents',
        title: 'RAG & AI Agents',
        type: 'supplementary',
        videoProvider: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/pSVk-5WemQ0',
        instructor: 'Industry Experts',
        lessons: ['Retrieval Augmented Generation Basics', 'Building AI Agents']
    },
    {
        id: 'nlp',
        title: 'Natural Language Processing',
        type: 'supplementary',
        videoProvider: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLZoTAELRMXVNNrHSKv36Lr3_156yCo6Nn',
        instructor: 'Krish Naik',
        lessons: ['Text Preprocessing', 'Bag of Words', 'TF-IDF', 'Word2Vec', 'Transformers']
    }
];

const LearningResources = () => {
    const [activeModule, setActiveModule] = useState(modules[0]);

    useEffect(() => {
        const savedModuleId = localStorage.getItem('lastSelectedModule');
        if (savedModuleId) {
            const found = modules.find(m => m.id === savedModuleId);
            if (found) setActiveModule(found);
        }
    }, []);

    const handleSelectModule = (mod) => {
        setActiveModule(mod);
        localStorage.setItem('lastSelectedModule', mod.id);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Learning Resources</h1>
                <p className="text-gray-600 mt-2">Strengthen your concepts with additional expert-led learning resources.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Module Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wider mb-4">Modules</h3>
                    {modules.map((mod) => (
                        <button 
                            key={mod.id}
                            onClick={() => handleSelectModule(mod)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${activeModule.id === mod.id ? 'bg-ihfcDark text-white border-ihfcDark shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                        >
                            <h4 className="font-semibold">{mod.title}</h4>
                            <p className={`text-xs mt-1 ${activeModule.id === mod.id ? 'text-gray-300' : 'text-gray-500'}`}>
                                {mod.type === 'supplementary' ? `Supplementary Resource by ${mod.instructor}` : mod.instructor}
                            </p>
                        </button>
                    ))}
                </div>

                {/* Video Player Area */}
                <div className="lg:col-span-3 bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{activeModule.title}</h2>
                            <p className="text-gray-500">
                                {activeModule.type === 'supplementary' ? `Supplementary Resource by ${activeModule.instructor}` : activeModule.instructor}
                            </p>
                        </div>
                        {activeModule.type === 'supplementary' && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-200">
                                Third-Party Content
                            </span>
                        )}
                    </div>
                    
                    <div className="p-6">
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-lg border border-gray-200">
                            {activeModule.videoProvider === 'self-hosted' ? (
                                <video 
                                    className="w-full h-full object-cover" 
                                    controls 
                                    preload="metadata"
                                >
                                    <source src={activeModule.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <iframe 
                                    className="w-full h-full"
                                    src={activeModule.embedUrl} 
                                    title={activeModule.title} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <Video className="w-5 h-5 mr-2 text-ihfcRed" /> 
                                Lessons in this Module
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {activeModule.lessons.map((lesson, idx) => (
                                    <div key={idx} className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                                        {idx === 0 ? (
                                            <PlayCircle className="w-5 h-5 text-ihfcOrange mr-3 flex-shrink-0" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></div>
                                        )}
                                        <span className={`text-sm font-medium ${idx === 0 ? 'text-ihfcOrange' : 'text-gray-700'}`}>{lesson}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="bg-ihfcOrange hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition-colors">
                                Continue Learning
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-12 max-w-3xl mx-auto border-t pt-6">
                Supplementary learning resources are provided through embedded third-party video content. These resources are intended for additional learning and are not a replacement for the official program curriculum, live sessions, assignments, projects or assessments. Please note that third-party instructors are independent creators and not official IHFC/IIT Delhi faculty.
            </p>
        </div>
    );
};

export default LearningResources;
