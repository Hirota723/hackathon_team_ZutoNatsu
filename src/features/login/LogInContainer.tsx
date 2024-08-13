"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LogInPresenter from "./LogInPresenter";
import { getUser } from "@/api/getUser";

const LogInContainer = () => {
  const router = useRouter();

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
