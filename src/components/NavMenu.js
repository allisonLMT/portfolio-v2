import React, { useState, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../styles/navMenu.module.scss';
import classes from 'classnames';

function NavMenu( {page} ) {

    const [ isOpen, setIsOpen ] = useState(false);
    
    // toggles the state on the navBurger, triggered onclick
    function handleToggle() {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={styles.navBar}>
                <Link to='/' className={styles.siteTitle} onClick={() => { setIsOpen(false) } }>Allison Tredwell</Link>
                <div className={ classes( styles.navBurger, { [styles.open] : isOpen } ) } 
                    onClick={() => { handleToggle() } }>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> 
                <nav className={styles.desktopNav}>
                    <NavLink to="/" className = { (page === 'home') ? styles.active : styles.inactive } >home</NavLink>
                    <NavLink to='/about' className = { (page === 'about') ? styles.active : styles.inactive }>about</NavLink>
                    <NavLink to='/portfolio' className = { (page === 'portfolio') ? styles.active : styles.inactive }>portfolio</NavLink>
                    <NavLink to='/contact' className = { (page === 'contact') ? styles.active : styles.inactive } >contact</NavLink>
                </nav>
            </div>
            <nav className={ classes( styles.navMenu, { [styles.open] : isOpen }) }>
                <NavLink to='/'>home</NavLink>
                <NavLink to='/about'>about</NavLink>
                <NavLink to='/portfolio' >portfolio</NavLink>
                <NavLink to='/contact' >contact</NavLink>
            </nav>
        </>  
    );
};

export default NavMenu;