"use client";

import { BoardDeleteAction, BoardDetailAction,} from '@/app/lib/dashboardactions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CompleteMessage } from '../custom/CompleteMessage';


export default function BoardDeleteForm(b_id : any) {
  const [result, setResult] = useState<any | undefined>(undefined);; // any | null: 이 부분은 상태 변수(result)의 타입을 지정

    useEffect(() => { 
      async function fetchData() {
        const msg = await BoardDeleteAction(b_id);
        setResult(msg);        
      }
      fetchData();
    }, [b_id]);


    if (!result) {
      return <div>Loading...</div>;
  }

  return <div className="fixed top-0 left-0 w-full bg-gray-800 text-white text-center py-4 z-50">
      <div className="max-w-md mx-auto">
        <p className="mb-4">{result.responseData.result}</p>
        <Link href = {"/dashboard/boardlist"}>
          <Button
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            확인
          </Button>
         </Link>
      </div>
    </div>
}