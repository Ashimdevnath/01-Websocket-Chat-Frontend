import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
