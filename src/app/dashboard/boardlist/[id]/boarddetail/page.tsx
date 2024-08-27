'use client'
import BoardDetailForm from '@/app/components/forms/BoardDetailForm';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function boarddetail(id : any) { // 동적 라우트로 id값을 직접 받아오는법 (url에서 추출하는게 아님) ({ params: { id: '28' }, searchParams: {} } 이처럼 json형태로 받기에 id.params.id 이런식으로 값을 추출해야함)
  // const router = useRouter(); // get방식으로 보낸 값 추출방법 1(리액트)
  // const { id } = router.query; // 현재 페이지 query 객체에서 id 값을 추출 (react에서 router를 써서 추출하는법)
  // const b_id = String(id); // 문자열로 변경

  // const searchParams = useSearchParams(); // get방식으로 보낸 값 추출방법 2(next)
  // const id = searchParams.get('id'); // 현재 페이지 query 객체에서 id 값을 추출 (next 네비게이션의 useSearchParams를 써서 추출하는법)
  
  // const params = useParams(); // next js 동적 라우트 값 추출방법 1. : [] 안의 값을 url에서 추출
  // console.log(params, "params")
  // const b_id = params.id ? String(params.id) : null; // 현재 페이지 next js 동적 라우트에서 [id] 값을 추출 (next 네비게이션의 useParams 써서 추출하는법)
  
  const b_id = String(id.params.id) // next js 동적 라우트 값 추출방법 2. : [] 안의 값을 해당 페이지의 파라미터로 전달받아 추출
  
  console.log(id, "b_id")
  return  <BoardDetailForm b_id={b_id}/>

  

}