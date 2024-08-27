"use server";

import { loginUserService, registerUserService } from "../data/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BoardDetailService, BoardListService, CreateBoardService } from "../data/board-service";

type BoardProps = {
  title: string;
  contents: string;
} | FormData;

let errormessage = '';

export async function CreateBoardAction(prevState: any, formData: FormData) {
  
   // 전달받은 FormData를 BoardProps로 변환
   const boardData: BoardProps = {
    title: formData.get('title') as string,
    contents: formData.get('contents') as string,
   };

  const responseData = await CreateBoardService(boardData);
 
   if (!responseData) {
     console.log('here error', '서버 응답 없음')
     return {
       ...prevState,
       message: "Ops! Something went wrong. Please try again.",
     };
   }

   if (responseData.error) {  
    /*글 작성 성공 시 서버에서 '문자열만을' return해주지만 error가 발생한 경우, 에러를 josn형태로 return하고 있고,
     return받은 객체에는 .error와 .message와 .status 등으로 오류 내용을 클라이언트로 전달해줌 
    */
   console.log('오류', responseData)
   
        if(responseData.message.trim() == 'JWT strings must contain exactly 2 period characters. Found: 0') { // trim() : 공백을 제거하고 비교
          errormessage = "Your session has expired. Please log in again."
        } 
        // 서버에서 return받는 오류 메시지 내용을 if문으로 검증해서 errormessage 내용을 상세하고 유연하게 다시 return
        // 위 경우, 글작성 시 세션이 만료되었을 때 서버에서 json형태의 에러객체의 message 변수에 JWR stirng... 이런 내용을 보내줌
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

export async function BoardListAction() {
  const responseData = await BoardListService();
  return responseData

}

export async function BoardDetailAction(b_id : any) {
  const responseData = await BoardDetailService(b_id);
  return responseData
}
