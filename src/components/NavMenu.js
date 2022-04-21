import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
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
                <HashLink to='/#top' className={styles.siteTitle} onClick={() => { setIsOpen(false) } }>Allison Tredwell</HashLink>
                <div className={ classes( styles.navBurger, { [styles.open] : isOpen } ) } 
                    onClick={() => { handleToggle() } }>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> 
                <nav className={styles.desktopNav}>
                    <HashLink to='/#top' className = { (page === 'home') ? styles.active : styles.inactive } >home</HashLink>
                    <NavLink to='/about' className = { (page === 'about') ? styles.active : styles.inactive }>about</NavLink>
                    <NavLink to='/portfolio' className = { (page === 'portfolio') ? styles.active : styles.inactive }>portfolio</NavLink>
                    <HashLink to='/#contact' className = { (page === 'contact') ? styles.active : styles.inactive } >contact</HashLink>
                </nav>
            </div>
            <nav className={ classes( styles.navMenu, { [styles.open] : isOpen }) }>
                <HashLink to='/#top'>home</HashLink>
                <NavLink to='/about'>about</NavLink>
                <NavLink to='/portfolio' >portfolio</NavLink>
                <HashLink to='/#contact' >contact</HashLink>
            </nav>
        </>  
    );
};

export default NavMenu;