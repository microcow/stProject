"use client";

import { BoardDetailAction,} from '@/app/lib/dashboardactions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
  
interface Board {
  title : String,
  name : String,
  contents : String,
  b_id : Number,
  p_board : Number,
  depth : Number,
  grpord : Number,
}


export default function BoardDetailForm(b_id : any) {
  const [board, setBoard] = useState<Board | null>(null);

    useEffect(() => { 
      async function fetchData() {
        const result = await BoardDetailAction(b_id);
        setBoard(result);        
      }
      fetchData();
    }, [b_id]);

    console.log(board, "board") 
    ///? ㄴ 이렇게 값을 찍어도 빈값(null)로 나오지만 실제론 값이 있어서 아래 return 코드에 잘 출력됨 / 그리고 페이지 최초 로딩때는 출력안되고 새로고침해야 콘솔로그가 출력됨 왜?? (비동기 관련때문인듯)


    if (!board) {
      return <div>Loading...</div>;
  }

  return (
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>{board.title}</h2>
          <p><strong>작성자:</strong> {board.name}</p>
          <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
              {board.contents}
          </div>
           <div>
            <Link href={'/dashboard/boardlist'}>
              <Button>돌아가기</Button>
            </Link>
          </div>
      </div>
      
  );
}