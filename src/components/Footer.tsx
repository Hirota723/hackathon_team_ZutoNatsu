import Link from "next/link";
import { useRouter } from 'next/navigation'; // appディレクトリではこちらを使用
import { Button } from "./ui/button";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faCirclePlus, faCrown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import bgImage from "@/assets/images/bg-image.png";

const Footer: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 現在のルートを設定する
    setCurrentRoute(window.location.pathname);
  }, []);

  if (!currentRoute) {
    return null; // ルートが設定されるまで何もレンダリングしない
  }

  return (
    <>
      <div style={{ backgroundImage: `url(${bgImage.src})` }} className="w-full h-60 bottom-[73px] fixed left-0 bg-contain -z-10"></div>

      <div className="fixed bottom-0 left-0 right-0 bg-blue flex justify-around items-center py-4 z-10">
        <ul className="flex justify-around w-full">
          <li className="flex flex-col items-center">
            <Link href="/home">
              <Button variant="link">
                <FontAwesomeIcon
                  icon={faHouse}
                  className={`text-3xl ${currentRoute === '/home' ? 'text-yellow-500' : 'text-white'}`}
                />
              </Button>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link href="/post">
              <Button variant="link">
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className={`text-3xl ${currentRoute === '/post' ? 'text-yellow-500' : 'text-white'}`}
                />
              </Button>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link href="/ranking">
              <Button variant="link">
                <FontAwesomeIcon
                  icon={faCrown}
                  className={`text-3xl ${currentRoute === '/ranking' ? 'text-yellow-500' : 'text-white'}`}
                />
              </Button>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link href="/my-photos">
              <Button variant="link">
                <FontAwesomeIcon
                  icon={faUser}
                  className={`text-3xl ${currentRoute === '/my-photos' ? 'text-yellow-500' : 'text-white'}`}
                />
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
