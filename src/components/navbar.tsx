import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center pl-4 lg:pl-8">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">AI Study Buddy</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end pr-4 lg:pr-8">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Optional search or other navbar items */}
          </div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
