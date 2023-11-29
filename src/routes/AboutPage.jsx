function AboutPage() {
  return (
    <div className="about-page">
      <h1>About</h1>
      <div className="about-content">
        <p className="about-txt">
          Find the Things! is a game inspired by Where&apos;s Waldo. Find the hidden items quickly
          to try to make it to the top of the leaderboard!
        </p>
        <p className="img-txt">
          All 3 images used in the game (
          <a href="https://www.srhillustration.com/#/the-crumbling-creek/">The Crumbling Creek</a>,{' '}
          <a href="https://www.srhillustration.com/#/midnight-metropolis/">Midnight Metropolis</a>,
          and <a href="https://www.srhillustration.com/#/concrete-jungle/">Concrete Jungle</a>) are
          by Samuel Hayward. <a href="https://www.srhillustration.com/">Click here</a> to visit his
          website and check out more of his work!
        </p>
        <p className="gh-txt">
          Game created by
          <a href="https://github.com/caylinvu">
            caylinvu
            <img src="/gh.png" alt="github logo"></img>
          </a>
        </p>
        <p>
          Project repos: <a href="https://github.com/caylinvu/wheres-waldo">frontend</a>,{' '}
          <a href="https://github.com/caylinvu/wheres-waldo-api">backend</a>
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
