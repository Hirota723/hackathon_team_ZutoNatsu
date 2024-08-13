import Photos from "@/entities/photos";
import { supabase } from "@/utils/supabaseClient";

// データベースに新しい写真の情報を追加する関数
export const addPhoto = async (photo: Photos) => {
  try {
    const { data, error } = await supabase.from("photos").insert({
      user_id: photo.user_id,
      user_name: photo.user_name,
      user_avatar: photo.user_avatar,
      photo_url: photo.photo_url,
      title: photo.title,
      location: photo.location,
      created_at: photo.created_at,
    });

    if (error) {
      throw new Error("写真の追加エラー: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("写真の追加中にエラーが発生しました:", error);
    throw error;
  }
};
