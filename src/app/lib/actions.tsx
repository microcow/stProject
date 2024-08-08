"use server";

import { z } from "zod";

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email asdaddress",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("Hello From Register User Action");
  console.log(prevState);
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

  return {
    ...prevState,
    data: "ok",
  };
}