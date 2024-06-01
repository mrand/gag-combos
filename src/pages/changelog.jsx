import React from "react";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import { Link } from "react-router-dom";
import { Footer } from "~/features/ui";


export default function Changelog() {
  return (
    <PageWrap
      content={
        <>
          <Header />
          <main>
            <article>
              <div className="wrapper">
                <h2 className="standard-heading">Changelog</h2>
                <div className="formatted-article">

                  <section>
                    <h3>&#9888; In-Progress</h3>
                    <h4>Under New Management Update</h4>
                    <hr />
                    <h5 style={{color: "var(--green-500)"}}>Calculator Page is Fully Updated</h5>
                    <p style={{color: "var(--green-500)"}}>
                      UI tweaks are planned for the calculator page,
                      but since it currently only utilizes gag damage values and cog health values,
                      it is in-line with the UNM update.
                    </p>
                    <h5>Recommendations Page is Partly Updated</h5>
                    <p>
                      With Lure accuracy changes still in progress,
                      the output of the recommendations page has correct damages but incorrect accuracies.
                    </p>
                    <hr />
                    <h5>Detailed Changes</h5>
                    <ul>
                      <li>
                        <b style={{color: "var(--green-500)"}}>&#10003; Gag damage values</b> have been updated.
                      </li>
                      <li>
                        <div className="content-container" style={{ gap:"0.5rem" }}>
                          <p>
                            <b style={{color: "var(--green-500)"}}>&#10003; v2.0 Cogs</b> have been updated.
                          </p>
                          <ul>
                            <li>
                              The removal of the v2.0 cog defense attribute has been accounted for
                              (i.e. v2.0 cogs' outer shells no longer negate part of each gag's damage).
                            </li>
                            <li>
                              Since v2.0 cogs now attack if you only defeat their outer shell,
                              Gag Combos Info now checks if a combo defeats both their outer and inner shells
                              when considering if a combo has defeated a v2.0 cog.
                              These new calculations still take into account the fact that carryover damage is not a game mechanic
                              (i.e. extra damage on the outer shell is negated rather than applied to the inner shell).
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="content-container" style={{ gap:"0.5rem" }}>
                          <p>
                            <b style={{color: "var(--red-500)"}}>&#9888; Lure Accuracy</b> has not yet been updated,
                            so the recommendations page's accuracy values are not in-line with current gameplay.
                          </p>
                          <ul>
                            <li>
                              Under-the-hood calculations must first be updated with the new multi-lure mechanic.
                            </li>
                            <li>
                              Gag Combos Info must rework the way it chooses combo tracks on the recommendations page,
                              since multi-lure combos are now a viable option.
                            </li>
                            <li>
                              It is also planned to add a "Trapped" status effect toggle (since this affects Lure accuracy).
                              This requires some extra UI magic so the specific trap gag that is placed can be accounted for
                              in order to have the correct damage calculations in the recommendations output.
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <b style={{color: "var(--red-500)"}}>&#9888; UI Tweaks</b> surrounding these under-the-hood changes are at various stages of development.
                        We plan to rework some components so that they better communicate the underlying game mechanics.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3>2023-09-18</h3>
                    <h4>Site Refactoring</h4>
                    <ul>
                      <li>
                        Squashed a bug causing past users to be served an old version of Gag Combos Info indefinitely.
                      </li>
                      <li>
                        Under-the-hood changes and refactoring to increase performance 
                        and make the codebase easier to maintain and expand.
                      </li>
                      <li>
                        Change the way Gag Combos Info scales to fit on your screen. 
                        Previously, a single breakpoint between mobile and desktop was defined and used by all components.
                        Now, each component adjusts based on the size of its content,
                        and can accommodate more extreme font sizes.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3>2023-07-24</h3>
                    <h4>Added Accuracies to Combo Recommendations!</h4>
                    <ul>
                      <li>
                        Added accuracies to each recommended gag combo on the recommendations page!
                        Read more about the way this is calculated on 
                        the <Link to="/faq">FAQ page</Link>.
                      </li>
                      <li>
                        Added options to sort combo recommendations by 
                        "Accuracy", "Damage", "Accuracy+Damage", and "Damage+Accuracy".
                        These sorting options were separated out from the previous "Best" filter,
                        which used to sort its output by Combo Damage (before Combo Accuracy existed), 
                        and now no longer sorts its output by default. 
                        Thus, now you can filter combos by "All", "Basic", or "Best" (as before),
                        and decide exactly how you'd like the output of any of these filters to be sorted.
                      </li>
                      <li>
                        Combo Recommendations now show more detailed information when clicking on their "More Info" button!
                        You can now find the Combo's overall Lured/Combo Multiplier Damage values,
                        and each Gag's Base Accuracy/Damage and Attack Accuracy/Damage. 
                        Also, the gag modal displayed when clicking on one of the recommended combos' gags now
                        displays the gag's Base and Attack Accuracy/Damage and its Lured/Combo Multiplier values!
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3>2023-07-04</h3>
                    <h4>Combo Recommendation Descriptions & Warnings</h4>
                    <p>
                      Added text descriptions and warnings for some combos that are considered good or bad strategy.
                      A Combo Card's Info button will now be colored green if it is marked as good and has a description,
                      or red if it is marked as bad and has a warning.
                      Clicking the combo's info button will reveal the text description or warning (if it exists)
                      alongside the gags' details. 
                    </p>
                  </section>

                  <section>
                    <h3>2023-03-02</h3>
                    <h4>Fixed Broken Links</h4>
                    <p>
                      Fixed two broken links on the homepage.
                    </p>
                  </section>

                  <section>
                    <h3>2022-11-13</h3>
                    <h4>404 Page</h4>
                    <p>
                      Added a new 404 page to let you know if the page you are trying to visit doesn't exist.
                      (Previously, a 404 error would simply redirect you to the homepage.) 
                    </p>
                  </section>

                  <section>
                    <h3>2022-11-09</h3>
                    <h4>New Gag Calculator Page!</h4>
                    <p>
                      Sometimes it's easier to build your own combination of gags than it is to scroll through a list of recommendations.
                      That's why we've added a new calculator page to Gag Combos Info!
                      Choose any combination of gags for yourself on this page,
                      and the calculator will show you which cogs your combo will defeat.
                    </p>
                    <p>
                      Renamed "Dashboard" page to "Recommendations" to better reflect its purpose.
                    </p>
                  </section>

                  <section>
                    <h3>2022-11-07</h3>
                    <h4>v2.0 Cog Support</h4>
                    <p>
                      You can now toggle whether your cog is a v2.0 to account for reinforced plating in combo calculations!
                    </p>
                  </section>

                  <section>
                    <h3>2022-11-03</h3>
                    <h4>Social Media Card</h4>
                    <p>
                      Added a flashy card design for when the Gag Combos Info link is shared on social media.
                    </p>
                  </section>

                  <section>
                    <h3>2022-11-02</h3>
                    <h4>Instant Updates</h4>
                    <p>
                      Under-the-hood changes that allow instant updates
                      instead of requiring one website visit to detect updates
                      and another website visit to implement them.
                    </p>
                  </section>

                  <section>
                    <h3>2022-11-01</h3>
                    <h4>Website Redesign!</h4>
                    <div className="block">
                      <b>New Homepage</b>
                      <p>
                        Introduced a new, flashier homepage!
                      </p>
                    </div>
                    <div className="block">
                      <b>Revamped Dashboard Page</b>
                      <ul>
                        <li>Combo gags are now colored to match their gag track.</li>
                        <li>Combo gags can now each be clicked to get detailed information about that gag.</li>
                        <li>Fixed a bug with resetting toons which caused toons to disappear!</li>
                      </ul>
                    </div>
                    <div className="block">
                      <b>Other New Pages</b>
                      <ul>
                        <li>FAQ Page</li>
                        <li>Changelog Page (You're Here!)</li>
                        <li>Privacy Policy Page</li>
                      </ul>
                    </div>
                    <div className="block">
                      <b>A Better Header (and Footer)</b>
                      <ul>
                        <li>Header and its links have been restyled.</li>
                        <li>Footer includes links to ALL website pages.</li>
                      </ul>
                    </div>
                    <div className="block">
                      <b>Site Structure</b>
                      <p>
                        Various under-the-hood changes to support multiple website pages and upcoming features!
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3>2022-10-22</h3>
                    <h4>Saving & Deleting</h4>
                    <p>
                      Dashboard now saves your setup by default, with buttons to reset toons, combos, and cog to their initial states if desired.
                    </p>
                  </section>
                  
                </div>
              </div>
            </article>
          </main>
          <Footer />
        </>
      } 
    />
  );
}
