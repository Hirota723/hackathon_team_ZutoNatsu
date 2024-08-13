import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/utils/supabaseClient";
import { customLocalization } from "@/constants/customLocalization";

const LogInPresenter = () => {
  return (
    <div className="bg-[#F4EDE3] min-h-screen flex flex-col">
      <header className="bg-[#015873] h-16">
        {/* ここにヘッダーの内容を追加できます */}
      </header>
      
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-sm">
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
                    brand: "#CF5444",
                    brandAccent: "#BC4C3E",
                  },
                },
              },
              className: {
                container: "space-y-4",
                button:
                  "w-full py-2 px-4 bg-[#CF5444] text-white font-semibold rounded-lg",
                input:
                  "w-full py-2 px-4 bg-[#FFFFFF] border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500",
                label: "block text-sm font-medium text-gray-700",
              },
            }}
          />
        </div>
      </div>
      
      <footer className="bg-[#015873] h-16">
        {/* ここにフッターの内容を追加できます */}
      </footer>
    </div>
  );
};

export default LogInPresenter;
