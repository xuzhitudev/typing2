import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
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
  );
}
