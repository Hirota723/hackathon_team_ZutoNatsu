"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LogInPresenter from "./LogInPresenter";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { getUser } from "@/api/getUser";

const LogInContainer = () => {
  const router = useRouter();

  useDisableScroll();

  useEffect(() => {
    const getAuth = async () => {
      const user = await getUser();

      if (user) {
        router.push("/home");
      }
    };

    getAuth();
  }, [router]);

  return <LogInPresenter />;
};

export default LogInContainer;
