"use client";
import { redirect } from "next/navigation";
import React from "react";

function Home() {
  redirect("/sales");
  return <div>Home</div>;
}

export default Home;
