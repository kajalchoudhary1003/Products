"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Register() {
  const {register, handleSubmit} = useForm();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    if (!data.email) {
      enqueueSnackbar("Enter Email", { variant: "error" });
    } else if (!data.password) {
      enqueueSnackbar("Enter Password", { variant: "error" });
    } else if (!data.role) {
      enqueueSnackbar("Select Role", { variant: "error" });
    } else {
      registerUser(data);
    }
  };

  const registerUser = async (data) => {
    setisLoading(true);
    try {
      const res = await axios.post("/api/register", data);
      if (res.status === 200) {
        
        router.push("/login");
      }
    } catch (err) {
      setisLoading(true);
      console.log(err);
    }
  };
  return (
    <div className="flex h-screen">
      {/* Left half with gradient background */}
      <div className="basis-1/2 relative overflow-hidden rounded-tr-3xl ">
        <BackgroundGradientAnimation />
        {/*  overlay text */}
        <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Products X
          </p>
          <p className="text-lg bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 pt-4">
            Experience Innovation, Elevate Everyday.
          </p>
        </div>
      </div>
      {/* Right half with login */}
      {!isLoading && (
      <div className="basis-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-4 border-pink-400 p-2 rounded-tr-3xl rounded-bl-3xl ">
            <div className="flex flex-col space-y-3 w-96 border-4 border-base p-4 rounded-tr-2xl rounded-bl-2xl bg-white">
              <div>
                <h1 className="text-center text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-l from-base to-pink-400">
                  Register
                </h1>
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="focus-visible:ring-transparent focus-visible:border-[1.5px] focus-visible:border-purple-800"
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="focus-visible:ring-transparent focus-visible:border-[1.5px] focus-visible:border-purple-800"
                  {...register("password")}
                />
              </div>

              <RadioGroup className="pl-2">
                <div>
                  <RadioGroupItem
                    {...register("role")}
                    name="role"
                    value="admin"
                    id="r1"
                  />
                  <Label className="pl-2" htmlFor="r1">
                    Admin
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    {...register("role")}
                    name="role"
                    value="team-member"
                    id="r2"
                  />
                  <Label className="pl-2" htmlFor="r2">
                    Team-member
                  </Label>
                </div>
              </RadioGroup>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="mt-8 rounded-full w-44 bg-gradient-to-r from-base to-pink-400 text-lg font-semibold hover:scale-105"
                >
                  Register
                </Button>
              </div>
              <div>
                <h1 className="text-center text-blue-700 hover:scale-105 cursor-pointer">
                  <a href="/login">Already have an account. Login here</a>
                </h1>
              </div>
            </div>
          </div>
        </form>
      </div>
      )}
    </div>
  );
}

export default Register;
