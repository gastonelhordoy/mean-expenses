var mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var expenseSchema = new Schema({
    timestamp: { type: Date, required: true },
    description: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    comment: String,
    user: { type: Schema.Types.ObjectId, required: true, index: true }
});

expenseSchema.plugin(mongoose_timestamps);

mongoose.model('Expense', expenseSchema);
