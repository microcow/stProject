"use client";

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { ChangeBoardAction } from '@/app/lib/dashboardactions';
import { BoardMessage } from '../custom/BoardMessage';


const INITIAL_STATE = {
    data: null,
  };
  
export default function ReplyBoard(b_id: any, title: any) {
    const [formState, formAction] = useFormState(ChangeBoardAction, INITIAL_STATE,);

    return (
        <div className="flex justify-center items-center min-h-screen"> {/*중앙에 배치되도록 설정*/}
           <form action={formAction}>
             <Input 
                    type="hidden" // b_id값은 안보이게 전달
                    id="b_id"
                    name="b_id"
                    value={b_id.b_id}
                />
              <Input 
                placeholder="제목을 입력하세요." 
                id="title"
                name="title"
              />
              <Textarea 
                placeholder="내용을 입력하세요." 
                id="contents"
                name="contents"
              />
              <button 
               type="submit" 
               className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
               답글달기
              </button>
              <BoardMessage
              message={{
                message: formState?.message, 
                name: "BoardCreateMessage",
                status: formState?.status,
                redirect: `/dashboard/boardlist/${b_id.b_id}/boarddetail`
            }}>
              </BoardMessage>
          </form>
    </div>
        
    );
  }