"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/app/lib/actions";
import { SubmitButton } from "@/app/components/custom/SubmitButton";


import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/app/components/custom/ZodErrors";
import { SignUpErrors } from "@/app/components/custom/SignUpErrors";

const INITIAL_STATE = {
  data: null, //초기값 설정
};

export function SignupForm() {
  const [formState, formAction] = useFormState(registerUserAction,INITIAL_STATE);
  // formState에는 INITIAL_STATE값이 담기고 formAction에는 registerUserAction 함수가 담긴다
  // return받아서 값을 받아오면 해당 페이지는 리랜더링됨
  // 즉, 최초 SignupForm 실행 시 formState값은 null로 되어있고, <form action={formAction}>이 실행될 경우 return받는 값이 formState이 받음
  /// 호출 후 return받는 formState값이 INITIAL_STATE 값에도 적용이 되는거 같음..(?)
  console.log('formstate', formState);
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
           <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
            <SignUpErrors
              error={{
                message: formState?.message, // 서버 오류 메시지를 여기에 전달
                name: "SignUpError", // 예시로 오류 이름 지정
                status: formState?.status, // 상태 코드 등을 전달할 수 있습니다             
              }}
            />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="signin">
            Sing In
          </Link>
        </div>
      </form>
    </div>
  );
}