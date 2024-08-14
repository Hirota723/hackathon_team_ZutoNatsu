import Link from "next/link";
import { Button } from "./ui/button";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faCirclePlus, faCrown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import bgImage from "@/assets/images/bg-image.png";

const Footer = () => {
  return (
    <>
      <div style={{ backgroundImage: `url(${bgImage.src})` }} className="w-[100%] h-60 bottom-[73px] fixed  left-0 w-full h-full bg-contain -z-10 md:hidden hogehoge" ></div>

      <div className="fixed bottom-0 left-0 right-0 bg-blue flex justify-around items-center py-4 z-10">

        <ul className="flex justify-around w-full">
          <li className="flex flex-col items-center">
            <Link href="/home">
              <Button variant="link">
                <FontAwesomeIcon icon={faHouse} className="text-white text-3xl" />
              </Button>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link href="/post">
              <Button variant="link">
                <FontAwesomeIcon icon={faCirclePlus} className="text-white text-3xl" />
              </Button>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link href="/ranking">
              <Button variant="link">
                <FontAwesomeIcon icon={faCrown} className="text-white text-3xl" />
              </Button>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link href="/my-photos">
              <Button variant="link">
                <FontAwesomeIcon icon={faUser} className="text-white text-3xl" />
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
