"use client";

import { BoardDeleteAction, BoardDetailAction,} from '@/app/lib/dashboardactions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BoardMessage } from '../custom/BoardMessage';


export default function BoardDeleteForm(b_id : any) {
  const [result, setResult] = useState<any | undefined>(undefined);; // any | null: 이 부분은 상태 변수(result)의 타입을 지정

     console.log("두번째")
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

  return <BoardMessage
  message={{
    message: result?.message, 
    name: "BoardDeleteMessage",
    status: result?.status,       
  }}>
  </BoardMessage>
}