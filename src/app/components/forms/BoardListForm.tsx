"use client";


import { BoardListAction,} from '@/app/lib/dashboardactions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
  
export default function BoardList() {
    const [boardList, setBoardList] = useState([]); // ★ useState : React 훅, boardList는 상태업데이트 받을객체, setBoardList는 첫번째 객체(boardList)의 상태 업데이트를 도와주는 함수
    /*
    ★ useState는 React 훅 중 하나로, 컴포넌트에서 상태를 추가하는 데 사용됩니다. (setBoardList 함수는 단지 boardList 상태를 result 값으로 업데이트하는 역할만 합니다.)
    useState 함수는 하나의 인자를 받는데, 이 인자는 상태의 초기값입니다.
    여기서 useState([])는 boardList 상태를 빈 배열 []로 초기화합니다. 즉, 처음 컴포넌트가 렌더링될 때 boardList의 초기값은 빈 배열입니다.
    */

    useEffect(() => { // ★ useEffect: React 훅, 두번째 파라미터값이 변경될때마다 첫번째 파라미터가 실행됨
      async function fetchData() {
        const result = await BoardListAction(); // BoardListAction 실행 및 결과 값 받기
        setBoardList(result);
        // setBoardList(result)를 호출하면, boardList의 값이 result로 변경됩니다.
      }
      fetchData(); // 함수 실행
    }, []);
    // [] : 이 배열이 비어있기 때문에 이 useEffect는 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다. 이후에는 다시 실행되지 않습니다.
    // 이 배열에 포함된 값 중 하나라도 변경되면 useEffect가 다시 실행됩니다.
    return (
        <div>
          {boardList.length > 0 ? ( // boardList에 항목이 있을 때만 실행
            <ul>
              {boardList.map((board: any,) => (          
                <li key={board.b_id} style={{ marginBottom: '10px', listStyleType: 'none' }}> {/* ★ 경로로 이동하면서 query 객체에 있는 값이 URL의 쿼리 문자열로 추가됨. query 값은 useRouter 훅을 통해 접근가능*/}
                  {/*<Link href={{ pathname: '/boarddetail', query: { id: board.b_id } }}>
                      ㄴ 쿼리에 값을 담아 보내는법*/}
                  <Link href={`/dashboard/boardlist/${board.b_id}/boarddetail`}>
                  {/* ㄴ next js의 동적라우팅[] 으로 값을 보내는 법*/}
                    <Button>{board.title}</Button>
                  </Link>
                </li>     
                
              ))}
            </ul>
          ) : (
            <p>No boards available</p> // boardList가 비어 있을 때
          )}
        </div>
      );
    }