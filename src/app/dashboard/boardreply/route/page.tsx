import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { b_id, title } = await req.json();

  // 필요한 작업 수행
  console.log('Board ID:', b_id);
  console.log('Title:', title);

  return NextResponse.json({ message: 'Reply received', b_id, title });
}

export async function GET() {
  return new NextResponse('Method not allowed', { status: 405 });
}