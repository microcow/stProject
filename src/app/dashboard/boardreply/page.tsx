'use client'

import React, { Suspense } from 'react';
import BoardReplyForm from "@/app/components/forms/BoardReplyForm"
import { useSearchParams } from 'next/navigation';

// next의 동적 라우팅([]사용하는) 시스템과 쿼리 시스템을 함께 사용할 수 없기에 boardreply 페이지를 따로 dashboard폴더 밑으로 뺐음
// (함께 사용할 수 없는진 추가 확인 필요) 아마 동적 라우팅에서는 useSearchParams 훅을 못쓰는걸로 암

function BoardreplyContent() {
    const searchParams = useSearchParams(); //useSearchParams으로 현재 URL의 쿼리 가져오기
    const b_id = searchParams.get('b_id');
    const title = searchParams.get('title'); // title값은 쓰이지 않는데 해당 페이지를 호출할 때 Post로 값 불러오기 연습
  
    return <BoardReplyForm b_id={b_id} />;
  }
  
  export default function Boardreply() {
    return (
      <Suspense fallback={<div>Loading...</div>}> 
        <BoardreplyContent />
      </Suspense>
      /* useSearchParams는 클라이언트 전용 훅이기 때문에 프리렌더링 시 문제가 발생하고 있습니다.
       이를 해결하기 위해 Suspense로 감싸서 클라이언트에서만 실행되도록 해야함 */
    );
  }