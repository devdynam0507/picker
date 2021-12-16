import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <main>
      <ul>
        <li>
          <Link to='/kr'>한식</Link>
        </li>
        <li>
          <Link to='/jp'>일식</Link>
        </li>
        <li>
          <Link to='/cn'>중식</Link>
        </li>
        <li>
          <Link to='/meat'>고기</Link>
        </li>
        <li>
          <Link to='/chicken'>치킨</Link>
        </li>
        <li>
          <Link to='/ramen'>라면</Link>
        </li>
        <li>
          <Link to='/snack'>분식/야식, 디저트</Link>
        </li>
        <li>
          <Link to='/etc'>기타</Link>
        </li>
      </ul>
    </main>
  );
};

export default Home;
