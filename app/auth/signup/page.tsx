"use client";
import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import Link from "next/link";
import validator from "validator"; // Add this import

const SignUpComponent = () => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    // Basic client-side validation
    if (!name.current || !email.current || !password.current) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (name.current.length < 3) {
      setError("Name must be at least 3 characters long");
      setIsSubmitting(false);
      return;
    }

    if (!validator.isEmail(email.current)) {
      setError("Invalid email address");
      setIsSubmitting(false);
      return;
    }

    if (password.current.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/authentication/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.current,
          email: email.current,
          password: password.current,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      // Automatically sign in the user after successful registration
      await signIn("credentials", {
        email: email.current,
        password: password.current,
        callbackUrl: "/",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full flex">
      <div className="relative hidden h-screen select-none flex-col justify-center bg-indigo-600 text-center md:flex md:w-1/2">
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
          <span className="rounded-full bg-white px-3 py-1 font-medium text-indigo-600">
            Join EazyFolio!
          </span>
          <p className="my-6 text-3xl font-semibold leading-10">
            Kickstart your journey
            <span className="mx-auto block w-56 whitespace-nowrap rounded-lg bg-yellow-400 py-2 text-white">
              With Ease!
            </span>
          </p>
          <p className="mb-4">
            Sign up and unlock the power to craft your perfect portfolio.
          </p>
          <a
            href="#signup"
            className="font-semibold tracking-wide text-white underline underline-offset-4"
          >
            Create Your Account
          </a>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
        <h3 className=" text-5xl font-bold text-center text-gray-800">Eazy <span className="text-blue-800">Folio</span></h3>

          <div className="">
        
            <div className="space-y-1">
              <h3 className="text-gray-600 text-2xl font-semibold text-xl text-center">
                Create Your Account
              </h3>
            </div>
          </div>

          <form className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                onChange={(e) => {
                  name.current = e.target.value;
                }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent border-2 focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                onChange={(e) => {
                  email.current = e.target.value;
                }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent border-2 focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                onChange={(e) => {
                  password.current = e.target.value;
                }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent border-2 focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </form>

          {error && <p className="text-red-600">{error}</p>}

          <p className="">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>

          <p className="text-sm text-gray-500">
            By signing up you agree to our{" "}
            <Link href="/terms-of-service" className="underline">
              Terms of service
            </Link>{" "}
            and it&apos;s{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy policy
            </Link>
          </p>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUpComponent;
