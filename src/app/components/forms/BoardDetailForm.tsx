"use client";

import { BoardDetailAction,} from '@/app/lib/dashboardactions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
  
interface board {
  title : String,
  name : String
}


export default function BoardDetailForm(b_id : any) {
    const [board, setBoard] = useState();

    useEffect(() => { 
      async function fetchData() {
        const result = await BoardDetailAction(b_id);
        setBoard(result);        
      }
      fetchData();
    }, []);

    return (
      <div>
        {board? (
          <ul>
            <p>success!</p>
          </ul>
        ) : (
          <p>No boards available</p>
        )}
      </div>
    );
  }