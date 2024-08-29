'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BoardMessagesProps {
  message: string | null;
  name: string;
  status: string | null;
  redirect: any;
}

let redirect = ""; // const로 변수 선언 시 재할당이 불가능

export function BoardMessage({ message }: { readonly message: BoardMessagesProps }) {

 if (!message?.message) return null;

 else
    if(message.message == "Complete!"){
        redirect = message.redirect // "Complete!"일 경우 호출하는 쪽에서 redirect 주소 결정
    }
    else redirect = "/signin"

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white text-center py-4 z-50">
      <div className="max-w-md mx-auto">
        <p className="mb-4">{message.message}</p>
        <Link href = {redirect}>
          <Button
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            확인
          </Button>
         </Link>
      </div>
    </div>
  );
}