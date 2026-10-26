const linkedInUrl = "https://linkedin.com/in/sahla-thasni-p";

function GitHubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.2 1.3-4.2-2.1-5.9-2.5m11.8 5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6.1a4.8 4.8 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1-.3-3.3 1.3a11.3 11.3 0 0 0-6 0C6.6 3.6 5.6 4 5.6 4a4.4 4.4 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.8 2.8 5.8 5.5 6.1a2.8 2.8 0 0 0-.8 2.2V22" /></svg>;
}

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v10M5 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10" /><circle cx="5" cy="5" r="1.5" /></svg>;
}

export default function PortfolioFooter() {
  return (
    <footer className="portfolio-footer page-gutter">
      <div className="footer-top">
        <div className="footer-brand-block">
          <p className="footer-brand">SAHLA <span>THASNI</span></p>
          <p className="footer-role">Full Stack Developer</p>
        </div>
        <nav className="footer-socials" aria-label="Social links">
          <a href="https://github.com/Sahla-Thasni" target="_blank" rel="noreferrer" aria-label="GitHub profile"><GitHubIcon /></a>
          <a href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedInIcon /></a>
          <a className="footer-back-top" href="#home" aria-label="Back to top">↑</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Sahla Thasni. All rights reserved.</p>
        <p>Designed &amp; built with care.</p>
      </div>
    </footer>
  );
}
