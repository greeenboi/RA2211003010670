"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  TrendingUp, 
  Users, 
  Menu, 
  X
} from "lucide-react";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const routes = [
  {
    path: "/",
    name: "Feed",
    icon: Home,
  },
  {
    path: "/trending",
    name: "Trending",
    icon: TrendingUp,
  },
  {
    path: "/top-users",
    name: "Top Users",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background md:static md:block",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex h-full flex-col gap-2 border-r p-4 md:w-64">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-bold">Social App</h1>
            <ModeToggle />
          </div>
          
          <div className="mt-8 flex flex-col gap-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
                    pathname === route.path
                      ? "bg-muted font-medium text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  <span>{route.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
