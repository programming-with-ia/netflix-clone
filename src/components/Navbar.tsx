"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { BsSearch, BsBell } from "react-icons/bs";
import { AiFillCaretDown, AiOutlineMenu, AiOutlineX } from "react-icons/ai";

import useMediaQuery from "@/hooks/useMediaQuery";
import useMobileMenuModal from "@/hooks/useMobileMenuModal";

import NavbarItem from "@/components/NavbarItem";
import AccountMenu from "@/components/AccountMenu";
import { appendMovies } from "@/actions/appendMovies";
import { IoMdClose } from "react-icons/io";

const TOP_OFFSET = 66;

const Navbar = () => {
  const isLargeScreens = useMediaQuery("(max-width: 1023px)");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { onOpen, isOpen: isMenuOpen } = useMobileMenuModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openMobileMenu = () => {
    onOpen();
  };

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-50">
      <div
        className={`relative transition duration-500 ${
          showBackground
            ? "bg-zinc-900/80 backdrop-blur-sm backdrop-brightness-110 drop-shadow-sm shadow-md"
            : ""
        } h-28 md:h-auto`}
      >
        <div className="px-4 md:px-10 py-4 flex flex-row items-center">
          {/* Smaller Screens */}
          <div
            onClick={openMobileMenu}
            aria-label="menu"
            title="menu"
            className="lg:hidden flex flex-row gap-2 cursor-pointer pr-2 md:pr-4"
          >
            <p className="text-base drop-shadow-2xl sr-only">Discover</p>
            <div className="flex items-center">
              {isMenuOpen ? (
                <IoMdClose className="z-[51]" size={25} />
              ) : (
                <AiOutlineMenu
                  size={25}
                  className="transition-opacity duration-300 hover:opacity-80"
                />
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <Image
              className="object-contain h-10 w-auto"
              src={"/images/logo-letter.png"}
              alt="logo"
              height={50}
              width={50}
              quality={100}
            />
          </div>
          <div className="hidden md:flex">
            <Image
              className="object-contain w-[50px] md:w-[100px] h-auto"
              src={"/images/logo.png"}
              alt="logo"
              height={100}
              width={100}
              quality={100}
            />
          </div>

          {/* Larger Screens */}
          <div className="lg:flex hidden flex-row ml-8 gap-7">
            <NavbarItem label="Home" />
            <NavbarItem label="TV Series" />
            <NavbarItem label="Movies" />
            <NavbarItem label="New & Popular" />
            <NavbarItem label="My List" />
            {/* <button disabled={Loading || undefined} onClick={async ()=> {
              setLoading(true)
              await appendMovies()
              setLoading(false)
            }}>
              {Loading ? "loading": "Put"}
            </button> */}
          </div>

          {/* End of Navbar */}
          <div className="flex flex-row ml-auto gap-7 items-center">
            <div className="text-gray-200 hover:opacity-70 cursor-pointer transition">
              <BsSearch />
            </div>
            <div className="text-gray-200 hover:opacity-70 cursor-pointer transition">
              <BsBell />
            </div>
            <div
              onClick={toggleAccountMenu}
              className="flex flex-row items-center gap-2 cursor-pointer relative"
            >
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <Image
                  src={"/images/avatar-slate.png"}
                  alt="Profile"
                  height={500}
                  width={500}
                />
              </div>
              <AiFillCaretDown
                size={isLargeScreens ? 15 : 20}
                className={`transition ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
              <AccountMenu visible={showAccountMenu} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
