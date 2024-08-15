import { useEffect } from "react";

export const useDisableScroll = () => {
  useEffect(() => {
    // 横方向のスクロールを禁止する
    document.body.style.overflowX = "hidden";
    return () => {
      // クリーンアップ時に元に戻す
      document.body.style.overflowX = "auto";
    };
  }, []);
};
