import React, { useState, useEffect} from 'react';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import classes from 'classnames';
import NavMenu from '../components/NavMenu'
import Footer from '../components/Footer';
import styles from '../styles/pageAbout.module.scss';
import LoadingDots from '../components/LoadingDots.js';


function PageAbout() {

    window.scrollTo(0, 0);

    const restPath = 'https://atredwell.com/wordpress-portfolio-v2/wp-json/wp/v2/pages/10?acf_format=standard';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if ( response.ok ) {
                const data = await response.json();
                setData(data);
                setLoadStatus(false);
            } else {
                setLoadStatus(false);
            };
        };
        fetchData();
    }, [restPath] );


    if ( isLoaded ) {
        return(
            <div className='page-container' >
                <SkipNavLink />
                <NavMenu page={'about'} />
                <SkipNavContent />
                <section className='content-wrap' >
                    <h1>About</h1>
                    <div className={styles.aboutWrap}>
                        {restData.acf.cover_image.url &&
                            <img src={restData.acf.cover_image.url} alt={restData.acf.cover_image.alt} className={classes(styles.fadeInColor)} />
                        }
                        <section className={styles.aboutText}>
                            {/* Intro */}
                            { ( restData.acf.intro && restData.acf.intro_content ) && 
                                <section>
                                    <h2>{restData.acf.intro}</h2>
                                        {restData.acf.intro_content.map((onePoint, i) => 
                                            <p key={i}>{onePoint.intro_point}</p>
                                        )}
                                </section>
                            }
                            {/* Education */}
                            { (restData.acf.education && restData.acf.education_content ) && 
                                <section>
                                    <h2>{restData.acf.education}</h2>
                                    <ul>
                                        {restData.acf.education_content.map((school, i) => 
                                            <li key={i}>{school.education}</li>
                                        )}
                                    </ul>
                                </section>
                            }
                            {/* Languages & Tools */}
                            { (restData.acf.languages_tools && restData.acf.languages_tools_content) && 
                                <section>
                                    <h2>{restData.acf.languages_tools}</h2>
                                    <ul>
                                        {restData.acf.languages_tools_content.map((tool, i) => 
                                            <li key={i}>{tool.languages_tools}</li>
                                        )}
                                    </ul>
                                </section>
                            }
                            
                        {/* <Button url='contact' btnText="Contact Me" /> */}
                        </section>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
    //return <img src="../loading.gif" alt="Loading" className="loading" id="loading" />
    return <LoadingDots />;
};

export default PageAbout;