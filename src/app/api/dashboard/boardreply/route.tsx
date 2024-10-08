import { NextResponse } from 'next/server';

/// 해당 API 라우트 작동원리 이해하기

export async function POST(request: Request) {
    const contentType = request.headers.get('content-type') || ''; // 데이터 제출된 형식 구분(POST방식)

    let body: any;

    if (contentType.includes('application/json')) {
        body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.text(); // 폼을 통해 제출된 데이터는 application/x-www-form-urlencoded 형식으로 전송되므로 request.text로 데이터를 읽음
        body = Object.fromEntries(new URLSearchParams(formData)); // new URLSearchParams(formData)를 사용해 텍스트 데이터를 key-value 형태의 객체로 변환
    }

    console.log(body, "바디");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const queryParams = new URLSearchParams(body).toString();
    return NextResponse.redirect(`${baseUrl}/dashboard/boardreply?${queryParams}`);

    // POST 방식으로 데이터를 전달받은 API라우트가 내용을 쿼리로 담아서 redirect하고 있음 
    /// (근데 이러면 해당 API라우트에 POST방식으로 넘기지 말고 애초에 redirect되는 주소로 get방식으로 보내면 되지않나..?)
}