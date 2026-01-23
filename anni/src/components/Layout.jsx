import React from 'react';
import { BgFrame } from '../asset/importImg';

export default function Layout({ children }) {
  return (
    <div className="Home-Container">
      <div className="page-wrapper">
        <img src={BgFrame} className="bg-frame" alt="bg frame" />
        {children}
      
      </div>
    </div>
  );
}
