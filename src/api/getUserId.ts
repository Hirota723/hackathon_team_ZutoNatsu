import { getUser } from "@/api/getUser";

export const getUserId = async () => {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("ユーザーが見つかりません。");
    }

    return user.id;
  } catch (error) {
    console.error("ユーザーID取得時にエラーが発生しました:", error);
    throw error;
  }
};
