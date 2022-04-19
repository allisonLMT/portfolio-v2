import React, { useState, useEffect} from 'react';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import classes from 'classnames';
import Button from '../components/Button';
import NavMenu from '../components/NavMenu'
import Footer from '../components/Footer';
import styles from '../styles/pageAbout.module.scss';


function PageAbout() {

    const restPath = 'https://atredwell.com/wordpress-portfolio/wp-json/wp/v2/pages/11?acf_format=standard';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if ( response.ok ) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
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
                    <h1>{restData.title.rendered}</h1>
                    <div className={styles.aboutWrap}>
                        {restData.acf.image.url &&
                            <img src={restData.acf.image.url} alt={restData.acf.image.alt} className={classes(styles.fadeInColor)} />
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
                        <Button url='contact' btnText="Contact Me" />
                        </section>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
    return <img src="../loading.gif" alt="Loading" className="loading" id="loading" />
};

export default PageAbout;