const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Payment = require('./models/Payment');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Payment.deleteMany();

        const student = await User.create({
            studentId: 'IHFC2026-001',
            enrollmentNumber: 'ENR-2026-4589',
            name: 'Shubham Shrivastava',
            email: 'shubham.shrivastava@ihfc.in',
            password: 'Shubham@55105',
            role: 'student',
            courseDetails: {
                programName: 'Professional Certificate Program in Generative AI, Machine Learning, and Intelligent Automation',
                startDate: '01/09/2026',
                endDate: '01/08/2027',
                duration: '11 Months',
                progress: 25
            }
        });

        await Payment.insertMany([
            {
                user: student._id,
                feeType: 'Registration Fee',
                amountDue: 25000,
                amountPaid: 25000,
                dueDate: 'March 01, 2026',
                status: 'Paid',
                receiptNumber: 'IHF2026-100234',
                transactionId: '123456789012',
                paymentDate: '01/03/2026 10:00 AM'
            },
            {
                user: student._id,
                feeType: 'Installment 1',
                amountDue: 25000,
                amountPaid: 25000,
                dueDate: 'April 01, 2026',
                status: 'Paid',
                receiptNumber: 'IHF2026-200345',
                transactionId: '987654321098',
                paymentDate: '01/04/2026 11:30 AM'
            },
            {
                user: student._id,
                feeType: 'Installment 2',
                amountDue: 25000,
                amountPaid: 25000,
                dueDate: 'May 01, 2026',
                status: 'Paid',
                receiptNumber: 'IHF2026-395467',
                transactionId: '648607195311',
                paymentDate: '01/05/2026 08:56 AM'
            },
            {
                user: student._id,
                feeType: 'Installment 3',
                amountDue: 25000,
                amountPaid: 25000,
                dueDate: 'June 01, 2026',
                status: 'Paid',
                receiptNumber: 'IHF2026-496697',
                transactionId: '836809733546',
                paymentDate: '01/06/2026 09:57 AM'
            },
            {
                user: student._id,
                feeType: 'Final Installment',
                amountDue: 53000,
                amountPaid: 0,
                dueDate: 'Payable on Course Completion',
                status: 'Pending'
            }
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
