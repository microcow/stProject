import { cookies } from "next/headers";

  const baseUrl = "http://localhost:8888";
  
  export async function CreateCommentService(Comment: any) {
    const url = new URL("/api/CreateReply", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기

     // FormData 객체 생성
     const formData = new FormData();

     // 텍스트 데이터 추가
     formData.append('b_id', Comment.b_id);
     formData.append('content', Comment.content);

     console.log(formData, "보내지는 formData")

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json", // 헤더를 설정하지 않음, FormData는 자동으로 올바른 Content-Type을 설정함
          "Authorization": `Bearer ${jwtToken?.value}`, // 쿠키 전달
        },
        body: formData, // formData 형식으로 전송
        cache: "no-cache",
      });

        const contentType = response.headers.get("Content-Type"); 

        if (contentType && contentType.includes("text/plain;charset=UTF-8")) {
          const message = await response.text(); 
          return message;
        } 
        else if((contentType && contentType.includes("application/json"))){
          return await response.json(); // json 형태로 return되면 json으로 return (★ 오류발생 시 서버에서 json형태로 보내줌)
        }

        else {
          return response;
       }
       
      } catch (error) {
      console.error("Registration Service Error:", error);
      return null; 
    }
  }