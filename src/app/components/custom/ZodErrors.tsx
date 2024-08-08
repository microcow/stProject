export function ZodErrors({ error }: { error: string[] }) {
    console.log(error);
    if (!error) return null;

    return error.map((err: string, index: number) => (
      <div key={index} className="text-pink-500 text-xs italic mt-1 py-2">
        {err} 
      </div>
      
    ));
  }