"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function Header() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsLargeScreen(mediaQuery.matches);
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={cn("fixed w-full z-50",
      isScrolled && "bg-background/80 w-full backdrop-blur-xs shadow-lg transition-colors duration-300",
      isLargeScreen && "bg-transparent backdrop-opacity-0"
    )}>
      <nav className="container mx-auto px-4 hidden md:flex w-full items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <div className=" relative w-14 h-14">
            <Image
              src={logoImg}
              alt="imagem do logo tipo"
              className="object-contain"
              fill
              quality={100}
              priority
              sizes="(max-width: 768px) 100vw,"
            />
          </div>
          <span className="font-semibold text-2xl">Mind Night</span>
        </div>

        <ul className="flex space-x-4  items-center">
          {['Inicio', 'Recursos', 'Preços', 'Testemunhos'].map(item => (
            <li
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              key={item}
              className="font-semibold hover:text-yellow-500 transition-colors duration-300"
            >
              {item}
            </li>
          ))}
          <li>
            <Button
              variant={"outline"}
              className="hover:border-purple-500 hover:bg-purple-500 transition-colors duration-300"
            >
              <Link className="" href="/loginw">Entrar</Link>
            </Button>
          </li>
          <li>
            <Button
              variant={"outline"}
              className="hover:border-purple-500 hover:bg-purple-500 transition-colors duration-300"
            >
              <Link href="/loginw">Começar Grátis</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <Button
        variant={"outline"}
        className="md:hidden m-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={24} className='hover:text-purple-500' />
      </Button>

      {/* Mobile Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger className='hidden'>
        </SheetTrigger>
        <SheetContent className='px-6'>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          {['Inicio', 'Recursos', 'Preços', 'Sobre'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-purple-500 transition-colors text-left"
            >
              {item}
            </button>
          ))}
          <Button variant={"outline"}>
            <Link className="" href="/loginw">Entrar</Link>
          </Button>
          <Button variant={"outline"}>
            <Link href="/loginw">Começar Grátis</Link>
          </Button>
        </SheetContent>
      </Sheet>
    </header>
  )
}