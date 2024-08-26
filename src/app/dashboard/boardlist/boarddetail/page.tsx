import BoardDetail from '@/app/components/forms/BoardDetailForm';
import { useRouter } from 'next/router';

export default function BoardDetailRoute(id2 : any) {
  const router = useRouter();
  const { id } = router.query; // 현재 페이지 query 객체에서 id 값을 추출 (이렇게 값을 받고 랜더링하니 오류가 발생하는거 같음.)
  const b_id = String(id); // 문자열로 변경 (서버에서 String타입으로 받기 위해)

  <BoardDetail b_id={b_id}/>
  
}