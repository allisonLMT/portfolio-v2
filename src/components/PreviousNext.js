import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/previousNext.module.scss';
import arrowRight from '../images/icons/arrow-right.svg';
import arrowLeft from '../images/icons/arrow-left.svg';

function PreviousNext( { prevID, prevLabel, nextID, nextLabel } ) {

    return (
        <nav className={styles.pageNav}>
            <div className={styles.previous}>
                <Link to={`/project/${prevID}`}>
                    <img src={arrowLeft} alt="previous project" /> {prevLabel}
                </Link>
            </div>
            <div className={styles.next}>
                <Link to={`/project/${nextID}`}>
                    {nextLabel} <img src={arrowRight} alt="next project" />
                </Link>
            </div>
        </nav>
    )
}

export default PreviousNext;