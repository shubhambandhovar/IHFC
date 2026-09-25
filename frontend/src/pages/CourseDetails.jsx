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
            </div>
        </div>
    );
};

export default CourseDetails;
