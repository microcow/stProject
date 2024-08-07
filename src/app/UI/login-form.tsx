'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { badgeVariants } from "@/components/ui/badge"

const initalState = {
  data: null,
};

export function LoginForm() {

  return (
    
    <form className="space-y-3"> {/* formaction 추가해야함 */}
    <Link className={badgeVariants({ variant: "outline" })} href={"/"}>back</Link>

      <Card className="mx-auto max-w-2xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl mb-4">Login</CardTitle>
           <Input 
            className="mb-4"  
            id="username"
            type="text"
            name="username"
            placeholder="Enter account"
            required /> {/* required 속성은 폼 입력 요소가 반드시 입력되어야 함을 명시 */} 
           <Input 
            className="mb-4" 
            id="userpassword"
            type="password"
            name="userpassword"
            placeholder="Password"
            required />
            
           <Button className="mb-4" type="submit">Sign in</Button>

        </CardHeader>
        <CardContent>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "} 
            {/* 어퍼스트로피(')를 &apos;로 사용하는 이유는 HTML에서 어퍼스트로피를 문자 그대로 사용하면 문법적으로 문제가 발생할 수 있기때문
                {" "}는 공백을 넣기 위함 */}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
