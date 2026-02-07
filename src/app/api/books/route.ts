// src/app/api/books/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  // If there's no search term, don't even try the API
  if (!search) {
    return NextResponse.json([]);
  }

  try {
    // Teachable Moment: Always use encodeURIComponent for search queries 
    // to handle spaces or special characters safely.
    const url = `https://us-central1-summaristt.cloudfunctions.net/getBooks?search=${encodeURIComponent(search)}`;
    
    console.log("Middleman fetching from:", url); // This shows in your TERMINAL

    const response = await axios.get(url);
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    // This will help us see the REAL error in the terminal
    console.error("Middleman Error:", error.response?.data || error.message);
    
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
