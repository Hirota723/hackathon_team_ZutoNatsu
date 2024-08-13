import { I18nVariables } from "@supabase/auth-ui-shared";

export const customLocalization: I18nVariables = {
  sign_in: {
    email_label: "メールアドレス",
    password_label: "パスワード",
    button_label: "ログイン",
    link_text: "既にアカウントをお持ちの方はこちらからログイン",
  },
  sign_up: {
    email_label: "メールアドレス",
    password_label: "パスワード",
    button_label: "新規登録",
    link_text: "アカウントをお持ちでない方はこちらから新規登録",
  },
  forgotten_password: {
    email_label: "メールアドレス",
    button_label: "パスワードリセットのリンクを送信",
    link_text: "パスワードを忘れた方はこちら",
  },
  magic_link: {
    email_input_label: "メールアドレス",
    email_input_placeholder: "あなたのメールアドレス",
    button_label: "マジックリンクを送信",
    link_text: "マジックリンクをお忘れですか？",
  },
  update_password: {
    password_label: "新しいパスワード",
    password_input_placeholder: "新しいパスワードを入力",
    button_label: "パスワードを更新する",
  },
  // 他の必要なフィールドをここに追加
};
