import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fallbackModules } from '../data/fallbackData';
import { PlayCircle, ListVideo, Video } from 'lucide-react';

const CourseDetails = () => {
    const navigate = useNavigate();

    // Filter out the demo module to only show official curriculum
    const officialModules = fallbackModules.filter(m => m._id !== '0');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#0f172a]">Course Details</h1>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-snug max-w-4xl">
                            Professional Certificate Program in Generative AI, Machine Learning, and Intelligent Automation
                        </h2>
                        <p className="text-gray-600 mt-2 font-medium">Powered By Simplilearn | In Collaboration With Microsoft</p>
                    </div>
                    <div className="shrink-0">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-green-100 text-green-800">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            Active
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Program Overview</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            This comprehensive program is designed to provide you with a practical, end-to-end understanding of the AI-driven world, starting from core programming and data science, through advanced machine learning and deep learning, all the way to generative AI and intelligent automation.
                        </p>
                        
                        <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Key Features</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start"><span className="text-ihfcOrange mr-2">•</span> IHFC, TIH of IIT Delhi Certified Program</li>
                            <li className="flex items-start"><span className="text-ihfcOrange mr-2">•</span> Microsoft Azure AI Credentials</li>
                            <li className="flex items-start"><span className="text-ihfcOrange mr-2">•</span> Live Expert-Led Learning</li>
                            <li className="flex items-start"><span className="text-ihfcOrange mr-2">•</span> IHFC Masterclasses & AI Impact Lab</li>
                            <li className="flex items-start"><span className="text-ihfcOrange mr-2">•</span> 20+ AI Tools & Libraries</li>
                            <li className="flex items-start"><span className="text-ihfcOrange mr-2">•</span> 165+ Exercises & 12+ Projects</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Tools Covered</h3>
                        <div className="flex flex-wrap gap-2.5 mb-8">
                            {['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'SciPy', 'Seaborn', 'Matplotlib', 'TensorFlow', 'Keras', 'OpenCV', 'ChatGPT', 'OpenAI API', 'LangChain', 'Hugging Face'].map(tool => (
                                <span key={tool} className="px-4 py-1.5 bg-gray-100/80 hover:bg-gray-200 transition-colors rounded-full text-xs font-semibold text-gray-700">
                                    {tool}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold mb-4 text-gray-900">Important Dates</h3>
                        <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                                <span className="text-gray-500 text-sm font-medium">Start Date</span>
                                <span className="font-bold text-gray-900">01/09/2026</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                                <span className="text-gray-500 text-sm font-medium">Duration</span>
                                <span className="font-bold text-gray-900">11 Months</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm font-medium">Expected Completion</span>
                                <span className="font-bold text-gray-900">01/08/2027</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Course Video Lectures</h3>
                            <p className="text-sm text-gray-500 mt-1">Official curriculum resources and playlists</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {officialModules.map((mod) => {
                            const isSingleVideo = mod.lessons?.length === 1;
                            const lessonCount = mod.lessons?.length || 0;
                            
                            return (
                                <div key={mod._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
                                    <div className="h-32 bg-gray-900 relative flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-ihfcDark to-black opacity-90"></div>
                                        {isSingleVideo ? (
                                            <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-ihfcOrange transition-colors z-10" />
                                        ) : (
                                            <ListVideo className="w-12 h-12 text-white/50 group-hover:text-ihfcOrange transition-colors z-10" />
                                        )}
                                        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-medium text-white border border-white/10">
                                            <Video className="w-3.5 h-3.5 text-red-500" />
                                            {isSingleVideo ? 'Video' : 'Playlist'}
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h4 className="font-bold text-gray-900 text-lg line-clamp-2 mb-2 group-hover:text-ihfcOrange transition-colors">
                                            {mod.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                                            <span className="font-medium text-gray-700">{mod.instructor}</span>
                                            <span>{isSingleVideo ? '1 Video' : `${lessonCount} Lessons`}</span>
                                        </div>
                                        <button 
                                            onClick={() => navigate(`/resources?module=${mod._id}`)}
                                            className="mt-auto w-full py-2.5 rounded-lg border-2 border-ihfcOrange text-ihfcOrange font-bold hover:bg-ihfcOrange hover:text-white transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isSingleVideo ? (
                                                <><PlayCircle className="w-4 h-4" /> Watch Video</>
                                            ) : (
                                                <><ListVideo className="w-4 h-4" /> View Lessons</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
