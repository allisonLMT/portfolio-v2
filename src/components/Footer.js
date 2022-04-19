import React from 'react';
import styles from '../styles/footer.module.scss';
import linkedin from '../images/icons/linked-in-black.png';
import contact from '../images/icons/email-round.svg';
import github from '../images/icons/GitHub-Mark-32px.png';

function Footer() {

    return (
        <footer className={styles.footer} >
            <div className={styles.icons} >
                <a href="https://www.linkedin.com/in/allison-tredwell-06682b146/">
                    <img src={linkedin} alt="LinkedIn icon" />
                </a>
                <a href="/contact">
                    <img src={contact} alt="contact icon" />
                </a>
                <a href="https://github.com/allisonLMT">
                    <img src={github} alt="GitHub icon" />
                </a>
            </div>
            <small>&copy; 2022 Allison Tredwell</small>
        </footer>
    );
};

export default Footer;