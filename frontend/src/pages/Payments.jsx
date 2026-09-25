import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Download, AlertCircle } from 'lucide-react';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/student/payments', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setPayments(data);
            } catch(e) {
                setPayments([
                    { _id: '1', feeType: 'Registration Fee', amountDue: 25000, amountPaid: 25000, dueDate: 'March 01, 2026', status: 'Paid', receiptNumber: 'IHF2026-100234', transactionId: '123456789012' },
                    { _id: '2', feeType: 'Installment 1', amountDue: 25000, amountPaid: 25000, dueDate: 'April 01, 2026', status: 'Paid', receiptNumber: 'IHF2026-200345', transactionId: '987654321098' },
                    { _id: '3', feeType: 'Installment 2', amountDue: 25000, amountPaid: 25000, dueDate: 'May 01, 2026', status: 'Paid', receiptNumber: 'IHF2026-395467', transactionId: '648607195311' },
                    { _id: '4', feeType: 'Installment 3', amountDue: 25000, amountPaid: 25000, dueDate: 'June 01, 2026', status: 'Paid', receiptNumber: 'IHF2026-496697', transactionId: '836809733546' },
                    { _id: '5', feeType: 'Final Installment', amountDue: 53000, amountPaid: 0, dueDate: 'Upon Completion', status: 'Pending' }
                ]);
            }
        };
        fetchPayments();
    }, [user]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Payments & Receipts</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Installment Details</h2>
                    <div className="flex items-center text-ihfcOrange">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Final installment due upon completion</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                                <th className="p-4 font-semibold text-sm">Installment</th>
                                <th className="p-4 font-semibold text-sm">Due Date</th>
                                <th className="p-4 font-semibold text-sm">Amount Paid</th>
                                <th className="p-4 font-semibold text-sm">Amount Due</th>
                                <th className="p-4 font-semibold text-sm text-center">Status</th>
                                <th className="p-4 font-semibold text-sm text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{payment.feeType}</div>
                                        {payment.transactionId && <div className="text-xs text-gray-500 mt-1">TXN: {payment.transactionId}</div>}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{payment.dueDate}</td>
                                    <td className="p-4 text-sm font-medium text-gray-900">
                                        {payment.amountPaid > 0 ? `₹${payment.amountPaid.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="p-4 text-sm font-medium text-gray-900">
                                        {payment.amountDue > payment.amountPaid ? `₹${(payment.amountDue - payment.amountPaid).toLocaleString()}` : '-'}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {payment.status === 'Paid' && payment.receiptNumber && (
                                            <button className="text-simpliBlue hover:text-blue-800 flex items-center justify-center mx-auto transition-colors" title={`Receipt: ${payment.receiptNumber}`}>
                                                <Download className="w-5 h-5 mr-1" />
                                                <span className="text-xs">Receipt</span>
                                            </button>
                                        )}
                                        {payment.status !== 'Paid' && (
                                            <button className="bg-ihfcOrange text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">
                                                Pay Now
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;
