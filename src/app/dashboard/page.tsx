import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardRoute() {
    return (
      <div className="flex flex-col items-start justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Link href="/dashboard/createboard">
         <Button className="mb-4">Create Board</Button>
        </Link>

        <Link href="/dashboard/boardlist">
         <Button>Board List</Button>
        </Link>
      </div>
    );
  }