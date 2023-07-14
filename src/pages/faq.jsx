import React from 'react';
import Header from '~/features/ui/header';
import Footer from '~/features/ui/footer';

export default function FAQ() {
  return (
    <div id='page' className='faq custom-scrollbar with-grid-bg'>
      <Header />

      <article id="faq-entries">
        <div className='wrapper'>
          <h2 className='standard-heading'>FAQ</h2>
          <div className='formatted-article'>
            <section>
              <h3>What is Toontown?</h3>
              <p>
                Toontown Online was an MMORPG, initially developed by Disney and Schell Games in 2003.
                After Disney shut down Toontown in 2013, various fan-made, free-to-use revivals of the game eventually popped up.
              </p>
              <p>
                One of the most popular of these revival servers is Toontown Rewritten, which began development only months after Toontown Online shut down, and strives to be as close to the original Toontown as possible.
              </p>
            </section>
            <section>
              <h3>What does this website do for Toontown?</h3>
              <p>
                Toontown players play as "Toons", and engage in turn-based battles with enemies known as "Cogs".
                In these battles, Toons attempt to defeat Cogs using combinations of "gags". The cog deals damage to the players each round until it is defeated, or until the players' toons "go sad".
              </p>
              <p>
                This website's "Calculator" page lets you select any combination of gags and shows you which cogs it will defeat.
              </p>
              <p>
                This website's "Recommendations" page finds the optimal combinations of gags that can defeat a cog in one round, based on a number of different factors that you input.
              </p>
            </section>
            <section>
              <h3>How do I use this website's Calculator Page?</h3>
              <ul>
                <li>Select gags for your combo from the Gags Picker.</li>
                <li>Use the organic toggle if you want to choose organic gags.</li>
                <li>Use the v2.0 toggle to toggle whether your cog is v2.0.</li>
                <li>The Calculator page will calculate your combo's Total Damage, and indicate which level cogs it will defeat.</li>
                <li>Clear your choices one-by-one by clicking the red "X" on your chosen gags, or clear them all at once by clicking "Reset Gags".</li>
              </ul>
            </section>
            <section>
              <h3>How do I use this website's Recommendations Page?</h3>
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
              <h3>How is each Combo's probability calculated on the Recommendations Page?</h3>
              <p>
                In Toontown Rewritten, the probability that a gag hits a
                cog is called <code>atkAcc</code>, or attack accuracy, 
                and is defined as <code>
                  atkAcc = propAcc + trackExp + tgtDef + bonus
                </code>.
                You can <a 
                  className='no-style' 
                  href="https://github.com/QED1224/Toontown-Resources/blob/master/README.md#toon-atk-acc"
                  target="_blank" rel="noopener noreferrer"
                >
                  read about the specifics of this equation here
                </a>.
              </p>
              <p>
                Gag Combos Info (in its current state) must make some assumptions in this equation for each gag in a recommended gag combo 
                in order to get the probability of the entire combo. Those assumptions are as follows:
              </p>
              <ul>
                <li>
                  <p>
                    <code>propAcc</code> for Lure gags is assumed to be at its level 5 gag ($10 Bill) value.
                    Lure gags have an accuracy range of 50% to 95%,
                    and although recommending the level 7 Presentation gag would yield the highest accuracy,
                    it is not usually a feasible option in-game, mostly being reserved for special cases.
                    Hypno Goggles (level 6) and $10 Bill (level 5) have the next best accuracy, 70% normally and 80% for organic.
                    Therefore, $10 Bill is used, yielding a 70% to 80% base Lure accuracy in all Lure combos. 
                  </p>
                </li>
                <li>
                  <p>
                    <code>trackExp</code> is assumed to be at its maximum value of 60.
                  </p>
                  <p>
                    Although this assumption inflates the probabilities of low-level gag combos,
                    it gives more accurate probabilities relating to end-game scenarios 
                    where high-level gag combos may utilize low-level gags.
                  </p>
                </li>
                <li>
                  <p>
                    <code>tgtDef</code> is capped at its level 12 value for level 13+ cogs.
                  </p>
                  <p>
                    Toontown Rewritten support confirmed via email on 2023/07/10 that level 13+ tgtDef values
                    are being kept secret to keep the mystery in Field Offices (the only in-game area containing level 13+ cogs).
                    They also warned that these values are occasionally tweaked and subject to change,
                    and that anyone claiming to know these values may be incorrect. Thus, Gag Combos Info 
                    disregards hearsay that level 20 tgtDef is -65, instead opting to cap tgtDef at -55 for all 13+ cogs until further notice.
                  </p>
                </li>
                <li>
                  <p>
                    <code>prevHits</code> assumes all previous gags in the combo have hit.
                    This is a necessary assumption to the probability that the entire combo is successful.
                  </p>
                </li>
                <li>
                  <p>
                    <code>luredRatio</code> assumes that there is exactly 1 cog in the battle.
                    This is because the recommendations page recommends combos for a single cog. 
                  </p>
                </li>
              </ul>
              <p>
              </p>
              <p>
                After obtaining each gag's probability, Gag Combos Info multiplies the gag probabilities together,
                using only the maximum gag probability from groups of gags in the same track.
                Lastly, this number is rounded to 1 decimal place.
              </p>
            </section>
            <section>
              <h3>Does this Tool Work for Toontown: Coporate Clash?</h3>
              <p>
                At this time, Gag Combos Info does NOT provide info about Corporate Clash, or any other Toontown servers.
                However, this website is very early in its development, and we do have plans to support CC in the future!
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
