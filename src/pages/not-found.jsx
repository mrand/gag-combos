import React from "react";
import { Link } from "react-router-dom";
import './not-found.css';
import Header from "~/features/ui/header";
import Footer from "~/features/ui/footer";
import { Cog } from "~/features/cog";


function generateCogsList() {
  let cogsList = [];
  
  let level = Math.floor(Math.random() * 12) + 1;
  const primerCog = new Cog(level);
  cogsList.push(primerCog);

  for (let i=0; i<3; i++) {
    level = Math.floor(Math.random() * 12) + 1;
    cogsList.push(new Cog(level, false, primerCog.suit));
  }
  
  return cogsList;
}


export default function NotFound() {
  const cogsList = generateCogsList();

  return (
    <div id="page" className="not-found">
      <Header />
      
      <article className="with-grid-bg">
        <div className="wrapper">
        <h2 className='standard-heading'>(404) Page Not Found!</h2>
          <div className="formatted-article">
            <section>
              <h3>Looks like the cogs have taken over this page!</h3>
              <p>
                While we investigate, you should head back to the <Link to="/">Homepage</Link>.
              </p>
            </section>
            <section className="cog-grid">
              {
                cogsList.map((cog, i) => {
                  return <img key={i} src={cog.image} alt={cog.name} />
                })
              }
            </section>
            <section>
              <h3>Note:</h3>
              <p>
                If you are trying to reach a certain link, the footer below lists all pages on Gag Combos Info!
              </p>
            </section>
          </div>

        </div>
      </article>

      <Footer />
    </div>
  );
}
