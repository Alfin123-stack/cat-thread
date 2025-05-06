import React from 'react';
import { AiOutlineHome } from 'react-icons/ai'; // Ikon Home
import { GiPodium } from 'react-icons/gi'; // Ikon Leaderboard
import { HiOutlineUser, HiOutlinePlus } from 'react-icons/hi'; // Ikon Profile and Create Thread
import Logo from './Logo';
import LinkButton from './LinkButton';
import LogoutButton from './LogoutButton';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white h-screen flex flex-col justify-between items-start py-6 px-4 shadow-lg z-50 w-[250px]">
      <section className="flex flex-col space-y-20 mt-4">
        {/* Logo */}
        <Logo />

        {/* Menu Links */}
        <div className="space-y-6">
          <LinkButton to="/" icon={AiOutlineHome} text="Home" />
          <LinkButton to="/leaderboard" icon={GiPodium} text="Leaderboard" />
          <LinkButton to="/profile" icon={HiOutlineUser} text="Profile" />
          {/* New Create Thread Link */}
          <LinkButton
            to="/create-thread"
            icon={HiOutlinePlus}
            text="Create Thread"
          />
        </div>
      </section>

      {/* Logout Button */}
      <LogoutButton />
    </nav>
  );
}

export default Navbar;
