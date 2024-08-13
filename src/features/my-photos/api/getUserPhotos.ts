import { supabase } from "@/utils/supabaseClient";

export const getUserPhotos = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("ユーザーの写真取得エラー: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("ユーザーの写真を取得中にエラーが発生しました:", error);
    throw error;
  }
};
