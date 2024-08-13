import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-teal-800 flex justify-around items-center py-4">
      <ul className="flex justify-around w-full">
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/home">
              <img src="/images/home_icon.png" alt="ホーム" className="w-6 h-6" />
            </Link>
          </Button>
        </li>
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/post">
              <img src="/images/post_icon.png" alt="投稿" className="w-6 h-6" />
            </Link>
          </Button>
        </li>
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/ranking">
              <img src="/images/ranking_icon.png" alt="ランキング" className="w-6 h-6" />
            </Link>
          </Button>
        </li>
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/my-photos">
              <img src="/images/my_photos_icon.png" alt="マイページ" className="w-6 h-6" />
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
