import { cookies } from "next/headers";

interface BoardProps {
    title: string;
    contents: string;
  }
  
  const baseUrl = "http://localhost:8888";
  
  export async function CreateBoardService(Board: BoardProps, images: File[]) {
    const url = new URL("/api/CreateBoard", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기

     // FormData 객체 생성(이미지와 다른 폼 데이터를 함께 전송하려면 FormData 객체를 사용해야 합니다.)
     const formData = new FormData();

     // 텍스트 데이터 추가
     formData.append('title', Board.title);
     formData.append('contents', Board.contents);
 
     // 이미지 파일 추가
     if (images.some((image: File) => image.size > 0)) { 
      // some : 배열의 각 요소에 대해 제공된 콜백 함수를 실행. 콜백 함수가 true를 반환하는 요소가 하나라도 있으면 some 메서드는 true를 반환합니다. 그렇지 않으면 false를 반환합니다.
      // images의 요소들을 image에 대입한 다음 image의 요소 중 .size가 0보다 클 때만(첨부 이미지가 있을때만) 아래 코드 실행
      images.forEach((image, index) => {
         formData.append(`images`, image);
      });
    }

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

        if (contentType && contentType.includes("text/plain;charset=UTF-8")) { // ★ 서버에서 text를 보내고 있으니 Content-Type이 text/plain;charset=UTF-8임
          const message = await response.text(); 
           // ★ 호출하는 서버의 메서드에서 문자열을 return하고 있으니 .text()로 메시지 가져옴
           // ★ awiat을 사용하지 않으면 Promise객체(비동기)가 그대로 반환되기에 데이터가 준비되지 않으므로 원하는 값이 안불러와짐
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

  
  export async function BoardListService() {
    const url = new URL("/api/BoardList", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken?.value}`, // 쿠키 전달
        },
        body: JSON.stringify({}), //{} : 전달할 값 없음
        cache: "no-cache",
      });

        const contentType = response.headers.get("Content-Type"); 

        if((contentType && contentType.includes("application/json"))){
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

  export async function BoardDetailService(b_id : any) {
    const url = new URL("/api/BoardDetail", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기
    const bid = b_id.b_id // ★ b_id값은 객체로 전달되기에 값을 추출해주어야함!

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain", // 문자열을 전송하니 Content-Type 변경
          "Authorization": `Bearer ${jwtToken?.value}`, // 쿠키 전달
        },
        body: bid, // JSON.stringify(b_id) : { b_id = ?? } 이런 json 형태 대신 단순 문자열 전달
        cache: "no-cache",
      });

        const contentType = response.headers.get("Content-Type"); 

        if((contentType && contentType.includes("application/json"))){
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

  export async function BoardDeleteService(b_id : any) {
    const url = new URL("/api/BoardDelete", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기
    const bid = b_id.b_id
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Authorization": `Bearer ${jwtToken?.value}`, // 쿠키 전달
        },
        body: bid,
        cache: "no-cache",
      });

        const contentType = response.headers.get("Content-Type"); 

        if((contentType && contentType.includes("application/json"))){
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

  export async function ChangeBoardService(Board: any) {
    const url = new URL("/api/ChangeBoard", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken?.value}`, // 쿠키 전달
        },
        body: JSON.stringify(Board), // Board를 JSON 문자열로 변환하여 서버로 전송
        cache: "no-cache",
      });

        const contentType = response.headers.get("Content-Type"); 

        if (contentType && contentType.includes("text/plain;charset=UTF-8")) {
          const message = await response.text(); 
          return message;
        } 
        else if((contentType && contentType.includes("application/json"))){
          return await response.json();
        }

        else {
          return response;
       }
       
      } catch (error) {
      console.error("Registration Service Error:", error);
      return null; 
    }
  }

  export async function ReplyBoardService(Board: any) {
    const url = new URL("/api/ReplyBoard", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken?.value}`, // 쿠키 전달
        },
        body: JSON.stringify(Board),
        cache: "no-cache",
      });

        const contentType = response.headers.get("Content-Type"); 

        if (contentType && contentType.includes("text/plain;charset=UTF-8")) {
          const message = await response.text(); 
          return message;
        } 
        else if((contentType && contentType.includes("application/json"))){
          return await response.json();
        }

        else {
          return response;
       }
       
      } catch (error) {
      console.error("Registration Service Error:", error);
      return null; 
    }
  }