import React, { useState, Fragment } from 'react';
import classes from 'classnames';
import Highlight from 'react-highlight';
import styles from '../styles/accordion.module.scss';
import {ReactComponent as ArrowUp} from '../images/icons/arrow-up.svg';
import {ReactComponent as ArrowDown} from '../images/icons/arrow-down.svg';


function Accordion({ section, project }) {

    const [ isOpen, setIsOpen ] = useState(false);

    // toggle the state of the accordion, triggered onClick
    function handleToggle() {
        setIsOpen(!isOpen);
    };

    let header = project.acf[section+"_header"];
    let content = project.acf[section+"_content"];

    return (
        <>
            {/* only render an accordion if content exists */}
            {content &&
            <section className={styles.accordionSection}>
                <div className={classes(styles.accordionHeader, (isOpen && styles.headerActive))}
                    onClick={() => { handleToggle() } }>
                    <h2>{header}</h2>
                    { isOpen ? <ArrowUp /> : <ArrowDown /> }
                </div>
                <div className={ classes( styles.accordionContent, { [styles.open] : isOpen} ) }>
                    { Array.isArray(project.acf[section+"_content"]) &&
                        <section>
                        {content.map((oneRow, i) => 
                            <section key={i}>
                            { oneRow.development_sub_header && 
                            // sub-header (only in Dev) 
                            <h3>{oneRow.development_sub_header}</h3>
                            }
                            <ul>
                                <li>
                                    {/* accordion content */}
                                    {oneRow.content} 
                                    {/* code snippet (only in Dev) */}
                                    { oneRow.code_snippet &&
                                        <Highlight className="hljs" key={i}>
                                            {oneRow.code_snippet}
                                        </Highlight>}
                                    {/* content image */}
                                    {oneRow.image &&
                                        <img src={oneRow.image.url} alt={oneRow.image.alt} />
                                    }
                                </li>
                            </ul>
                            </section>
                        )}
                        </section>
                    }
                </div> 
            </section>
            }
        </>
    )
};

export default Accordion;