import './InfoCard.css';

export default function InfoCard() {
  return (
    <div id="info">
      <h2>Information</h2>
      <article>
        <section>
          <h3>Welcome!</h3>
          <p>
            Welcome to GagCombos.Info, your new go-to dashboard
            for finding the perfect combinations of gags to defeat the cogs! 
          </p>
        </section>
        <section>
          <h3>How To Use</h3>
          <ul>
            <li>
              Configure the number of toons and their organic gags using the "Toons" section.
            </li>
            <li>
              Use the "Cog" section to set the cog level and whether or not it is currently lured.
            </li>
            <li>
              The "Combos" section will display the gag combos that will defeat your cog!
            </li>
            <li>
              You can use the combos section filters to display only certain types of combos
              or to filter out gag tracks you don't want to use.
            </li>
          </ul>
        </section>
        <section>
          <h3>Note</h3>
          <p>
            This utility is only for <b>Toontown Rewritten</b>!
          </p>
        </section>
        <section>
          <h3>Who am I?</h3>
          <p>
            I go by McNugget in Toontown.
          </p>
          <img src='./img/mcnugget.webp' width='1000' height='600' alt='McNugget Portrait' />
          <p> 
            I have been playing Toontown since its release in 2003 (I even remember watching the Toontown commercials on Disney Channel as a kid!).
            I've also played Toontown Rewritten since its Alpha days, back when you needed a key to wait in line to play!
          </p>
          <p>
            As a web developer, I wanted to provide a useful tool for the TTR community,
            and I believe there is nothing better than helping toons defeat the cogs.
            This tool can help people new to the game get familiar with the basic combos,
            or seasoned toons to find new combos! 
          </p>
        </section>
        <section>
          <h3>Other Resources</h3>
          <p>
            Here are links to other great projects I found while developing this one:            
          </p>
          <a href='https://zzzachzzz.github.io/toontown-combos/' target='_blank' rel='noopener noreferrer'>
            TTO/TTR Gag Combos - Sound/Throw/Squirt/Drop
          </a>
          <a href='https://www.ethanyhong.me/ttcalc/' target='_blank' rel='noopener noreferrer'>
            Toontown Calculator
          </a>
          <em>
            * Note: I am not sure if these resources are up to date with current TTR gag damage values.
          </em>
        </section>
        
      </article>
    </div>
  );
}