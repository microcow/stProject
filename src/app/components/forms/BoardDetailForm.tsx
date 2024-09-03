"use client";

import { CreateCommentAction } from '@/app/lib/commentactions';
import { BoardDetailAction,} from '@/app/lib/dashboardactions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
  
interface Board {
  title : String,
  name : String,
  contents : String,
  b_id : Number,
  p_board : Number,
  depth : Number,
  grpord : Number,
}

interface Comment {
  r_id: number,
  b_id: number,
  contents: string,
  name: string,
  p_board : Number,
  depth : Number,
  grpord : Number,
}

const INITIAL_STATE = {
  data: null,
};

export default function BoardDetailForm(b_id : any,) {
  const [formState, formAction] = useFormState(CreateCommentAction,INITIAL_STATE); // 입력받은 댓글 formaction
  const [commentContent, setCommentContent] = useState(''); // 댓글 입력 필드 상태 관리
  
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    await formAction(new FormData(event.currentTarget)); // 폼 데이터 전송
    setCommentContent(''); // 댓글 입력 필드 초기화
  };

  
  const [board, setBoard] = useState<any | null>(null); 
    useEffect(() => { 
      async function fetchData() {
        const result = await BoardDetailAction(b_id);
        setBoard(result); // BoardDetailAction실행 후 return받은 값을 board객체에 세팅     
      }
      fetchData();
    }, [formState]); 
    /* ★ formState의 값(댓글작성)이 변경되면 BoardDetailAction이 재실행됨(AJAX)
          즉, formAction을 실행하고 formState값이 변경되면(=응답을 받으면) 새로고침하지 않고 댓글 목록이 갱신됨(리랜더링)
          > 이렇게 하는 이유는 댓글 목록과 댓글 작성(CreateBoard)은 다르게 동작하기 때문.
          댓글 목록을 불러오기 위해선 게시글 상세(BoardDetail)를 불러와야하고,
          게시글 상세는 useEffect를 사용하고 있지만 댓글 작성은 useFormState를 작성하고 있기 때문에,
          댓글 작성 후 댓글 목록을 즉시 최신화 하기 위해선 useEffect가 useFormState의 결과값(formState)이 갱신될때마다 실행되도록 해야함
          
    */

    console.log(board, "board") 
    ///? ㄴ 이렇게 값을 찍어도 빈값(null)로 나오지만 실제론 값이 있어서 아래 return 코드에 잘 출력됨 / 그리고 페이지 최초 로딩때는 출력안되고 새로고침해야 콘솔로그가 출력됨 왜?? (비동기 관련때문인듯)

  

    if (!board) {
      return <div>Loading...</div>;
  }


  return (
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>{board.Board.title}</h2>
          <p>작성자: {board.Board.name}</p>
          <span>작성일: {new Date(board.Board.b_datetime).toLocaleString()}</span> {/* 작성날짜 출력 */}
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

            <form action="/api/dashboard/boardreply" method="POST"> {/*답글달기 post 방식 */}
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
       {/* Reply Form and Comments Section*/}
       <div style={{ marginTop: '50px',}}>
        <div style={{borderBottom: '4px solid #ccc' }}>
          <strong>댓글 목록</strong>
        </div>
        {board.Reply.length > 0 ? ( // board.Reply가 배열이니 .length로 길이를 비교해야함
          board.Reply.map((comment: any) => (
            <div key={comment.r_id} style={{ padding: '5px', borderBottom: '1px solid #ddd', }}>
              <p>작성자: {comment.r_writer} </p>
              <p><strong>{comment.r_content}</strong></p>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
          <Input 
                placeholder="댓글을 입력하세요." 
                id="content"
                name="content"
                value={commentContent} 
                // value 속성을 설정하지 않으면, FormData에 content 필드의 값은 사용자가 입력한 그대로의 값이 됩니다.
                // ※ 참고 : "value" 속성은 데이터가 전달되고, name으로 호출할때 불러와지는 값이기도 하지만, 입력 박스의 초기 출력값이기도 함
                onChange={handleCommentChange}
              />
         <Input 
                type="hidden" // b_id값은 안보이게 전달
                id="b_id"
                name="b_id"
                value={b_id.b_id}
                />
        <Button type="submit" style={{ marginTop: '10px' }}>댓글 달기</Button>
      </form>
      {formState?.message}
    </div>
  );
}