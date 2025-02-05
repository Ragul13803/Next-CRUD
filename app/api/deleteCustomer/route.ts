// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../models/customer';

export async function DELETE(request: Request) {

  try{
    await connectToDatabase();
    // Parse the request body
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Customer ID is required' }, { status: 400 });
    }

    // if (!name || !age || !gender || !mobile) {
    //   return NextResponse.json({ error: 'All fields (name, age, gender, mobile) are required' }, { status: 400 });
    // }

    // Find and delete the customer by ID
    const deleteCustomer = await Customer.findByIdAndDelete(id);

    if (!deleteCustomer) {
      return NextResponse.json({ success: false, message: 'Customer not found' } , { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Customer deleted successfully'}, { status: 200 });
  }catch (error) {
    console.error('Error deleting Customer', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status : 500 });
  }
}