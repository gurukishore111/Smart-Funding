import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { github, logo, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && 'bg-[#2c2f32]'
      } flex justify-center items-center ${
        !disabled && 'cursor-pointer'
      } ${styles}`}
      onClick={handleClick}
    >
      {isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
        />
      )}
    </div>
  );
};

function SideBar() {
  const navigate = useNavigate();
  const [activeNavbar, setActiveNavbar] = useState('dashboard');
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((navItem) => (
            <Icon
              name={navItem.name}
              isActive={activeNavbar}
              key={navItem.name}
              {...navItem}
              handleClick={() => {
                if (!navItem.disabled) {
                  setActiveNavbar(navItem.name);
                  navigate(navItem.link);
                }
              }}
            />
          ))}
        </div>
        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={github}
          handleClick={() =>
            window.open(
              'https://github.com/gurukishore111/Smart-Funding',
              '_blank'
            )
          }
        />
      </div>
    </div>
  );
}

export default SideBar;
