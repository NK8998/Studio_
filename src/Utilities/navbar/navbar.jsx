import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Burger } from "../../assets/leftnavelements";
import { CreateIcon, HelpIcon, SearchIcon } from "../../assets/navbarelements";
import "./css/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavigationBar } from "../../store/App-slice";

export const Navbar = ({}) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.auth.userData.currentChannelId);
  const [datalistDropdownOpen, setDataListDropdown] = useState(false);

  const inputRef = useRef();
  const toggleSearchDatalist = () => {
    setDataListDropdown((prevState) => !prevState);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className='navbar'>
      <div className='start'>
        <div className='burger' onClick={() => dispatch(toggleNavigationBar())}>
          <Burger />
        </div>
        <Link to={`/channel/${currentChannelId}`}>
          <img src='https://www.gstatic.com/youtube/img/creator/yt_studio_logo_white.svg' alt='studiologo' />
        </Link>
      </div>
      <div className='middle'>
        <div className={`wrapper ${datalistDropdownOpen ? "search-open" : ""}`}>
          <div className={`search-container `}>
            <div className='upper-section'>
              <SearchIcon />
              <input
                ref={inputRef}
                type='search'
                name='searchbar'
                placeholder='Search across your channel'
                onFocus={() => {
                  setDataListDropdown(true);
                }}
                onBlur={() => {
                  setDataListDropdown(false);
                }}
              />
            </div>
          </div>
          <div className='search-datalist'>
            <div className='upper-section'>
              <p>Your recent searches</p>
            </div>
            <div className='lower-section'></div>
          </div>
        </div>
      </div>
      <div className='end'>
        <div className='search-secondary' onClick={toggleSearchDatalist}>
          <SearchIcon />
        </div>
        <div className='help-icon'>
          <HelpIcon />
        </div>
        <div className='end-middle'>
          <CreateIcon />
          <p>CREATE</p>
        </div>
        <div className='pfpImg'>N</div>
      </div>
      <div
        className={`bgBlack  ${datalistDropdownOpen ? "search-open" : ""}`}
        onClick={() => {
          setDataListDropdown(false);
        }}
      ></div>
    </div>
  );
};
