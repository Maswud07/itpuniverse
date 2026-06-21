import React from 'react';
import { Facebook, Youtube, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onTakeMockTest?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export default function Footer({ onTakeMockTest, onNavigateTab }: FooterProps) {
  // Simple scroll back to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-50/80 border-t border-gray-200/60 pt-16 pb-12 text-left text-xs text-gray-500 font-normal leading-relaxed select-none" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Six Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12" id="footer-navigation-grid">
          <div>
            <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider mb-4 border-b border-gray-200/40 pb-1">TOEFL®</h4>
            <ul className="space-y-2.5 text-[11.5px] font-medium text-gray-600">
              <li><button onClick={() => onNavigateTab?.('Home')} className="hover:text-blue-600 transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavigateTab?.('Mock Tests')} className="hover:text-blue-600 transition-colors cursor-pointer">Mock Tests</button></li>
              <li><button onClick={() => onNavigateTab?.('Study Center')} className="hover:text-blue-600 transition-colors cursor-pointer">Study</button></li>
              <li><button onClick={() => onNavigateTab?.('Home')} className="hover:text-blue-600 transition-colors cursor-pointer">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider mb-4 border-b border-gray-200/40 pb-1">IELTS™</h4>
            <ul className="space-y-2.5 text-[11.5px] font-medium text-gray-600">
              <li><button onClick={() => onNavigateTab?.('Home')} className="hover:text-blue-600 transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavigateTab?.('Mock Tests')} className="hover:text-blue-600 transition-colors cursor-pointer">Mock Tests</button></li>
              <li><button onClick={() => onNavigateTab?.('Study Center')} className="hover:text-blue-600 transition-colors cursor-pointer">Study</button></li>
              <li><button onClick={() => onNavigateTab?.('Home')} className="hover:text-blue-600 transition-colors cursor-pointer">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider mb-4 border-b border-gray-200/40 pb-1">PTE</h4>
            <ul className="space-y-2.5 text-[11.5px] font-medium text-gray-600">
              <li><button onClick={() => onNavigateTab?.('Home')} className="hover:text-blue-600 transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavigateTab?.('Mock Tests')} className="hover:text-blue-600 transition-colors cursor-pointer">Mock Tests</button></li>
              <li><button onClick={() => onNavigateTab?.('Home')} className="hover:text-blue-600 transition-colors cursor-pointer">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider mb-4 border-b border-gray-200/40 pb-1">Study Abroad</h4>
            <ul className="space-y-2.5 text-[11.5px] font-medium text-gray-600">
              <li><button onClick={() => onNavigateTab?.('Home')} className="hover:text-blue-600 transition-colors cursor-pointer">Interview</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider mb-4 border-b border-gray-200/40 pb-1">Skill Development</h4>
            <ul className="space-y-2.5 text-[11.5px] font-medium text-gray-600">
              <li><button onClick={() => onNavigateTab?.('Study Center')} className="hover:text-blue-600 transition-colors cursor-pointer">Vocab</button></li>
              <li><button onClick={() => onNavigateTab?.('Practice Questions')} className="hover:text-blue-600 transition-colors cursor-pointer">Shadowing Practice</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider mb-4 border-b border-gray-200/40 pb-1">Community</h4>
            <ul className="space-y-2.5 text-[11.5px] font-medium text-gray-600">
              <li><button onClick={() => onNavigateTab?.('Community')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">Forum</button></li>
              <li><button onClick={() => onNavigateTab?.('Blog')} className="hover:text-blue-600 transition-colors cursor-pointer">Blog</button></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Brand Row */}
        <div className="border-t border-gray-200/50 pt-8 pb-6 flex flex-wrap items-center justify-between gap-4" id="footer-brand-section">
          <div className="flex items-center space-x-2 select-none">
            <span className="font-sans font-black text-lg tracking-tight text-slate-800">
              ITP Universe
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-gray-500 font-extrabold tracking-tight">
            <a href="#" className="hover:text-blue-600 transition-colors">Partnership Inquiry</a>
            <span className="h-3.5 w-px bg-gray-200"></span>
            <a href="#" className="hover:text-blue-600 transition-colors">Customer Support</a>
          </div>
        </div>

        {/* Business Registration Details and Trademark Notices */}
        <div className="text-[10.5px] text-gray-400 font-medium space-y-4 leading-relaxed max-w-4xl mb-8" id="footer-legal-notices">
          <div>
            <p>ITP Universe</p>
            <p>Dhaka, Bangladesh</p>
            <p>Founded in 2026</p>
          </div>

          <div className="border-t border-gray-150/40 pt-4" />

          <div>
            <p className="mb-1">All trademarks are the property of their respective owners.</p>
            <p className="mb-1">
              <span className="font-bold text-gray-500">TOEFL®</span> is a registered trademark of ETS, used under license. The Eight-Point logo is a trademark of ETS. ITP is an authorized <span className="font-bold text-gray-500">TOEFL®</span> Voucher Reseller. All other uses of TOEFL, including TOEFL preparation by ITP is not endorsed or approved by ETS.
            </p>
            <p>
              <span className="font-bold text-gray-500">IELTS™</span> is a registered trademark of University of Cambridge ESOL, the British Council, and IDP Education Australia.
            </p>
          </div>
        </div>

        {/* Links Navigation Bar - Privacy / Terms / Blog etc */}
        <div className="border-t border-gray-200/50 pt-5 pb-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-black text-gray-600 tracking-wide uppercase select-none" id="footer-policy-row">
          <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <span className="text-gray-200">•</span>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms of Use</a>
          <span className="text-gray-200">•</span>
          <a href="#" className="hover:text-slate-800 transition-colors">About TOEFL®</a>
          <span className="text-gray-200">•</span>
          <a href="#" className="hover:text-slate-800 transition-colors">About IELTS</a>
          <span className="text-gray-200">•</span>
          <button onClick={() => onNavigateTab?.('Blog')} className="hover:text-slate-800 transition-colors cursor-pointer capitalize">Blog</button>
        </div>

        {/* Bottom Bar: Copyright, Language, Centered Call-To-Action Button, Socials */}
        <div className="border-t border-gray-200 pb-2 pt-6 flex flex-col md:flex-row items-center justify-between gap-6" id="footer-bottom-bar">
          
          {/* Copyright Section (Left) */}
          <div className="flex items-center space-x-1 order-3 md:order-1 self-start md:self-center">
            <span className="font-black text-gray-700 tracking-tighter uppercase mr-1 bg-gray-200 px-1.5 py-0.5 rounded text-[8px] select-none">DATA BANK</span>
            <span className="text-[10px] text-gray-400 font-bold">© 2021-2026. Databank Inc. All rights reserved.</span>
          </div>


          {/* Centered Space */}
          <div className="order-1 md:order-2 hidden md:block"></div>

          {/* Languages & Social Media Rows (Right) */}
          <div className="flex flex-wrap items-center gap-4 order-2 md:order-3 self-end md:self-center">
            {/* Language Selector pills */}
            <div className="bg-gray-100/90 rounded-md p-0.5 flex items-center border border-gray-200/40 text-[10px] font-black tracking-tight" id="footer-lang-selector">
              <button className="px-2.5 py-1 text-blue-600 font-black tracking-wide">English</button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3.5 text-gray-400">
              <a href="#" className="hover:text-blue-600 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>

            {/* Float Back to Top button */}
            <button 
              onClick={scrollToTop}
              className="bg-gray-200/60 hover:bg-gray-300/80 p-2 rounded-full text-slate-700 cursor-pointer transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
          
        </div>

      </div>
    </footer>
  );
}
