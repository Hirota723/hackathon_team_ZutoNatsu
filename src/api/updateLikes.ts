import { supabase } from "@/utils/supabaseClient";

export const addLike = async (userId: string, photoId: number) => {
  try {
    const { error } = await supabase
      .from("likes")
      .insert({ photo_id: photoId, user_id: userId });

    if (error) {
      throw new Error("いいねの追加エラー: " + error.message);
    }
  } catch (error) {
    console.error("いいねの追加中にエラーが発生しました:", error);
    throw error;
  }
};

export const deleteLike = async (userId: string, photoId: number) => {
  try {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ photo_id: photoId, user_id: userId });

    if (error) {
      throw new Error("いいねの削除エラー: " + error.message);
    }
  } catch (error) {
    console.error("いいねの削除中にエラーが発生しました:", error);
    throw error;
  }
};
