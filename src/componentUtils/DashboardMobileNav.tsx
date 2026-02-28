"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, ClipboardList, MessageSquare, Map, LayoutDashboard } from "lucide-react";
import SnapscoutSmall from "@/public-assets/snapscout-small.svg";
import { inter } from "@/app/ui/fonts";

const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/canvass", label: "Canvass", icon: ClipboardList },
    { href: "/carts", label: "Carts", icon: ShoppingCart },
    { href: "/orders", label: "Orders", icon: ClipboardList },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/maps", label: "Maps", icon: Map },
];

export default function DashboardMobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Fixed top bar */}
            <div className={`${inter.className} fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#F1F5F9] shadow-md lg:hidden`}>
                <div className="flex items-center gap-2">
                    <Image src={SnapscoutSmall} alt="snapscout logo" width={28} height={28} />
                    <Link href="/" className="text-[#030538] text-lg font-semibold">
                        SnapScout
                    </Link>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                    className="p-1 text-[#030538]"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Slide-out drawer */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <div className="flex items-center gap-2">
                        <Image src={SnapscoutSmall} alt="snapscout logo" width={28} height={28} />
                        <span className="text-[#030538] text-lg font-semibold">SnapScout</span>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                        className="p-1 text-[#030538]"
                    >
                        <X size={22} />
                    </button>
                </div>
                <nav className="flex flex-col py-4">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-[#030538] hover:bg-[#F1F5F9] transition-colors"
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}
