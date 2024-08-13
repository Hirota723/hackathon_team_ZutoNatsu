import { supabase } from "@/utils/supabaseClient";

export const getAllPhotos = async () => {
  try {
    const { data, error } = await supabase.from("photos").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("写真の取得時にエラーが発生しました:", error);
    throw error;
  }
};
