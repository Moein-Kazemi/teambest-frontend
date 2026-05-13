import { ArrowRight } from "lucide-react";
import Link from "next/link";

function BackButtonServer({ path }: { path: string }) {
  return (
    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-500/20 hover:bg-gray-700/20  transition-colors ease-in-out duration-150">
      <Link href={path}>
        <ArrowRight />
      </Link>
    </div>
  );
}

export default BackButtonServer;
