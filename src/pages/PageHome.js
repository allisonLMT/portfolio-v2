import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import classes from 'classnames';
import styles from '../styles/pageHome.module.scss';
import NavMenu from '../components/NavMenu.js';



function PageHome() {

    window.scrollTo(0, 0);

    const restPath = 'https://atredwell.com/wordpress-portfolio/wp-json/wp/v2/pages/11?acf_format=standard';
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if ( response.ok ) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        }
        fetchData()
    }, [restPath])

    
    if ( isLoaded ) {
        return(
            <div className='page-container' >
                <SkipNavLink />
                <NavMenu page={'home'}/>
                <SkipNavContent />
                <section className='content-wrap' >
                    <section className={styles.left}>
                        <div className={styles.text}>
                            <p className={styles.firstLine}>hello, my name is...</p>
                            <h2>Allison Tredwell</h2>
                            <p>I'm a <strong>Front End Web Developer</strong> </p>
                            <p>based in Vancouver, BC.</p>
                        </div>
                        
                    </section>
                    <section className={styles.right}>
                        <div className={classes(styles.imageWrap, styles.overlay)}>
                            <img src={restData.acf.image.url} alt={restData.acf.image.alt} />
                        </div>
                    </section>
                    
                </section>
               
            </div>
        );
    }
    return <img src="../loading.gif" alt="Loading" className="loading" id="loading" />;
};
export default PageHome;