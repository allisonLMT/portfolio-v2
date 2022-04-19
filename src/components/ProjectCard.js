import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/projectCard.module.scss';
import Button from '../components/Button';

function ProjectCard({ project }) {

    return (
        <article key={project.id} className={styles.card}>
            <Link to={`/project/${project.id}`} className={styles.projectImage} >
                <img src={project.acf.cover_image.url} alt={project.acf.cover_image.alt} />
            </Link>
            <section className={styles.projectInfo}>
                <h2>{project.title.rendered}</h2>
                <p>{project.acf.one_liner}</p>
                <Button url={`/project/${project.id}`} btnText="Learn More" />
            </section>
        </article>
    );
};

export default ProjectCard;