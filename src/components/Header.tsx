import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-[#015873] text-white font-bold">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Button variant="link">
          <Link href={"/home"}>プログラムのたいとる</Link>
        </Button>
      </div>
    </header>
  );
}
