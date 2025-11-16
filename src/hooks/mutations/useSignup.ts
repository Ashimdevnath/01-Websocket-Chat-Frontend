import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/services/auth.service";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
