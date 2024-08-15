import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import iconImage from "@/assets/images/aaaaa.png";

export default function Header() {
  return (
    <header className="fixed left-0 w-full bg-blue h-6 z-10">
      <Link href="/home">
        <div
          style={{ backgroundImage: `url(${iconImage.src})` }}
          className="w-24 h-20 bg-cover"
        ></div>
      </Link>
    </header>
  );
}
