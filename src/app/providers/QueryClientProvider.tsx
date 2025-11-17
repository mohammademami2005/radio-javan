'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Children, ReactNode } from "react";
import Header from "../components/header";
import PlayBar from "../components/playBar";

const queryClient = new QueryClient();


export default function Provider({children}:{children:ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <PlayBar />
      {children}
    </QueryClientProvider>
  );
}
