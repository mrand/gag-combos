import { FlexContainer } from "~/features/homepage";
import styles from "./index.module.css";


export default function About({ pageSize="mobile" }) {
  return (
    <section className={`${styles.about} ${pageSize==="desktop" ? styles.desktop : styles.mobile}`}>
      <FlexContainer
        content={
          <>
            <div className={`content-container ${styles.right}`}>
              <h2>Who am I?</h2>
              <p>
                I go by McNugget in Toontown.
              </p>
              <p> 
                I have been playing Toontown since its release in 2003 (I even remember watching the Toontown commercials on Disney Channel as a kid!).
                I've also followed Toontown Rewritten since its Alpha days, back when you needed to have a special key to play!
              </p>
              <p>
                As a web developer, I wanted to provide a useful tool for the TTR community,
                and I believe there is nothing better than helping toons defeat the cogs.
                This tool can help people new to the game get familiar with the basic combos,
                or seasoned toons to find new combos! 
              </p>
            </div>
            <div className={styles.left}>
              <img src="./img/home/mcnugget.webp" width="1000" height="600" alt="McNugget Portrait" />
            </div>
          </>
        }
        pageSize={pageSize}
        reverse={true}
      />
    </section>
  );
}
