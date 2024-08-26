"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';

import { CreateBoardAction } from '@/app/lib/dashboardactions';
import { useFormState } from "react-dom";
import { BoardMessage } from "../custom/BoardMessage";

const INITIAL_STATE = {
    data: null,
  };
  
export default function CreateBoard() {
    const [formState, formAction] = useFormState(CreateBoardAction,INITIAL_STATE);

    return (
        <div className="flex justify-center items-center min-h-screen"> {/*중앙에 배치되도록 설정*/}
           <form action={formAction}>
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
               등록
              </button>
              <BoardMessage
              message={{
                message: formState?.message, 
                name: "BoardCreateMessage",
                status: formState?.status,           
              }}>
              </BoardMessage>
          </form>
    </div>
        
    );
  }