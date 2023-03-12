import React from 'react'
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from '../components';


const NavBar = () => {
  const { totalQuantities, showCart, setShowCart } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">TheJEED Headphones</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart ? <Cart /> : null}
    </div>
  )
}

export default NavBar