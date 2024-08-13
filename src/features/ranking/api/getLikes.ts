import { supabase } from "@/utils/supabaseClient";

export const getLikes = async () => {
  try {
    const { data, error } = await supabase.from("likes").select("*");

    if (error) {
      throw new Error("いいね情報の取得エラー: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("いいね情報の取得中にエラーが発生しました:", error);
    throw error;
  }
};
