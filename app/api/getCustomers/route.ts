import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

// GET /api/users - Fetch all users from the database
export async function GET() { 
  try {
    const db = await connectToDatabase();
    const customers = await db.collection('customers').find().toArray();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}