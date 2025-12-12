import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-svh items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link
        className="flex items-center gap-2 self-center font-medium"
        href="/"
      >
        <Image alt="Nodebase" height={30} src="/logos/logo.svg" width={30} />
        Typing Platform
      </Link>
      {children}
    </div>
  </div>
);
