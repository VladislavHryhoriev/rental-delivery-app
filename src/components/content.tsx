"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./header";

const queryClient = new QueryClient();

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-screen-md text-white">
      <Header />
      <QueryClientProvider client={queryClient}>
        <div className="p-4">{children}</div>
      </QueryClientProvider>
    </div>
  );
};

export default Content;
