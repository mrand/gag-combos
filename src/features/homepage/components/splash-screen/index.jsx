import styles from "./index.module.css";


export default function SplashScreen() {
  return (
    <section className={styles.splashScreen}>
      <div className={styles.gagImages}>
        <img 
          src="/img/home/splash-7.webp"
          alt="Splash Screen"
          width="3430" height="490"
        />
      </div>
      <div className={`wrapper ${styles.splashText}`}>
        <h2>Gag Combos Info</h2>
      </div>
    </section>
  );
}
