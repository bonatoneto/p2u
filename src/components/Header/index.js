"use client"
import "./Header.scss";
import { useState } from 'react';

import Link from 'next/link';
import { Domain, KeyboardArrowDown, PowerSettingsNew } from "@mui/icons-material";
import { destroyCookie } from 'nookies'
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { push } = useRouter();
  const { user } = useContext(AuthContext)
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDown = () => {
    setShowDropDown(!showDropDown);

    const menu = document.querySelector('.arrow')
    menu.classList.toggle('rotate')
  };

  const handleLogout = () => {
    destroyCookie(null, 'p2u-token', {
      path: '/'
    })
    push('/login/')
  }

  return (
    <div className="main-header">
      <div className="empresa">
        <img
          src="/images/logo.png"
          id="logo"
          alt="logo"
        />
      </div>
      <div className="perfil">
        <div className="group-users">
          <div className="flex-row">
            <div className="border-image"></div>
            <img src="/images/foto.png" className="foto" alt="Foto" />  
            <div className="administrador">
              Administrador
              <div className="name">
                {user?.name}
              </div>
            </div>
            <KeyboardArrowDown
              className="arrow"
              alt="Arrow"
              onClick={dropDown}
            />
          </div>
          <div className={showDropDown ? 'dropDown-menu view' : 'dropDown-menu hide'}>
            <ul>
              <li className="editprofile">
                <Link
                  href="/dashboard/profile"
                  id="edittext"
                  onClick={dropDown}
                >
                  <p>Editar Perfil</p>
                </Link>
              </li>
              <div className="linha"></div>
              <li>
                <div className="empresas">
                  <div className="icon-bg" >
                    <Domain className="enterprise" alt="Enterprise" />
                  </div>
                  <div className="dropdown-text">
                    <h1>5D Creative Design</h1>
                    <Link
                      href="/"
                      onClick={dropDown}>
                      <p>Acessar área de trabalho</p>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="empresas">
                  <div className="icon-bg2">
                    <Domain className="enterprise" alt="Enterprise" />
                  </div>
                  <div className="dropdown-text">
                    <h1>Simplifica</h1>
                    <Link href="/" onClick={dropDown}><p>Acessar área de trabalho</p></Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="sair">
          <PowerSettingsNew
            className="off"
            alt="Off"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Header