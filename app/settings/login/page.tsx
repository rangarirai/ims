"use client";
import dynamic from "next/dynamic";

const AuthUi = dynamic(() => import("@/components/AuthUI"), {
  ssr: false,
});

function Login() {
  return <AuthUi />;
}

export default Login;
