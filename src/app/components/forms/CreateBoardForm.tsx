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
                /* ★ 폼이 제출될 때 갱신된 상태를 기반으로 UI가 리렌더링되고, return값인 fomState값이 변경되고 FormState?.message의 값이 생겨나니까, 기존에 null을 return하던 BoardMessage 컴포넌트의 return값이 생겨나서 ui가 보여짐
                      즉, 최초로 해당 페이지가 렌더링될때도 BoardMessage 컴포넌트는 값을 return 하지만 그 값이 null일 뿐임. 폼이 제출되면 페이지가 리렌더링되니까 값이 생기므로 return값이 null이 아니기에 보여지는것 */
                message: formState?.message, 
                name: "BoardCreateMessage",
                status: formState?.status,
                redirect: "/dashboard"         
              }}>
              </BoardMessage>
          </form>
    </div>
        
    );
  }