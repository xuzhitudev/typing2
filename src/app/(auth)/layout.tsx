import type { ReactNode } from "react";
import { AuthLayout } from "@/features/auth/components/auth-layout";

const Layout = ({ children }: { children: ReactNode }) => (
  <AuthLayout>{children}</AuthLayout>
);

export default Layout;
