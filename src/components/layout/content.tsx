"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./header";

const queryClient = new QueryClient();

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-white">
      <Header />
      <QueryClientProvider client={queryClient}>
        <div className="mx-auto max-w-screen-md p-4">{children}</div>
      </QueryClientProvider>
    </div>
  );
};

export default Content;
