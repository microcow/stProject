'use client'

import BoardReplyForm from "@/app/components/forms/BoardReplyForm"
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// next의 동적 라우팅([]사용하는) 시스템과 쿼리 시스템을 함께 사용할 수 없기에 boardreply 페이지를 따로 dashboard폴더 밑으로 뺐음
// (함께 사용할 수 없는진 추가 확인 필요) 아마 동적 라우팅에서는 useSearchParams 훅을 못쓰는걸로 암

export default function boardreply(body: any) { 
    /* // 해당 방법은 get방식으로 정보가 왔을때 쿼리 추출
    const searchParams = useSearchParams();
    const b_id = searchParams.get('b_id');
    console.log(b_id, "b_id")
    */
    
    //return <BoardReplyForm b_id={b_id}/>  
    /////////////////////////////////////////////////////////////////////////// 위는 get방식 아래는 post 방식
  

    const searchParams = useSearchParams();
    
    const b_id = searchParams.get('b_id')
    const title = searchParams.get('title')
    
    console.log(b_id, title, "zz");

    return <p>완료!{b_id}</p>;
}