import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import styles from '../styles/pageProject.module.scss';
import NavMenu from '../components/NavMenu';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import Accordion from '../components/Accordion';
import PreviousNext from '../components/PreviousNext';
import Footer from '../components/Footer';


function PageProject( ) {

    window.scrollTo(0, 0);

    const { id } = useParams();

    const restPath = 'https://atredwell.com/wordpress-portfolio/wp-json/wp/v2/portfolio-project?acf_format=standard'; 
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
    }, [restPath]);
    
    if ( isLoaded ) {

        var currentProjObj;
        var currentProjIndex;
        var prevID;
        var nextID;
        var prevLabel = 'previous';
        var nextLabel = 'next';

        function findProject() {
            //findProject finds the current project in the array of all projects, and sets data for prev and next navigation component
            //find and set the current project data
            for (var i=0; i < restData.length; i++) {
                //id is a string, so the project ID also needs to be a string for comparison
                var projIDstr = restData[i].id.toString();
                if ( projIDstr === id ) {   
                    currentProjObj = restData[i];
                    currentProjIndex = i;
                };
            };
            //set the previous and next data, accounting for when the current project is the first or last in the list
            //if no custom label exists, then the default labels will apply
            if (currentProjIndex === 0) {
                prevID = restData[restData.length-1].id; 
                nextID = restData[1].id;
                restData[restData.length-1].acf.label && (prevLabel = restData[restData.length-1].acf.label);
                restData[1].acf.label && (nextLabel = restData[1].acf.label);
            } else if (currentProjIndex === (restData.length-1)) {
                nextID = restData[0].id;
                prevID = restData[currentProjIndex - 1].id;
                restData[0].acf.label && (nextLabel = restData[0].acf.label);
                restData[currentProjIndex - 1].acf.label && (prevLabel = restData[currentProjIndex - 1].acf.label);
            } else {
                prevID = restData[currentProjIndex - 1].id;
                nextID = restData[currentProjIndex + 1].id;
                restData[currentProjIndex - 1].acf.label && (prevLabel = restData[currentProjIndex - 1].acf.label);
                restData[currentProjIndex + 1].acf.label && (nextLabel = restData[currentProjIndex + 1].acf.label);
            };
        };

        findProject();

        return(
            <div className='page-container' >
                <SkipNavLink />
                <NavMenu />
                <SkipNavContent />
                <article className='content-wrap' >
                    <div className={styles.marginWrap}>
                        <h1>{currentProjObj.title.rendered}</h1>
                        <div className={styles.infoWrap}>
                            <img src={currentProjObj.acf.cover_image.url} alt={currentProjObj.acf.cover_image.alt} className={styles.projectCoverImage}/>
                            <section className={styles.projectInfo}>
                                { currentProjObj.acf.project_overview_content &&
                                // Overview
                                <section>
                                    <h2>Project Overview</h2>
                                    <p>{currentProjObj.acf.project_overview_content}</p>
                                </section>
                                }
                                {/* Role */}
                                { currentProjObj.acf.role_content &&
                                <section>
                                    <h3>Role</h3>
                                    <p>{currentProjObj.acf.role_content}</p>
                                </section>
                                }
                                {/* Languages and Tools */}
                                { currentProjObj.acf.languages_tools &&
                                <section>
                                    <h3>Languages &amp; Tools</h3>
                                    <ul>
                                        {currentProjObj.acf.languages_tools.map((oneRow, i) => 
                                            <li key={i}>{oneRow.tool}</li>
                                        )}
                                    </ul>
                                </section>
                                }
                                {/* Requirements */}
                                { currentProjObj.acf.requirements &&
                                    <section>
                                        <h3>Requirements</h3>
                                        <ul>
                                            {currentProjObj.acf.requirements.map((oneRow, i) => 
                                                <li key={i}>{oneRow.requirement}</li>
                                            )}
                                        </ul>
                                    </section>
                                }
                                {/* Portfolio ID is "45", don't render a link to project on Portfolio page */}
                                {(id !== "45") && <Button url={currentProjObj.acf.project_url} btnText="Live Project" />}
                            </section>
                        </div>
                    </div>  
                    {/* Features */}
                    { currentProjObj.acf.feature &&    
                        <section className={styles.marginWrap}>
                            <h2 className={styles.featureHeader}>Features</h2>
                            <section className={styles.features}>
                                {currentProjObj.acf.feature.map((oneRow, i) => 
                                    <FeatureCard key={i} feature={oneRow}/>
                                )}
                            </section>
                        </section>  
                    }
                    <section className={styles.accordions}>
                        <Accordion key={"process-"+id} section="process" project={currentProjObj}  />
                        <Accordion key={"design-"+id} section="design" project={currentProjObj}  />
                        <Accordion key={"dev-"+id} section="development" project={currentProjObj}  />
                        <Accordion key={"conclusion-"+id} section="conclusion" project={currentProjObj}  />
                    </section>
                    <PreviousNext prevID={prevID} prevLabel={prevLabel} nextID={nextID} nextLabel={nextLabel}/>
                </article> {/* end content-wrap */}
                
                <Footer />
            </div>
        ); // end return
    } //end if (isLoaded)
    return <img src="../loading.gif" alt="Loading" className="loading" id="loading" />
};

export default PageProject;