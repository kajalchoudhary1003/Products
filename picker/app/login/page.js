'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    redirect(token);
  }, [router]);

  const onSubmit = (data) => {
    if (!data.email) {
      enqueueSnackbar("Enter Email", { variant: "error" });
    } else if (!data.password) {
      enqueueSnackbar("Enter Password", { variant: "error" });
    } else {
      userLogin(data);
    }
  };

  const redirect = (token) =>{
    if(token){
      router.push("/dashboard");
    }else{
      router.refresh('/login');
    }
  }

const userLogin = async (data) => {
  setisLoading(true);
  try {
    const res = await axios.post("/api/login", data);
    if(res.status === 200){
      console.log(res);
      localStorage.setItem("token",res.data.token)
        localStorage.setItem("role",res.data.role)
        localStorage.setItem("user_id",res.data.userId)
        redirect(res.data.token)
    }
  } catch(err){
    setisLoading(false)
    console.log(err.message)
  }
}

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
                    Login
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

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="mt-8 rounded-full w-44 bg-gradient-to-r from-base to-pink-400 text-lg font-semibold hover:scale-105"
                  >
                    Login
                  </Button>
                </div>
                <div>
                  <h1 className="text-center text-blue-700 hover:scale-105 cursor-pointer">
                    <a href="/register">New User. Register here</a>
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

export default Login;
