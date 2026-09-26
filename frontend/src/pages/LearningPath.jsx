import React, { useEffect, useState, useContext } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearningPath = () => {
    useDocumentTitle('IHFC Portal | Learning Path');
    const [path, setPath] = useState([]);
    const { user } = useContext(AuthContext);
    const { getCoreModuleStatus, getResourceProgress } = useProgress();
    const navigate = useNavigate();

    useEffect(() => {
        // Strict mapping of 8 core modules
        const hardcodedPath = [
            { id: 1, title: 'Program Induction', description: 'Step into a unique learning experience', resourceId: null },
            { id: 2, title: 'Python Refresher With AI', description: 'Essential programming skills', resourceId: null },
            { id: 3, title: 'Applied Data Science With Python', description: 'Data science principles', resourceId: null },
            { id: 4, title: 'Machine Learning', description: 'Machine learning fundamentals and frameworks', resourceId: 'machine-learning' },
            { id: 5, title: 'Deep Learning Specialization', description: 'Neural networks and deep learning', resourceId: 'deep-learning' },
            { id: 6, title: 'GenAI Literacy', description: 'Foundational Generative AI applications', resourceId: 'generative-ai-roadmap' },
            { id: 7, title: 'Advanced Generative AI', description: 'Large language models and architectures', resourceId: 'generative-ai-langchain' },
            { id: 8, title: 'Capstone Project', description: 'Real-world business challenge', resourceId: null }
        ];
        
        // Dynamically assign status from context
        const pathWithStatus = hardcodedPath.map(mod => ({
            ...mod,
            status: getCoreModuleStatus(mod.id.toString())
        }));
        
        setPath(pathWithStatus);
    }, [getCoreModuleStatus]);

    const handleContinue = (resourceId) => {
        if (resourceId) {
            navigate(`/learning-resources?resource=${resourceId}`);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Learning Path</h1>
            <p className="text-gray-600">From Foundation to Specialization</p>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                    {path.map((item) => {
                        const resProg = item.resourceId ? getResourceProgress(item.resourceId) : null;
                        
                        return (
                        <div key={item.id} className="relative pl-8">
                            <div className="absolute -left-[13px] bg-white pt-1">
                                {item.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                                {item.status === 'in_progress' && <PlayCircle className="w-6 h-6 text-ihfcOrange" />}
                                {item.status === 'not_started' && <Circle className="w-6 h-6 text-gray-300" />}
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold ${item.status === 'not_started' ? 'text-gray-500' : 'text-gray-900'}`}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 mt-1">{item.description}</p>
                                
                                {resProg && resProg.total > 0 && (
                                    <div className="mt-2 text-sm text-gray-500 font-medium">
                                        {resProg.completed} / {resProg.total} lessons completed ({resProg.percent}%)
                                    </div>
                                )}
                                
                                {item.resourceId ? (
                                    <button 
                                        onClick={() => handleContinue(item.resourceId)}
                                        className="mt-3 px-4 py-2 bg-ihfcOrange text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                                    >
                                        {item.status === 'completed' ? 'Review Content' : 'Continue Learning'}
                                    </button>
                                ) : (
                                    <div className="mt-3 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium inline-block cursor-not-allowed">
                                        Resources Coming Soon
                                    </div>
                                )}
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    );
};

export default LearningPath;
