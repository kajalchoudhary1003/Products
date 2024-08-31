"use client";
import React, { useState } from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

function LoginPage({ mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be exactly 6 characters long and contain only alphabets and numbers
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    const trimmedPassword = password.trim();

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(trimmedPassword)) {
      validationErrors.password =
        "Password must be 6 characters long and contain only alphabets and numbers.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // No errors, proceed with form submission or other actions
      console.log("Form submitted successfully!");
      // Reset form fields or perform login action here
    }
  };

  const handleLinkClick = () => {
    router.push(mode === "login" ? "/register" : "/login");
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
      <div className="basis-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="border-4 border-pink-400 p-2 rounded-tr-3xl rounded-bl-3xl ">
            <div className="flex flex-col space-y-3 w-96 border-4 border-base p-4 rounded-tr-2xl rounded-bl-2xl bg-white">
              <div>
                <h1 className="text-center text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-l from-base to-pink-400">
                  {mode === "login" ? "Login" : "Register"}
                </h1>
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="focus-visible:ring-transparent focus-visible:border-[1.5px] focus-visible:border-purple-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="focus-visible:ring-transparent focus-visible:border-[1.5px] focus-visible:border-purple-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              {mode === "register" && (
                <RadioGroup className="pl-2">
                  <div>
                    <RadioGroupItem value="admin" id="r1" />
                    <Label className="pl-2" htmlFor="r1">
                      Admin
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="team-member" id="r2" />
                    <Label className="pl-2" htmlFor="r2">
                      Team-member
                    </Label>
                  </div>
                </RadioGroup>
              )}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="mt-8 rounded-full w-44 bg-gradient-to-r from-base to-pink-400 text-lg font-semibold hover:scale-105"
                >
                  {mode === "login" ? "Login" : "Register"}
                </Button>
              </div>
              <div>
                <h1
                  className="text-center text-blue-700 hover:scale-105 cursor-pointer"
                  onClick={handleLinkClick}
                >
                  {" "}
                  {mode === "login"
                    ? "New User Register Here"
                    : "Already a user? Login here"}
                </h1>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
