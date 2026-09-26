import React, { useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building2, Smartphone, AlertCircle, ShieldCheck } from 'lucide-react';
import { studentProfile } from '../data/portalData';

const PaymentCheckout = () => {
    useDocumentTitle('IHFC Portal | Payment');
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [toastMessage, setToastMessage] = useState('');

    const handlePay = () => {
        setToastMessage('Payment gateway is not configured yet.');
        setTimeout(() => setToastMessage(''), 4000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 relative">
            {/* Back Button */}
            <button 
                onClick={() => navigate('/payments')}
                className="flex items-center text-gray-500 hover:text-ihfcDark font-medium transition-colors mb-2"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Payments & Receipts
            </button>

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
                <p className="text-gray-600 mt-2">Complete your final installment payment</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Details & Methods */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Final Installment Summary Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-200 p-5">
                            <h2 className="text-sm font-bold text-gray-500 tracking-wider uppercase">Final Installment</h2>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">Professional Certificate Program in Generative AI, Machine Learning, and Intelligent Automation</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <div>
                                    <p className="text-sm text-gray-500">Student</p>
                                    <p className="font-semibold text-gray-900 mt-1">{studentProfile.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Student ID</p>
                                    <p className="font-semibold text-gray-900 mt-1">{studentProfile.studentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Due</p>
                                    <p className="font-semibold text-gray-900 mt-1">Upon Completion</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className="inline-block mt-1 bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                        Pending
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h3>
                        
                        <div className="space-y-4">
                            {/* UPI Option */}
                            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${selectedMethod === 'upi' ? 'border-ihfcOrange bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="payment_method" 
                                    value="upi" 
                                    checked={selectedMethod === 'upi'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="w-4 h-4 text-ihfcOrange focus:ring-ihfcOrange border-gray-300" 
                                />
                                <div className="ml-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-gray-900">UPI (GPay, PhonePe, Paytm)</span>
                                </div>
                            </label>

                            {/* Card Option */}
                            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${selectedMethod === 'card' ? 'border-ihfcOrange bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="payment_method" 
                                    value="card" 
                                    checked={selectedMethod === 'card'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="w-4 h-4 text-ihfcOrange focus:ring-ihfcOrange border-gray-300" 
                                />
                                <div className="ml-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-gray-900">Credit / Debit Card</span>
                                </div>
                            </label>

                            {/* Net Banking Option */}
                            <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${selectedMethod === 'netbanking' ? 'border-ihfcOrange bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="payment_method" 
                                    value="netbanking" 
                                    checked={selectedMethod === 'netbanking'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="w-4 h-4 text-ihfcOrange focus:ring-ihfcOrange border-gray-300" 
                                />
                                <div className="ml-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-gray-900">Net Banking</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h3>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Amount</span>
                                <span className="font-semibold text-gray-900">₹53,000.00</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Processing Fee</span>
                                <span className="font-semibold text-gray-900">₹0.00</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total Payable</span>
                                <span className="text-2xl font-bold text-green-600">₹53,000.00</span>
                            </div>
                        </div>

                        <button 
                            onClick={handlePay}
                            className="w-full bg-ihfcOrange text-white font-bold py-3.5 rounded-lg hover:bg-orange-600 transition-colors shadow-sm flex justify-center items-center gap-2"
                        >
                            <ShieldCheck className="w-5 h-5" />
                            Pay ₹53,000
                        </button>
                        
                        <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                            Secured by 256-bit SSL encryption
                        </p>
                    </div>
                </div>
            </div>

            {/* Error/Notice Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in z-50">
                    <AlertCircle className="w-6 h-6" />
                    <div>
                        <h4 className="font-bold">Transaction Failed</h4>
                        <span className="font-medium text-sm text-red-50">{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentCheckout;
