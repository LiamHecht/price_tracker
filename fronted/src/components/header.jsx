import React from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger } from './navElement'
const Navbar = () => {
  return (
    <>
      <PrimaryNav>
        <Hamburger />
        <Menu>
          <MenuLink to="/home" activeStyle>
            Home
          </MenuLink>
          <MenuLink to="/about" activeStyle>
            About
          </MenuLink>
          <MenuLink to="/products" activeStyle>
            Products
          </MenuLink>

        </Menu>
      </PrimaryNav>
    </>
  )
}
export default Navbar