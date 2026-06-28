import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AlertDestructive } from "@/components/utilits/errorComponent";
import { useUserStore } from "@/store/user.store";
import type { IuserLoginRequest } from "@/types/user";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    isLoading,
    loginUser,
    error,
    isSuccess,
    isError,
  } = useUserStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IuserLoginRequest = {
      emailaddress: email,
      password: password,
    };

    await loginUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      navigate("/dashboard");
    }

    if (isError) {
      toast.error(error);
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <div className="w-full max-w-md">

        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Sign In to your account
          </h1>

          <p className="text-gray-500">
            Please enter your email and password.
          </p>
        </div>

        {error && (
          <div className="mb-4">
            <AlertDestructive
              errorTitle="Login Failed"
              errorDescription={error}
            />
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label>Email Address</Label>

            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};