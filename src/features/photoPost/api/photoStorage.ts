import { supabase } from "@/utils/supabaseClient";

// ファイルをアップロードする関数
export const uploadPhoto = async (filePath: string, image: File) => {
  try {
    const { error } = await supabase.storage
      .from("photos")
      .upload(filePath, image);

    if (error) {
      throw new Error("ファイルのアップロードエラー: " + error.message);
    }
  } catch (error) {
    console.error("ファイルのアップロード中にエラーが発生しました:", error);
    throw error;
  }
};

// 公開URLを取得する関数
export const getPhotoUrl = async (filePath: string) => {
  try {
    const { data } = await supabase.storage
      .from("photos")
      .getPublicUrl(filePath);

    if (!data) {
      throw new Error("公開URLの取得エラー: データが存在しません。");
    }

    return data.publicUrl;
  } catch (error) {
    console.error("公開URLの取得中にエラーが発生しました:", error);
    throw error;
  }
};
