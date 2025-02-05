// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../models/customer';
import { v4 as uuidv4 } from 'uuid'; // Import a UUID generator (or use another method to generate ids)

export async function POST(request: Request) {
    try {
      await connectToDatabase();
      const { name, age, gender, mobile }: { name: string; age: number; gender: string; mobile: number } = await request.json();
      // Ensure all fields are provided
      if (!name || !age || !gender || !mobile) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }
      const newCustomer = await Customer.create({ name, age, gender, mobile });

      // Generate a custom id (e.g., using UUID)
      const customId = uuidv4(); // Generate a unique id

      const response = {
        id: newCustomer._id.toString(), // Convert _id to string and assign it to id
        name: newCustomer.name,
        age: newCustomer.age,
        gender: newCustomer.gender,
        mobile: newCustomer.mobile,
        createdAt: newCustomer.createdAt,
        updatedAt: newCustomer.updatedAt,
      };
      return NextResponse.json( response , { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Failed to create Customer' }, { status: 500 });
    }
}