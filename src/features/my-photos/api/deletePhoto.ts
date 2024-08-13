import { supabase } from "@/utils/supabaseClient";

export const deletePhoto = async (photoId: number) => {
  try {
    // まず、写真のURLを取得してストレージから削除します
    const { data: photo, error: fetchError } = await supabase
      .from("photos")
      .select("photo_url")
      .eq("id", photoId)
      .single();

    if (fetchError) {
      throw new Error("写真の取得に失敗しました: " + fetchError.message);
    }

    const photoUrl = photo.photo_url;
    const filePath = photoUrl.split("/").slice(-2).join("/"); // ストレージ内のファイルパスを取得

    // ストレージからファイルを削除
    const { error: storageError } = await supabase.storage
      .from("photos")
      .remove([filePath]);

    if (storageError) {
      throw new Error(
        "ストレージからの削除に失敗しました: " + storageError.message
      );
    }

    // いいねのレコードを削除
    const { error: deleteLikesError } = await supabase
      .from("likes")
      .delete()
      .eq("photo_id", photoId); // いいねのレコードを削除

    if (deleteLikesError) {
      throw new Error(
        "いいねの削除に失敗しました: " + deleteLikesError.message
      );
    }

    // 次に、データベースから写真のレコードを削除
    const { error: deleteError } = await supabase
      .from("photos")
      .delete()
      .eq("id", photoId);

    if (deleteError) {
      throw new Error(
        "データベースからの削除に失敗しました: " + deleteError.message
      );
    }

    return photoId;
  } catch (error) {
    console.error("写真の削除中にエラーが発生しました:", error);
    throw error;
  }
};
