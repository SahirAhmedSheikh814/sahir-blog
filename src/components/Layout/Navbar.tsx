"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { navbarQuery } from "@/sanity/schemaTypes/Navbarquery";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Define TypeScript interfaces for navbar data
interface NavLink {
  label: string;
  href: string;
}

interface ButtonProps {
  text: string;
  url: string;
}

interface NavbarData {
  logo: string | null; // URL of the logo or null if not available
  navLinks: NavLink[];
  button: ButtonProps | null; // Button object or null if not available
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const pathname = usePathname();

  const blackBackgroundPages = ["/about", "/contact", "/faq"];
  const shouldBeBlack = blackBackgroundPages.includes(pathname);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const data: NavbarData = await client.fetch(navbarQuery);
        setNavbarData(data);
      } catch (error) {
        console.error("Error fetching navbar data:", error);
      }
    };

    fetchNavbarData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavStyles = () => {
    if (!shouldBeBlack) {
      return isScrolled
        ? "bg-black/70 text-white backdrop-blur-md"
        : "bg-transparent text-white";
    } else {
      return isScrolled
        ? "bg-black/70 text-white backdrop-blur-md"
        : "bg-black text-white";
    }
  };

  if (!navbarData) return null;

  const { logo, navLinks, button } = navbarData;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${getNavStyles()}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {logo ? (
              <Image
                src={urlFor(logo).url()}
                alt="Logo"
                width={140}
                height={40}
                className="w-[180px] h-auto md:w-[220px] xl:w-[260px]"
                style={{ height: "auto" }}
                priority
              />
            ) : (
              <h1 className="text-white font-semibold text-lg">Logo</h1>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navLinks?.map((link: NavLink) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-semibold text-2xl text-white hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {button && (
              <Button
                variant="default"
                className="hidden xl:inline-flex bg-black text-white hover:bg-black/90"
                asChild
              >
                <a href={button.url}>{button.text}</a>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger className="xl:hidden">
                <Menu className="text-white h-8 w-8" />
              </SheetTrigger>

              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="hidden">
                    Mobile navigation options
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-6 mt-8">
                  {navLinks?.map((link: NavLink) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-base font-medium hover:text-primary hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {button && (
                    <Button className="w-full bg-black text-white hover:bg-black/90 text-xs sm:text-base truncate" asChild>
                      <a href={button.url}  className="inline-block max-w-full overflow-hidden whitespace-nowrap text-ellipsis">{button.text}</a>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
