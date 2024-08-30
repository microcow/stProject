'use client'

import BoardReplyForm from "@/app/components/forms/BoardReplyForm"
import { useSearchParams } from 'next/navigation';

// next의 동적 라우팅([]사용하는) 시스템과 쿼리 시스템을 함께 사용할 수 없기에 boardreply 페이지를 따로 dashboard폴더 밑으로 뺐음
// (함께 사용할 수 없는진 추가 확인 필요) 아마 동적 라우팅에서는 useSearchParams 훅을 못쓰는걸로 암

export default function boardreply(body: any) { 
   
    const searchParams = useSearchParams();
    
    const b_id = searchParams.get('b_id')
    const title = searchParams.get('title') // title값은 쓰진않는데 POST방식으로 불러와보기 연습

    return <BoardReplyForm b_id = {b_id}/>
}