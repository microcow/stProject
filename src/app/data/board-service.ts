import { cookies } from "next/headers";

interface BoardProps {
    title: string;
    contents: string;
  }
  
  const baseUrl = "http://localhost:8888";
  
  export async function CreateBoardService(Board: BoardProps) {
    const url = new URL("/api/CreateBoard", baseUrl);
    const jwtToken = cookies().get('jwt'); // 쿠키 가져오기

    console.log(Board)
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
        if (contentType && contentType.includes("application/json")) { 
          return await response.json();
        } else {
          return response;
       }

      } catch (error) {
      console.error("Registration Service Error:", error);
      return null; 
    }
  }