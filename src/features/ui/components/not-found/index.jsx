import React from "react";
import { Link } from "react-router-dom";
import { Cog } from "~/features/core";
import styles from "./index.module.css";


function generateCogsList() {
  let cogsList = [];
  
  let level = Math.floor(Math.random() * 12) + 1;
  const primerCog = new Cog(level);
  cogsList.push(primerCog);

  for (let i=0; i<3; i++) {
    level = Math.floor(Math.random() * 12) + 1;
    cogsList.push(new Cog(level, false, false, primerCog.suit));
  }
  
  return cogsList;
}


function CogGrid() {
  const cogsList = generateCogsList();

  return (
    <div className={styles.cogGrid}>
      {
        cogsList.map((cog, i) => {
          return <img key={i} src={cog.image} alt={cog.name} />
        })
      }
    </div>
  );
}


export default function NotFound() {
  return (
    <article className={styles.notFound}>
      <div className="wrapper">
        <h1 className="standard-heading">(404) Page Not Found!</h1>
        <div className={`formatted-article ${styles.notFoundArticle}`}>
          <section>
            <h2>Looks like the cogs have taken over this page!</h2>
            <p>
              While we investigate, you should head back to 
              the <Link to="/">Homepage</Link>.
            </p>
          </section>
          <CogGrid />
          <section>
            <h2>Note:</h2>
            <p>
              If you are trying to reach a certain link, the footer below lists all pages on Gag Combos Info!
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}