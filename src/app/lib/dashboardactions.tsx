"use server";

import { loginUserService, registerUserService } from "../data/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CreateBoardService } from "../data/board-service";

type BoardProps = {
  title: string;
  contents: string;
} | FormData;

export async function CreateBoardAction(prevState: any, formData: FormData) {
  
   // 전달받은 FormData를 BoardProps로 변환
   const boardData: BoardProps = {
    title: formData.get('title') as string,
    contents: formData.get('contents') as string,
};

   const responseData = await CreateBoardService(boardData);
   console.log(responseData)
 
   if (!responseData) {
     console.log('here error', '서버 응답 없음')
     return {
       ...prevState,
       message: "Ops! Something went wrong. Please try again.",
     };
   }
 
   if (responseData.message) {
     console.log('here error2', '서버 응답은 있지만 error발생')
     return {
       ...prevState,
       message: responseData.message, // responseData.message는 json형식임
     };
   }
  redirect("/dashboard");

}
