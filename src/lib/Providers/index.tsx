"use client";

import * as React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreProvider from "@/app/redux/store/StoreProvider";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";



export interface ProvidersProps {
  
  children: React.ReactNode;
}
const queryClient = new QueryClient();
export function Providers({ children,  }: ProvidersProps) {

  return (

    <QueryClientProvider client={queryClient}>

      {/* <UserProvider> */}
   <StoreProvider  >

  <ThemeProvider>   

    {children}
  </ThemeProvider>

   </StoreProvider>
          <Toaster />
        
      {/* </UserProvider>  */}

      </QueryClientProvider> 
  );
}