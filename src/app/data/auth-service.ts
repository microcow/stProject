
interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const baseUrl = "http://localhost:8888";

export async function registerUserService(userData: RegisterUserProps) { // userData: RegisterUserProps 이렇게 유저 정보 받으면 값이 자동으로 매칭되는지?
  const url = new URL("/api/Signup", baseUrl);

  try {
    const response = await fetch(url, { 
        // 이 과정에서 백엔드에 정보를 요청한 후 데이터를 받아옴(fetch 함수)
        // return되는 값이 response에 저장됨 (여기선 토큰이 return)
    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

console.log(response); // 토큰을 제대로 받아오는지?

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}