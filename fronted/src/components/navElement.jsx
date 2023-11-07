import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const PrimaryNav = styled.nav`
  z-index: 14;
  height: 70px;
  display: flex;
  background: #686966;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
`;

export const MenuLink = styled(Link)`
  color: #fff;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  padding: 0 1.2rem;
  height: 100%;
  font-size: 18px; /* Increase the font size */
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #d1d1d1;
  }

  &.active {
    color: #000;
    font-weight: bold;
  }
`;

export const Hamburger = styled(FaBars)`
  display: none;
  color: #ffffff;
  font-size: 1.9rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
