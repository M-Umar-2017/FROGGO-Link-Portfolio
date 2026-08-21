/** Velvet Webring design: a centered old-web profile terminal with tactile maroon controls, optional ambient music, and candid personal copy. */
import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Music2, Pause, Play } from "lucide-react";

const profileLinks = [
  { label: "GitHub", tag: "code archive", href: "https://github.com/M-Umar-2017" },
  { label: "GitLab", tag: "projects", href: "https://gitlab.com/M-Umar-2017" },
  { label: "Reddit", tag: "posts", href: "https://www.reddit.com/user/Impressive_Art_6681/" },
  { label: "Community Fandom", tag: "wiki corner", href: "https://community.fandom.com/wiki/User:MADEC2017" },
  { label: "Tumblr", tag: "blog", href: "https://www.tumblr.com/madec2017?source=share" },
  { label: "Quora", tag: "answers", href: "https://www.quora.com/profile/The-Guy-2017" },
  { label: "Twitch", tag: "live", href: "https://www.twitch.tv/madec2017" },
  { label: "Mastodon", tag: "social", href: "https://mastodon.social/@The_Guy_2017" },
  { label: "Uiverse", tag: "UI work", href: "https://uiverse.io/profile/M-Umar-2017" },
  { label: "Pinterest", tag: "pins", href: "https://www.pinterest.com/The_Guy_2017/" },
  { label: "CrazyGames", tag: "player page", href: "https://www.crazygames.com/u/FlyinCocktail.0349" },
  { label: "BloxdHub", tag: "Bloxd.io profile", href: "https://bloxdhub.com/@MADEC" },
  { label: "Itch.io", tag: "games", href: "https://the-guy-of-games-2017.itch.io/" },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const copyDiscordId = async () => {
    await navigator.clipboard.writeText("unknownbro_11033");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.pause();
      return;
    }

    audio.volume = 0.28;
    try {
      await audio.play();
    } catch {
      setIsMusicPlaying(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="desktop-spark desktop-spark-one" aria-hidden="true" />
      <div className="desktop-spark desktop-spark-two" aria-hidden="true" />
      <img
        className="corner-sticker"
        src="/manus-storage/webring-corner-sticker_3608a254.png"
        alt=""
        aria-hidden="true"
      />

      <main className="profile-shell">
        <div className="window-shadow" aria-hidden="true" />
        <article className="profile-window">
          <audio
            ref={audioRef}
            loop
            preload="metadata"
            src="/manus-storage/velvet-webring-theme_20dab064.mp3"
            onPlay={() => setIsMusicPlaying(true)}
            onPause={() => setIsMusicPlaying(false)}
          />
          <header className="window-titlebar">
            <span className="titlebar-name">
              <img
                className="titlebar-mark"
                src="/manus-storage/webring-logo-mark_7e9db7ca.png"
                alt=""
                aria-hidden="true"
              />
              madec’s link terminal
            </span>
            <span className="window-controls" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </header>

          <div className="music-strip">
            <span className="music-strip-label"><Music2 size={13} aria-hidden="true" /> ambient theme / optional</span>
            <button className="music-control" type="button" onClick={toggleMusic} aria-pressed={isMusicPlaying}>
              {isMusicPlaying ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
              <span>{isMusicPlaying ? "pause music" : "play music"}</span>
            </button>
          </div>

          <section className="identity-block" aria-labelledby="profile-title">
            <div className="micro-label micro-label-left">personal web / 2017</div>
            <div className="avatar-console">
              <span className="avatar-tab">profile.pfp</span>
              <div className="avatar-ring">
                <img src="/manus-storage/profile-avatar_bd94af3f.jpg" alt="MADEC2017 profile avatar" />
              </div>
            </div>
            <div className="identity-copy">
              <p className="eyebrow">m-umar-2017</p>
              <h1 id="profile-title">The Guy<br />of Games</h1>
              <p className="profile-tagline">a work in progress, on the web and off.</p>
            </div>
            <img
              className="terminal-orb"
              src="/manus-storage/pink-terminal-orb_f392ac72.png"
              alt=""
              aria-hidden="true"
            />
          </section>

          <section className="about-panel" aria-label="About this profile">
            <span className="panel-label">about.exe</span>
            <p>
              A wannabe full-stack web developer, Discord user, and Bloxd.io player.
            </p>
            <button className="discord-chip" type="button" onClick={copyDiscordId} aria-label="Copy Discord ID unknownbro underscore 11033">
              <span className="discord-indicator" aria-hidden="true" />
              <span>Discord: <strong>unknownbro_11033</strong></span>
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              <span className="copy-note">{copied ? "copied" : "copy"}</span>
            </button>
          </section>

          <section className="links-panel" aria-labelledby="links-title">
            <div className="directory-heading">
              <span className="directory-rule" aria-hidden="true" />
              <h2 id="links-title">choose a room to visit</h2>
              <span className="directory-rule" aria-hidden="true" />
            </div>
            <div className="link-directory">
              {profileLinks.map((link, index) => (
                <a key={link.href} className="profile-link" href={link.href} target="_blank" rel="noreferrer">
                  <span className="link-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="link-name">{link.label}</span>
                  <span className="link-tag">{link.tag}</span>
                  <ArrowUpRight className="link-arrow" size={17} strokeWidth={2.4} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <footer className="profile-footer">
            <span className="footer-star" aria-hidden="true">✦</span>
            <span>maroon personal link directory</span>
            <span className="footer-star" aria-hidden="true">✦</span>
          </footer>
        </article>
      </main>
    </div>
  );
}
