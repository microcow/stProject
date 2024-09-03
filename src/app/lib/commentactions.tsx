"use server";

import { loginUserService, registerUserService } from "../data/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BoardDeleteService, BoardDetailService, BoardListService, ChangeBoardService, CreateBoardService, ReplyBoardService } from "../data/board-service";
import { CreateCommentService } from "../data/comment-service";

let errormessage = '';

// 글 작성
export async function CreateCommentAction(prevState: any, formData: FormData) {
  
   const replyData: any = {
    content: formData.get('content') as string,
    b_id: formData.get('b_id') as string, // ★ b_id를 stirng으로 설정했으니 서버에서도 String b_id 이렇게 String타입으로 받아야함
   };


  const responseData = await CreateCommentService(replyData); 
 
   if (!responseData) {
     console.log('here error', '서버 응답 없음')
     return {
       ...prevState,
       message: "Ops! Something went wrong. Please try again.",
     };
   }

   if (responseData.error) {  
   console.log('오류', responseData)
   
        if(responseData.message.trim() == 'JWT strings must contain exactly 2 period characters. Found: 0') {
          errormessage = "Your session has expired. Please log in again."
        } 
        else
          errormessage = "An unknown error occurred. Please try again."

     return {
       message: errormessage,
     };
  }

 return {
    message: responseData,
 };

}