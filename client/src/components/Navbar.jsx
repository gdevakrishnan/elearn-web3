import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import appContext from '../context/appContext'

function Navbar() {
    const { navState } = useContext(appContext);

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
                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default Navbar