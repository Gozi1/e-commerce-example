import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping,AiOutlineLogin,AiOutlineLogout } from 'react-icons/ai'
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { CgProfile } from 'react-icons/cg'
const Navbar = () => {
  const { showCart,setShowCart,totalQuantities,user,logout} = useStateContext(); 
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(3);
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Sam's Sportwear</Link>
      </p>
      
      <p {...buttonProps} type='button' id='menu-button'>
				<CgProfile className="cart-icon"/>
			</p>

			<div className={isOpen ? 'visible' : ''} role='menu' id='menu'>
				{!user&& <Link {...itemProps[0]} href={`/Login`} id='menu-item-1'>
					Login / Sign Up
				</Link>}

				{user && <a {...itemProps[1]}  id='menu-item-2'>
					{user.email}
				</a>}

				{user && <a {...itemProps[2]} onClick={() => logout()} id='menu-item-3'>
					Log Out
				</a>}
			</div>
       

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart&& <Cart/>}
    </div>
  )
}

export default Navbar