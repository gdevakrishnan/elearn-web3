import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import appContext from '../context/appContext';
import { GrClose } from "react-icons/gr";
import { FaBarsStaggered } from "react-icons/fa6";

function Navbar() {
    const { getStateParameters, State } = useContext(appContext);
    const { WalletAddress, isAdmin } = State;
    const [menuBtn, setMenuBtn] = useState(false); // State for menu button toggle

    const toggleMenu = () => {
        setMenuBtn(!menuBtn);
    };

    return (
        <Fragment>
            <header className="navbar">
                <nav>
                    <Link to='/' className='logo'>E-Learn</Link>
                    <input type="checkbox" id="check" checked={menuBtn} onChange={toggleMenu} />
                    <label htmlFor='check' className="checkbtn">
                        {
                            menuBtn ? <GrClose className='menu_btn'/> : <FaBarsStaggered className='menu_btn' />
                        }
                    </label>

                    <ul className={menuBtn ? "nav-menu active" : "nav-menu"}>
                        <li title='Dashboard'>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li title='Courses'>
                            <Link to={'/courses'}>
                                Courses
                            </Link>
                        </li>
                        {isAdmin && (
                            <li title='New Course'>
                                <Link to={'/new-course'}>
                                    New Course
                                </Link>
                            </li>
                        )}
                        {WalletAddress ?
                            (<li title={WalletAddress}>
                                <Link to={'/profile'}>
                                    {WalletAddress.slice(0, 5)}...{WalletAddress.slice(-6, -1)}
                                </Link>
                            </li>) :
                            (<li title='Connect Wallet'>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    getStateParameters();
                                }} className='btn'>Connect</button>
                            </li>)}
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
}

export default Navbar;
