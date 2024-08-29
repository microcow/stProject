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
  const [board, setBoard] = useState<any | null>(null); 
  // Board | null: 이 부분은 상태 변수(result)의 타입을 지정 (any로 해도됨)
  /* ★ 타입을 Board와 any로 했을 때 차이
  Board로 하게되면 위에서 타입을 선언한 Board 인터페이스에 있는 인스턴스 변수만 board.title 이런 식으로 사용 가능하고
  타입을 선언하지 않은 없는 인스턴스 변수를 board.message 이런식으로 사용하면 타입 검사에서 오류가 발생함
  근데 타입을 any로 지정하면 TypeScript의 타입 검사가 사실상 비활성화되므로 board.message 이런식으로 적어도 타입 검사에서 오류가 발생안함
  */
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
          <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>{board.Board.title}</h2>
          <p><strong>작성자:</strong> {board.Board.name}</p>
          <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
              {board.Board.contents}
          </div>
          <div>
            <Link href={'/dashboard/boardlist'}>
              <Button>돌아가기</Button>
            </Link>

            {/* //답글달기를 get 방식 말고 아래의 post방식으로 정보를 보내기
            <Link href={`/dashboard/boardreply?b_id=${b_id.b_id}`}>
              <Button>답글달기</Button>
            </Link>
            */}

            <form action="/dashboard/boardreply" method="POST"> {/*답글달기 post 방식 */}
              <input type="hidden" name="b_id" value={b_id.b_id} />
              <input type="hidden" name="title" value={board.Board.title} />
              <Button type="submit">답글달기</Button>
            </form>

            {board.roleUser && ( // board.roleUser가 true(관리자이거나 글 작성자인 경우)일 때만 삭제하기 버튼이 노출
            <Link href={`/dashboard/boardlist/${b_id.b_id}/boarddetail/boarddelete`}>
              <Button>삭제하기</Button>
            </Link>
            )}

            {board.roleUser && (
            <Link href={`/dashboard/boardlist/${b_id.b_id}/boarddetail/boardchange`}>
              <Button>수정하기</Button>
            </Link>
            )}

          </div>
      </div>
      
  );
}