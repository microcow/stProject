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
 
   if (!responseData) {
     console.log('here error', '서버 응답 없음')
     return {
       ...prevState,
       message: "Ops! Something went wrong. Please try again.",
     };
   }
 
   if (responseData) {
     return {
       message: responseData,
       /* Next.js는 서버("user server")에서 클라이언트("user client")로 전달되는 데이터에 제한을 두고 있습니다. 서버에서 클라이언트로 객체를 전달할 때,
        단순한 JSON 직렬화가 가능한 데이터 타입(예: 기본형 타입, 배열, 일반 객체 등)만 허용됩니다. 문자열은 허용되지만, Next.js의 특정 방식에서 데이터 구조가 맞지 않을 때 문제가 발생할 수 있습니다. */
     };
   }
  //redirect("/dashboard");

}
