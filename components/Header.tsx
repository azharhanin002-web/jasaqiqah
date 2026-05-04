"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Paket Aqiqah", href: "/#paket" },
  { name: "Blog Edukasi", href: "/blog" },
  { name: "Kontak", href: "/kontak" },
];

interface HeaderProps {
  variant?: "light" | "dark";
}

export default function Header({ variant = "dark" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLight = variant === "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        // Logika Background saat Scroll
        isScrolled 
          ? isLight 
            ? "bg-white/90 backdrop-blur-md py-3 border-b border-gray-100 shadow-sm" 
            : "bg-primary/95 backdrop-blur-md py-3 border-b border-accent/20 shadow-xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link href="/" className="relative flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
            <Image
              src="/images/logo-farhan.png"
              alt="Logo Farhan Aqiqah"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-black text-lg leading-none tracking-tighter transition-colors",
              isLight ? "text-primary" : "text-white"
            )}>
              FARHAN <span className="text-accent">AQIQAH</span>
            </span>
            <span className="text-[9px] text-accent/70 uppercase tracking-[0.4em] font-black">
              Premium Service
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[11px] font-black uppercase tracking-[0.2em] transition-colors",
                isLight 
                  ? "text-primary/70 hover:text-accent" 
                  : "text-gray-300 hover:text-accent"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/62895324383400"
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95",
              isLight 
                ? "bg-primary text-white hover:bg-accent hover:text-primary" 
                : "bg-accent text-primary hover:bg-white"
            )}
          >
            <Phone size={14} strokeWidth={3} className="flex-shrink-0" />
            Konsultasi
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors",
            isLight ? "text-primary" : "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} className="text-accent" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "absolute top-full left-0 w-full border-b px-6 py-10 md:hidden shadow-2xl",
              isLight 
                ? "bg-white border-gray-100" 
                : "bg-primary border-accent/20"
            )}
          >
            <div className="flex flex-col gap-6 text-center max-w-sm mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-black uppercase tracking-[0.3em] transition-colors",
                    isLight ? "text-primary hover:text-accent" : "text-white hover:text-accent"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <hr className={isLight ? "border-gray-100" : "border-white/5"} />
              <a
                href="https://wa.me/62895324383400"
                className={cn(
                  "py-4 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-md",
                  isLight ? "bg-primary text-white" : "bg-accent text-primary"
                )}
              >
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}