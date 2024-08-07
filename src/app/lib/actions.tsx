"use server";

export async function registerUserAction(
  prevState: any, // 최초 return값이 없어서 오류?
  formData: FormData,
) {
  console.log("Hello From Register User Action");

  const fields = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log("#############");
  console.log(fields);
  console.log("#############");
  
  return { ...prevState };
}