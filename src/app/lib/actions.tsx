"use server";
/* "user server" 로 지정되어있기에(next.js의 특징) 브라우저에서 spring으로 보내는 데이터가 전송되지만(서버에서 전송)
 client에서 보낼 경우 spring(백엔트)에서 외부 데이터로 치부하여 데이터 받기를 거절함. 그래서 cofs? 설정을 해주어야함
 (lconputer학원 restdemo의 SecurityConfig페이지의 corsConfigurationSource 참고)
*/

import { z } from "zod";
import { loginUserService, registerUserService } from "../data/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true, // httpOnly: true는 서버측에서만 value값을 불러올 수 있음
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }).optional().default('not@email.com'),
});

export async function registerUserAction(prevState: any, formData: FormData) {
 /* 상태 업데이트 시, React는 불변성을 유지하기 위해 이전 상태 객체를 복사하고 필요한 부분만 업데이트한다
    즉, 최초 registerUserAction 호출 시 prevState 객체의 data라는 변수의 값이 "ok"라는 문자열로 설정되었다고 가정하면,
    두번째 registerUserAction 호출 시 prevState 객체의 data값을 따로 건들지 않더라도 이전 상태를 유지하고 있기에 data값이 "ok" 문자열로 되어있음
    이렇게 유지되는 이유는 React의 훅을 사용하기 때문이다. 훅은 상태를 관리하고 업데이트하는 메커니즘을 제공하여 상태의 일관성과 불변성을 유지할 수 있도록 도와준다
    (SignupForm.tsx에서 registerUserAction을 useFormState훅을 이용해 호출하고있음) 
 */

  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });
  console.log(validatedFields);

  if (!validatedFields.success) {
    console.log('success');
    return {
     ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors, 
      /* zodErrors 객체는 각 필드에 대한 오류 메시지를 포함하는 하위 객체를 가지게 됩니다. 
      zodErrors.username, zodErrors.password 이런식으로
      */
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);
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

}





const schema = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
});


export async function loginUserAction(prevState: any, formData: FormData) {
  console.log("Hello From loginUserAction");

  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log('success');
    return {
     ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors, 
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);
  //console.log(responseData)
  if (!responseData) {
    console.log('error!!')
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    console.log('responseData.error', responseData.error)
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to login.",
    };
  }
  cookies().set("jwt", responseData.jwt, config); //쿠키 생성(서버에서 사용자 인증이 완료된 경우에만 실행될 수 있도록)
  redirect("/dashboard");

  const jwtToken = cookies().get('jwt');  // 유저 클라이언트에 저장된(생성된) 쿠키 정보 가져오는법
}