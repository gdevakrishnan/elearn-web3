import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import appContext from '../context/appContext'

function Navbar() {
    const {
        getStateParameters,
        State
    } = useContext(appContext);
    const {
        WalletAddress
    } = State;

    return (
        <Fragment>
            <header className="navbar">
                <nav>
                    <ul>
                        <li title='Dashboard'>
                            <Link to={'/'}>
                                Dashboard
                            </Link>
                        </li>
                        <li title='Courses'>
                            <Link to={'/courses'}>
                                Courses
                            </Link>
                        </li>
                        <li title='New Course'>
                            <Link to={'/new-course'}>
                                New Course
                            </Link>
                        </li>
                        {(WalletAddress) ?
                            (<li title={WalletAddress}>
                                <Link>
                                    {WalletAddress.slice(0, 6)}...
                                </Link>
                            </li>) :
                        (<li title='New Course'>
                            <button onClick={(e) => {
                                e.preventDefault();
                                getStateParameters();
                            }}>Connect</button>
                        </li>)}
                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default Navbar