import React from 'react';
import styles from '../styles/loadingDots.module.scss';

function LoadingDots({ loading }) {

    return (
        <div className={styles.dots}>
        <div className={loading ? styles.show : styles.hide}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        </div>
    )
}

export default LoadingDots;