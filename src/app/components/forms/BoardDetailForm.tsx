"use client";


import { BoardDetailAction,} from '@/app/lib/dashboardactions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
  

export default function BoardDetail(b_id : any) {
    const [board, setBoard] = useState([]);

    useEffect(() => { 
      async function fetchData() {
        const result = await BoardDetailAction(b_id);
        setBoard(result);
      }
      fetchData();
    }, []);

    return (
        <div>
          {board.length > 0 ? ( // boardList에 항목이 있을 때만 실행
            <ul>
              {board.map((board: any,) => (          
               <p>board.title</p>
              ))}
            </ul>
          ) : (
            <p>No boards available</p> // boardList가 비어 있을 때
          )}
        </div>
      );
    }