import React from 'react';
import styles from '../styles/loadingDots.module.scss';

function LoadingDots() {

    return (
        <div className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default LoadingDots;