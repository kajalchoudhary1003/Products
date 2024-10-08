"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const selectedRole = watch("role");

  // Handle role change
  const handleRoleChange = (value) => {
    setValue("role", value, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    if (!data.role) {
      // Trigger validation error if role is not selected
      setValue("role", "", { shouldValidate: true });
      return;
    }

    registerUser(data);
  };

  const registerUser = async (data) => {
    setisLoading(true);
    try {
      const res = await axios.post("/api/register", data);
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="focus-visible:ring-transparent focus-visible:border-[1.5px] focus-visible:border-purple-800"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be atleast 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                        message:
                          "Password must contain at least 6 characters, including letters and numbers",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <RadioGroup className="pl-2" onValueChange={handleRoleChange}>
                  <div>
                    <RadioGroupItem
                      {...register("role", { required: "Select a role" })}
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
                      {...register("role", { required: "Select a role" })}
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
                    disabled={!selectedRole}
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
