import { GalleryVerticalEnd } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import LoginBar from "@/features/home/components/login-bar";
import { NavigationBar } from "@/features/home/components/navigation-bar";
import Notification from "@/features/home/components/notification";

type LayoutProps = {
  children: React.ReactNode;
};

export default function layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-36px)] flex-col pt-safe">
      <Notification
        link="/"
        message="温馨提示：当前项目测试阶段，所有用户均可免费体验，请您提出宝贵意见，我们将在第一时间处理。邀您共同见证我们的成长。"
      />
      <header className="sticky top-0 z-50 w-full bg-background after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-[#efeff0] after:opacity-100 after:transition-opacity after:duration-200 lg:relative dark:after:bg-[#18191b]">
        <div className="relative z-10 mx-auto flex w-full max-w-[1408px] items-center justify-between px-8 py-2.5 md:px-4 lg:px-8">
          <div className="flex h-(--header-height) items-center gap-2 gap-x-[90px] xl:gap-x-16">
            <Button size="icon" variant="ghost">
              <GalleryVerticalEnd className="size-4" />
            </Button>
            <NavigationBar />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LoginBar />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}
