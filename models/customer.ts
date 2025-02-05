import mongoose from 'mongoose';

const url = process.env.MONGODB_URL || '';

if (!mongoose.connection.readyState) {
  mongoose.connect(url);
}

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mobile: Number,
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
  versionKey: false,
}
);

const Customer = mongoose.models.Customer || mongoose.model('Customers', customerSchema);

export default Customer;