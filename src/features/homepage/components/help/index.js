import './index.css';


export default function Help() {
  return (
    <section id='help'>
      <div className='wrapper flex'>
        <div className='left'>
          <h2>How to Use</h2>
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
          <i>Note: This utility is only for Toontown Rewritten!</i>
        </div>
        <div className='right'>
          <h2>New to Toontown?</h2>
          <a href='https://toontownrewritten.com/'>
            Toontown Rewritten Homepage
          </a>
          <a href='https://toontownrewritten.fandom.com/wiki/Gags'>
            TTR Gags Wiki
          </a>
        </div>
      </div>
    </section>
  );
}
