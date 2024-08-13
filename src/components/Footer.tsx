import Link from "next/link";
import { Button } from "./ui/button";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'





const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-teal-800 flex justify-around items-center py-4">
      <ul className="flex justify-around w-full">
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/home">
            <FontAwesomeIcon icon={faHouse} className="text-white text-3xl" />
            </Link>
          </Button>
        </li>
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/post">
            <FontAwesomeIcon icon={faCirclePlus} className="text-white text-3xl"/>
            </Link>
          </Button>
        </li>
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/ranking">
            <FontAwesomeIcon icon={faCrown} className="text-white text-3xl"/>
            </Link>
          </Button>
        </li>
        <li className="flex flex-col items-center">
          <Button variant="link">
            <Link href="/my-photos">
              <FontAwesomeIcon icon={faUser} className="text-white text-3xl"/>
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
