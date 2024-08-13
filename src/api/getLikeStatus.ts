import { supabase } from "@/utils/supabaseClient";

export const getLikeStatus = async (userId: string, photoId: number) => {
  try {
    const { data, error } = await supabase
      .from("likes")
      .select("photo_id")
      .eq("user_id", userId)
      .eq("photo_id", photoId);

    if (error) {
      throw new Error(error.message);
    }

    return data.length > 0;
  } catch (error) {
    console.error("いいねのステータス取得中にエラーが発生しました:", error);
    return false;
  }
};
