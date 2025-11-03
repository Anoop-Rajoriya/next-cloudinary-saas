import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-base-200">
      {children}
    </main>
  );
}

export default AuthLayout;
