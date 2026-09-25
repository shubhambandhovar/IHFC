import React from 'react';
import { FileText, Download } from 'lucide-react';

const Documents = () => {
    const documents = [
        { id: 1, name: 'IHFC IIT Delhi Official Brochure', size: '2.4 MB', date: '01/09/2026', type: 'PDF' },
        { id: 2, name: 'Welcome Kit & Onboarding Guide', size: '1.1 MB', date: '01/09/2026', type: 'PDF' },
        { id: 3, name: 'Academic Masterclass Schedule', size: '0.5 MB', date: '05/09/2026', type: 'PDF' }
    ];

    const certificates = [
        { id: 1, name: 'Professional Certificate Program in Generative AI, Machine Learning, and Intelligent Automation', issuer: 'IHFC, IIT Delhi & Simplilearn', date: 'Pending' },
        { id: 2, name: 'Microsoft Azure AI Fundamentals', issuer: 'Microsoft', date: 'Pending' }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Course Documents</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map(doc => (
                        <div key={doc.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start hover:shadow-md transition-shadow cursor-pointer">
                            <div className="bg-red-50 p-3 rounded-lg text-ihfcRed mr-4">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 truncate" title={doc.name}>{doc.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-500">{doc.size} • {doc.date}</span>
                                    <Download className="w-4 h-4 text-gray-400 hover:text-simpliBlue" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Certificates</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map(cert => (
                        <div key={cert.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ihfcGold opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8"></div>
                            <h3 className="text-lg font-bold text-gray-900 pr-12">{cert.name}</h3>
                            <p className="text-sm text-gray-600 mt-2">Issuer: {cert.issuer}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Status: {cert.date}
                                </span>
                                <button disabled className="text-gray-400 cursor-not-allowed flex items-center text-sm font-medium">
                                    <Download className="w-4 h-4 mr-1" /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Documents;
