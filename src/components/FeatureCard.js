import React from 'react';
import styles from '../styles/featureCard.module.scss';


function FeatureCard ({ feature }) {
    //displays project feature image on mobile, and video on tablet/desktop sizes
    return (
        <section className={styles.featureCard}>
            <div className={styles.featureLeft}>
                {feature.feature_title && <h4>{feature.feature_title}</h4>}
                {feature.feature_image && 
                    <img src={feature.feature_image.url} alt={feature.feature_image.alt} className={styles.featureImage} />
                }
                {feature.feature_media &&
                    <video src={feature.feature_media} autoPlay="autoplay" muted loop className={styles.featureVideo}>
                        Your browser does not support the video tag.
                    </video>
                }
            </div>
            {feature.feature_content && <p className={styles.featureContent}>{feature.feature_content}</p>}
        </section>
    )
}

export default FeatureCard;