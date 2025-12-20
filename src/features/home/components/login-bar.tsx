"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GeneratorAvatar from "@/components/generator-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient, useSession } from "@/lib/auth-client";

const LoginBar = () => {
  const { data, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (isPending) return <Skeleton className="h-8 w-32" />;

  if (data?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:ring-transparent!">
          <div className="flex items-center gap-2 rounded-sm px-2 py-1 hover:dark:bg-popover">
            <GeneratorAvatar
              className="size-4"
              seed={data.user.name}
              variant="botttsNeutral"
            />
            <span>{data.user.name}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => handleSignOut(e)}>
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary">
        <Link href="/login">登录</Link>
      </Button>
      <Button>
        <Link href="/signup">注册</Link>
      </Button>
    </div>
  );
};

export default LoginBar;
