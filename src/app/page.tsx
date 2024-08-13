"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/api/getUser";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const user = await getUser();

        if (user) {
          router.push("/home");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("認証チェック中にエラーが発生しました:", error);
        router.push("/login");
      }
    };

    getAuth();
  }, [router]);

  return <div>Loading...</div>;
};

export default Home;
