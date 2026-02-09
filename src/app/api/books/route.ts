import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  if (!search) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://us-central1-summaristt.cloudfunctions.net/getBooks?search=${encodeURIComponent(search)}`;
    
    console.log("Middleman fetching from:", url); 
    const response = await axios.get(url);
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Middleman Error:", error.response?.data || error.message);
    
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
