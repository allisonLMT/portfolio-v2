import React from 'react';
import { Link } from 'react-router-dom';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import styles from '../styles/pageNotFound.module.scss';
import NavMenu from '../components/NavMenu.js';
import Footer from '../components/Footer.js';


function PageNotFound() {

    return (
        <div className='page-container' >
            <SkipNavLink />
            <NavMenu />
            <SkipNavContent />
            <section className='content-wrap' >
                <h1>Page Not Found</h1>
                <div className={styles.goHome}>
                    <p>The page you're looking for can't be found.</p>
                    <Link to='/'>Return to Home</Link>
                </div>
            </section>
            <Footer />
        </div>
    );

};

export default PageNotFound;