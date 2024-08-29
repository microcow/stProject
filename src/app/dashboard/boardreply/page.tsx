'use client'

import BoardReplyForm from "@/app/components/forms/BoardReplyForm"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

// next의 동적 라우팅([]사용하는) 시스템과 쿼리 시스템을 함께 사용할 수 없기에 boardreply 페이지를 따로 dashboard폴더 밑으로 뺐음
// (함께 사용할 수 없는진 추가 확인 필요) 아마 동적 라우팅에서는 useSearchParams 훅을 못쓰는걸로 암

export default function boardreply() { 
    /* // 해당 방법은 get방식으로 정보가 왔을때 쿼리 추출
    const searchParams = useSearchParams();
    const b_id = searchParams.get('b_id');
    console.log(b_id, "b_id")
    */
    
    //return <BoardReplyForm b_id={b_id}/>  
    /////////////////////////////////////////////////////////////////////////// 위는 get방식 아래는 post 방식


    const [data, setData] = useState(null);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/dashboard/boardreply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            b_id: 'some-b-id-value',  // 이 값은 실제 폼에서 가져와야 합니다.
            title: 'some-title-value',  // 이 값도 마찬가지로 실제 폼에서 가져와야 합니다.
          }),
        });
  
        const result = await response.json();
        setData(result); // 서버로부터 받은 데이터를 상태에 저장
      }
  
      fetchData();
    }, []);

    console.log(data, "데이터")

  


}