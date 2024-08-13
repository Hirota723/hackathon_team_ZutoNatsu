import { supabase } from "@/utils/supabaseClient";

export const getLikeCount = async (photoId: number) => {
  try {
    const { count, error } = await supabase
      .from("likes")
      .select("photo_id", { count: "exact" })
      .eq("photo_id", photoId);

    if (error) {
      throw new Error(error.message);
    }

    return count || 0;
  } catch (error) {
    console.error("いいね数の取得中にエラーが発生しました:", error);
    return 0;
  }
};
