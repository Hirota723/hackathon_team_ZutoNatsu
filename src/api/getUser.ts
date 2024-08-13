import { supabase } from "@/utils/supabaseClient";

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
