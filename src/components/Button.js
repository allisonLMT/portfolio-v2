import React from 'react';
import styles from '../styles/button.module.scss';

function Button({ url, btnText }) {

    return (
        <div className={styles.button}>
            <a href={ url }>{ btnText }</a>
        </div>
    )
};

export default Button;