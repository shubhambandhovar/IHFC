import React from 'react';

const CourseDetails = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Course Details</h1>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6 border-b pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-ihfcDark">Professional Certificate Program in Generative AI, Machine Learning, and Intelligent Automation</h2>
                        <p className="text-gray-600 mt-2">Powered By Simplilearn | In Collaboration With Microsoft</p>
                    </div>
                    <div className="text-right">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Program Overview</h3>
                        <p className="text-gray-700 leading-relaxed">
                            This comprehensive program is designed to provide you with a practical, end-to-end understanding of the AI-driven world, starting from core programming and data science, through advanced machine learning and deep learning, all the way to generative AI and intelligent automation.
                        </p>
                        
                        <h3 className="text-lg font-bold mt-6 mb-4">Key Features</h3>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            <li>IHFC, TIH of IIT Delhi Certified Program</li>
                            <li>Microsoft Azure AI Credentials</li>
                            <li>Live Expert-Led Learning</li>
                            <li>IHFC Masterclasses & AI Impact Lab</li>
                            <li>20+ AI Tools & Libraries</li>
                            <li>165+ Exercises & 12+ Projects</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Tools Covered</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'SciPy', 'Seaborn', 'Matplotlib', 'TensorFlow', 'Keras', 'OpenCV', 'ChatGPT', 'OpenAI API', 'LangChain', 'Hugging Face'].map(tool => (
                                <span key={tool} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-md text-sm font-medium text-gray-700">{tool}</span>
                            ))}
                        </div>

                        <h3 className="text-lg font-bold mb-4">Important Dates</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Start Date</span>
                                <span className="font-medium text-gray-900">01/09/2026</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-medium text-gray-900">11 Months</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Expected Completion</span>
                                <span className="font-medium text-gray-900">01/08/2027</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Course Video Lectures</h3>
                    
                    {/* Custom Video Player Layout */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Video Player (Left Side) */}
                        <div className="lg:w-2/3">
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-black relative">
                                <iframe 
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/JMUxmLyrhSk?modestbranding=1&rel=0&showinfo=0" 
                                    title="Active Video" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <h4 className="text-xl font-bold mt-4 text-gray-900">1. What Is AI? | Artificial Intelligence In 5 Mins</h4>
                            <p className="text-gray-500 text-sm mt-1">Simplilearn • 5:28</p>
                        </div>

                        {/* Video List (Right Side) */}
                        <div className="lg:w-1/3 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex flex-col h-[450px]">
                            <div className="bg-white border-b px-4 py-3 font-bold text-gray-800 shadow-sm z-10">
                                Course Curriculum
                            </div>
                            <div className="overflow-y-auto flex-1 p-2 space-y-2">
                                
                                {/* Active Item */}
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-ihfcOrange/10 border border-ihfcOrange/20 cursor-pointer transition-colors">
                                    <div className="mt-1 text-ihfcOrange">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-gray-900 text-sm">1. What Is AI? | Artificial Intelligence In 5 Mins</h5>
                                        <p className="text-xs text-ihfcOrange font-medium mt-1">Playing • 5:28</p>
                                    </div>
                                </div>

                                {/* Inactive Item */}
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                    <div className="mt-1 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-gray-700 text-sm hover:text-gray-900">2. Machine Learning Basics Explained</h5>
                                        <p className="text-xs text-gray-500 mt-1">10:15</p>
                                    </div>
                                </div>

                                {/* Inactive Item */}
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                    <div className="mt-1 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-gray-700 text-sm hover:text-gray-900">3. Deep Learning Neural Networks</h5>
                                        <p className="text-xs text-gray-500 mt-1">14:20</p>
                                    </div>
                                </div>
                                
                                {/* Inactive Item */}
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                    <div className="mt-1 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-gray-700 text-sm hover:text-gray-900">4. Generative AI and LLMs Tutorial</h5>
                                        <p className="text-xs text-gray-500 mt-1">18:45</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
