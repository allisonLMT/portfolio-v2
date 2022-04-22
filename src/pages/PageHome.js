import React, { useState, useEffect } from 'react';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import Clipboard from 'react-clipboard.js';
import copy from '../images/icons/copy.svg';
import classes from 'classnames';
import styles from '../styles/pageHome.module.scss';
import NavMenu from '../components/NavMenu.js';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';



function PageHome() {

    const restPath = 'https://atredwell.com/wordpress-portfolio-v2/wp-json/wp/v2/pages/10?acf_format=standard';
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    const projectsPath = 'https://atredwell.com/wordpress-portfolio-v2/wp-json/wp/v2/portfolio-project?acf_format=standard';
    const [projectsData , setProjects] = useState([])
    const [projectsLoaded, setProjectsStatus] = useState(false)
    
    useEffect(() => {
        // Fetch all data (except portfolio)
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
        // Fetch Portfolio data
        const fetchProjects = async () => {
            const response = await fetch(projectsPath);
            if ( response.ok ) {
                const data = await response.json();
                 //splice to show most recent 2 projects
                const splicedData = data.splice(-2);
                setProjects(splicedData);
                setProjectsStatus(true);
            } else {
                setProjectsStatus(false);
            }

        }
        fetchProjects()
    }, [restPath, projectsPath])


    // Click to Copy
    const [isCopied, setCopiedStatus] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // allows scroll back to original position after being clicked
    function handleToggle() {
        window.scrollTo(0, scrollPosition);
        setCopiedStatus(true);
        //after 1.5 seconds, reset the status to false
        setTimeout(() => {
            setCopiedStatus(false);
        }, 1500);
        
    }


    
    if ( isLoaded && projectsLoaded ) {
        return(
            <div className='page-container' id='top'>
                <SkipNavLink />
                { (scrollPosition > 2700) ?
                    <NavMenu page={'contact'} key={scrollPosition}/> :
                    <NavMenu page={'home'} key={scrollPosition}/>
                }
                <SkipNavContent />
                <section className='content-wrap' >
                    <section className={styles.coverWrap} >
                        <section className={styles.left}>
                            <div className={styles.text}>
                                <p className={styles.firstLine}>hello, my name is...</p>
                                <h2 className={styles.name}>Allison Tredwell</h2>
                                <p>I'm a <strong>Front End Web Developer</strong> </p>
                                <p>based in Vancouver, BC.</p>
                            </div>
                        </section>
                        <section className={styles.right}>
                            <div className={classes(styles.imageWrap)}>
                                { restData.acf.cover_image.url &&
                                    <img src={restData.acf.cover_image.url} alt={restData.acf.cover_image.alt} />
                                }
                            </div>
                        </section>
                    </section>
                    {/* Intro */}
                    { ( restData.acf.intro && restData.acf.intro_content ) && 
                        <section className={styles.intro}>
                            <h1>{restData.acf.intro}</h1>
                                {restData.acf.intro_content.map((onePoint, i) => 
                                    <p key={i}>{onePoint.intro_point}</p>
                                )}
                            <Button url='about' btnText="Learn More" /> 
                        </section>
                    }
                    {/* Recent Projects */}
                    <section className={styles.projects}>
                        <h1>Recent Projects</h1>
                        <div className={styles.projectCards}>
                            {projectsData.map((eachProject, i) =>
                                <ProjectCard key={eachProject.id} project={projectsData[i]} />
                            )}
                        </div>
                        <Button url='portfolio' btnText="View All Projects"/>
                    </section>


                    {/* Contact */}
                    <section className={classes(styles.contactWrap)}  >
                        <h1>Contact</h1>
                        <h2>{restData.acf.contact_content[0].line}</h2>
                        <a href="mailto: allison.tredwell@gmail.com" className={classes(styles.smalltext, styles.accent)}>
                            <p>{restData.acf.contact_content[1].line}</p>
                            <p>{restData.acf.contact_content[2].line}</p>
                        </a>
                        <section  id='contact' className={styles.email} onClick={() => { handleToggle() }}>
                            <Clipboard data-clipboard-text="allison.tredwell@gmail.com" >
                                allison.tredwell@gmail.com
                                <img src={copy} alt="copy this email address" className={styles.copyEmail}/>
                            </Clipboard>
                        </section>
                        <p className={styles.popup}>{!isCopied ? "Copy Email" : "Copied!"}</p>
                    </section>
                </section>
               <Footer page='home' />
            </div>
        );
    }
    return <img src="../loading.gif" alt="Loading" className="loading" id="loading" />;
};
export default PageHome;