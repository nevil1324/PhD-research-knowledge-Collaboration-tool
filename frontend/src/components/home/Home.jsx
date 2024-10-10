import React, { useState } from "react";
import './Home.css'
import { useNavigate } from 'react-router-dom';
import TextCycler from './TextCycler'

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput) {
      sessionStorage.setItem("searchKey", searchInput)
      navigate('/dashboard');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="home-div">
      <div className="text-div">
        <TextCycler />
      </div>
      <div className="search-div">
        <input
          type="text"
          id="search-input"
          value={searchInput}
          placeholder='Search for papers'
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <a><img className="bookmark_image" src="/icons/search.svg" alt="" onClick={handleSearch} /></a>
      </div>
    </div>
  )
}

export default Home;