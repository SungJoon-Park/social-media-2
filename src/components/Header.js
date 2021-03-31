import React from 'react';
// import publicUrl from 'utils/publicUrl';
import css from './Header.module.css';
function Header() {
  return (
    <header className={css.header}>
        <div>
          <button>
            <img src="https://cdn.glitch.com/f70d577d-f905-45ee-bb92-042bfa767970%2Fcamera.svg?v=1614382899995" alt="camera"/>
          </button>
        </div>
        <div>
          <img src="https://cdn.glitch.com/f70d577d-f905-45ee-bb92-042bfa767970%2Flogo.png?v=1614382900226" alt="logo"/>
        </div>
        <div>
          <button>
          <img src="https://cdn.glitch.com/f70d577d-f905-45ee-bb92-042bfa767970%2Fmessage.svg?v=1614382900322" alt="message"/>
          </button>
        </div>
        
    </header>
  );
}

export default Header;
