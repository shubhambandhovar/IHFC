import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { FileText, Download } from 'lucide-react';

const Documents = () => {
    useDocumentTitle('IHFC Portal | Documents');
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
                        <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="p-5 flex items-start">
                                <div className="bg-red-50 p-3 rounded-lg text-ihfcRed mr-4 shrink-0">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 line-clamp-2" title={doc.name}>{doc.name}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mt-2">
                                        <span className="font-medium px-2 py-0.5 bg-gray-100 rounded mr-2">{doc.type}</span>
                                        <span>{doc.size}</span>
                                        <span className="mx-2">•</span>
                                        <span>{doc.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 grid grid-cols-2">
                                <button className="py-3 text-sm font-semibold text-ihfcDark hover:bg-gray-50 transition-colors border-r border-gray-100">
                                    View
                                </button>
                                <button className="py-3 text-sm font-semibold text-ihfcOrange hover:bg-orange-50 transition-colors flex items-center justify-center">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Certificates</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map(cert => (
                        <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-200 relative overflow-hidden group flex flex-col">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ihfcGold opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 pointer-events-none"></div>
                            <div className="p-6 flex-1">
                                <h3 className="text-lg font-bold text-gray-900 pr-12">{cert.name}</h3>
                                <p className="text-sm text-gray-600 mt-2">Issuer: {cert.issuer}</p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        Status: {cert.date}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-gray-100">
                                <button disabled className="w-full py-4 text-gray-400 bg-gray-50 cursor-not-allowed flex items-center justify-center text-sm font-bold transition-colors">
                                    <Download className="w-4 h-4 mr-2" /> Download Certificate
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
