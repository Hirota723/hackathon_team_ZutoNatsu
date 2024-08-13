import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="left-0 w-full bg-blue flex justify-around items-center py-4 z-10">
      <div className="flex justify-around w-full">
        <Button variant="link">
          <Link href={"/home"}>プログラムのたいとる</Link>
        </Button>
      </div>
    </header>
  );
}
