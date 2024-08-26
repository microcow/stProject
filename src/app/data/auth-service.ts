
interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  username: string;
  password: string;
}

const baseUrl = "http://localhost:8888";

export async function registerUserService(userData: RegisterUserProps) { // userData: RegisterUserProps 이렇게 유저 정보 받으면 값이 자동으로 매칭되는지?
  const url = new URL("/api/Signup", baseUrl);
  console.log(userData)
  try {
    const response = await fetch(url, { 
        // 이 과정에서 백엔드에 정보를 요청한 후 데이터를 받아옴(fetch 함수)
        // return되는 값이 response에 저장됨 (여기선 토큰이 return)
    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // server에 전달할 값 userData
      cache: "no-cache",
    });
    
      // 응답이 JSON 형식인지 확인
      const contentType = response.headers.get("Content-Type"); // 서버에서 return받은 값의 헤더의 값 중 Content-Type 속성을 확인(Content-Type은 응답의 콘텐츠가 어떤 형식으로 되어 있는지 나타내는 헤더)
      if (contentType && contentType.includes("application/json")) { // contentType이 존재하고, contentType이 application/json이라면 JSON으로 return (서버에서 토큰을 생성하고 JSON형식으로 return해줌)
        return await response.json();
      } else {
        return response; // JSON이 아니면 response 자체를 반환
     }
    /* fetch 과정에서 오류(email 중복)가 발생하면 오류 message가 json형태이기에 response.json() 형태로 return해야하지만,
     오류가 발생하지 않으면 return받는게 없으므로 json()형태로 return하면 안됨
  */
    } catch (error) {
    console.error("Registration Service Error:", error);
    return null; // 네트워크 오류 또는 기타 오류 발생 시 null 반환
  }
}

export async function loginUserService(userData: LoginUserProps) {
  console.log('userdata', userData)
  try {
  const url = new URL("/api/Signin", baseUrl);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });
    return response.json(); // 토큰을 return받고 있기에 response.json();으로 return
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}