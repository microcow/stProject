interface SignUpErrorsprops {
    message: string | null;
    name: string;
    status: string | null;
  }
  
  export function SignUpErrors( { error }: { readonly error: SignUpErrorsprops }) { // readonly 키워드는 TypeScript에서 객체의 특정 프로퍼티가 변경되지 않도록 하는 기능을 제공합니다. 즉, readonly로 선언된 프로퍼티는 객체가 생성된 이후에는 수정할 수 없습니다.
    if (!error?.message) return null; // error 객체가 존재하지 않거나, error 객체는 존재하지만 그 안에 message값이 존재하지 않을 때 null을 return
    return <div className="text-pink-500 text-md italic py-2">{error.message}</div>;
  }