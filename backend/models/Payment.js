const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feeType: { type: String, required: true },
    amountDue: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
    receiptNumber: { type: String },
    transactionId: { type: String },
    paymentDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
