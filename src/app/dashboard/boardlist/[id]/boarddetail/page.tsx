'use client'
import BoardDetailForm from '@/app/components/forms/BoardDetailForm';
import { useParams, useSearchParams } from 'next/navigation';

export default function BoardDetailRoute() {
  // const router = useRouter();
  // const { id } = router.query; // 현재 페이지 query 객체에서 id 값을 추출 (react에서 router를 써서 추출하는법)
  // const b_id = String(id); // 문자열로 변경

  // const searchParams = useSearchParams();
  // const id = searchParams.get('id'); // 현재 페이지 query 객체에서 id 값을 추출 (next 네비게이션의 useSearchParams를 써서 추출하는법)
  // const b_id = String(id); // 문자열로 변경
  
  const params = useParams();
  const b_id = params.id ? String(params.id) : null; // 현재 페이지 동적 라우트에서 [id] 값을 추출 (next 네비게이션의 useParams 써서 추출하는법)

  return <BoardDetailForm b_id={b_id}/>
  
}