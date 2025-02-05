// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../models/customer';

export async function PUT(request: Request) {
  try {
    // Parse the request body
    const { id, name, age, gender, mobile } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    if (!name || !age || !gender || !mobile) {
      return NextResponse.json({ error: 'All fields (name, age, gender, mobile) are required' }, { status: 400 });
    }

    await connectToDatabase();

    // Find and update the customer by ID
    const updateCustomer = await Customer.findByIdAndUpdate(id, { name, age, gender, mobile }, { new: true, runValidators: true });
    
    if (!updateCustomer) {
      return NextResponse.json({ error: 'Customer not found or update failed' } , { status: 404 } );
    }

    return NextResponse.json( updateCustomer , { status: 201 });
  } catch (error) {
    console.error('Error updating Customer:', error);
    return NextResponse.json({ error: 'Failed to update Customer' }, { status: 500 });  
  }
}