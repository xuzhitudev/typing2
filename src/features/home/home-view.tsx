"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import LoginBar from "./components/login-bar";
import { NavigationBar } from "./components/navigation-bar";
import Notification from "./components/notification";

const HomeView = () => (
  <div className="relative flex min-h-[calc(100vh-36px)] flex-col pt-safe">
    <Notification
      link="/"
      message="温馨提示：当前项目测试阶段，所有用户均可免费体验，请您提出宝贵意见，我们将在第一时间处理。邀您共同见证我们的成长。"
    />
    <header className="sticky top-0 z-50 w-full bg-background after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-[#efeff0] after:opacity-100 after:transition-opacity after:duration-200 lg:relative dark:after:bg-[#18191b]">
      <div className="relative z-10 mx-auto flex w-full max-w-[1408px] items-center justify-between px-8 md:px-4 lg:px-8">
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
    <main className="flex flex-1 flex-col overflow-hidden">
      <section className="hero safe-paddings relative pt-[168px] md:pt-[88px] lg:pt-32 xl:pt-[152px]">
        <div className="relative z-10 mx-auto max-w-[1100px] md:px-4 lg:max-w-none lg:px-8 xl:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="-tracking-[0.03em] font-medium font-title text-[72px] leading-none sm:text-[32px] lg:text-[56px] xl:text-[48px] dark:text-white">
              <span className="mx-2 text-primary">Typing ··· </span>
              即是学习的开始。
            </h1>
            <p className="mt-2.5 max-w-xl text-gray-new-15 text-lg leading-snug tracking-tighter lg:mt-5 lg:text-base dark:text-gray-new-80">
              在轻松中，重构语言的边界。
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Button asChild>
                <Link href="/dashboard">开始练习</Link>
              </Button>
              <Button variant="outline">了解更多</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default HomeView;
