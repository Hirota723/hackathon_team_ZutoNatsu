import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-300 flex flex-col items-center py-4">
      <ul className="flex">
        <li>
          <Button variant="link">
            <Link href={"/home"}>ホーム</Link>
          </Button>
        </li>
        <li>
          <Button variant="link">
            <Link href={"/post"}>投稿</Link>
          </Button>
        </li>
        <li>
          <Button variant="link">
            <Link href={"/ranking"}>ランキング</Link>
          </Button>
        </li>
        <li>
          <Button variant="link">
            <Link href={"/my-photos"}>マイページ</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
