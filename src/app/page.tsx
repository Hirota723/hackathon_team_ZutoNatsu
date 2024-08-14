"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/api/getUser";
import Spinner from "../components/LoadSpinner";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      <Spinner />
    </div>
  );
};

export default Home;
