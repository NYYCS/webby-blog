import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";

export const useUser = () => {
  const { user, loading } = useContext(AuthContext);
  return [user, loading];
}