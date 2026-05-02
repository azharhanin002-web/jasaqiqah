"use client";

import React, { useState } from "react";
import { 
  Share2, Facebook, MessageCircle, 
  Send, Link2, Check 
} from "lucide-react";

interface SocialShareProps {
  title: string;
  slug: string;
}

export default function SocialShare({ title, slug }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://jasaqiqah.my.id/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={18} fill="currentColor" />,
      color: "bg-[#4267B2]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      name: "X",
      icon: (
        /* PERBAIKAN: Mengganti size="18" menjadi width dan height */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "bg-black",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${shareUrl}`,
    },
    {
      name: "Pinterest",
      icon: (
        /* PERBAIKAN: Mengganti size="18" menjadi width dan height */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.718-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.654 2.568-.994 3.993-.283 1.194.599 2.169 1.775 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.868-2.061-4.874-5.004-4.874-3.41 0-5.411 2.558-5.411 5.199 0 1.03.397 2.135.892 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.135-2.607 7.462-6.223 7.462-1.214 0-2.354-.63-2.744-1.37l-.749 2.848c-.27 1.03-.999 2.324-1.488 3.12 1.108.343 2.283.528 3.503.528 6.62 0 11.988-5.367 11.988-11.987C24.004 5.367 18.638 0 12.017 0z" />
        </svg>
      ),
      color: "bg-[#BD081C]",
      url: `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={18} fill="currentColor" />,
      color: "bg-[#25D366]",
      url: `https://wa.me/?text=${encodedTitle}%20${shareUrl}`,
    },
    {
      name: "Telegram",
      icon: <Send size={18} fill="currentColor" className="ml-[-2px]" />,
      color: "bg-[#0088cc]",
      url: `https://t.me/share/url?url=${shareUrl}&text=${encodedTitle}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative flex items-center bg-white border border-gray-100 px-4 py-3 rounded-lg shadow-sm">
        <Share2 size={18} className="text-gray-600 mr-3" />
        <div className="w-[1px] h-4 bg-gray-200 mr-4"></div>
        <span className="text-sm font-black text-primary uppercase tracking-wider">Bagikan</span>
        <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 rotate-45"></div>
      </div>

      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Bagikan ke ${link.name}`}
            className={`w-10 h-10 ${link.color} text-white flex items-center justify-center rounded-md hover:scale-110 hover:shadow-lg transition-all active:scale-95`}
          >
            {link.icon}
          </a>
        ))}

        <button
          onClick={copyToClipboard}
          title="Salin Tautan"
          className={`w-10 h-10 ${copied ? 'bg-green-500' : 'bg-black'} text-white flex items-center justify-center rounded-md hover:scale-110 hover:shadow-lg transition-all active:scale-95`}
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>
      </div>
    </div>
  );
}