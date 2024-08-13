import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/utils/supabaseClient";

const LogInPresenter = () => {
  return (
    <div>
      <h1>ログイン</h1>
      <Auth supabaseClient={supabase} providers={["google"]} />
    </div>
  );
};

export default LogInPresenter;
