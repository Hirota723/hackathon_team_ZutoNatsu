import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/utils/supabaseClient";
import { customLocalization } from "@/constants/customLocalization";

const LogInPresenter = () => {
  return (
    <div>
      <h1>ログイン</h1>
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        localization={{
          variables: customLocalization,
        }}
        appearance={{
          variables: {
            default: {
              colors: {
                brand: "#6366f1",
                brandAccent: "#4f46e5",
              },
            },
          },
          className: {
            container: "space-y-4",
            button:
              "w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg",
            input:
              "w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500",
            label: "block text-sm font-medium text-gray-700",
          },
        }}
      />
    </div>
  );
};

export default LogInPresenter;
