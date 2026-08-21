# The Guy of Games — Link Portfolio

> A handcrafted personal link directory for an aspiring full-stack web developer, Discord user, and Bloxd.io player.

This project is a React-powered profile page built around a **Velvet Webring** visual direction: dark-maroon desktop texture, dusty-pink beveled controls, and the candid warmth of an early personal homepage. It keeps the profile centered, accessible, and intentionally focused on the places where I build, play, and post.

## Site Experience

The page presents a supplied profile avatar, a short bio, a copyable Discord ID, and a single clear directory of profile destinations. An optional ambient music player is available in the title area; it does not begin automatically, so visitors stay in control of playback and volume.

| Element | Detail |
| --- | --- |
| Design language | Classic personal-web UI with maroon framing and dark-pink highlights |
| Frontend | React 19, Vite, TypeScript, and Tailwind CSS |
| Music | Original, instrumental ambient theme with a visitor-controlled play/pause toggle |
| Primary identity | `M-Umar-2017` / `MADEC2017` / The Guy of Games |
| Discord | `unknownbro_11033` |

## Find Me Online

| Destination | Link |
| --- | --- |
| GitHub | [github.com/M-Umar-2017](https://github.com/M-Umar-2017) |
| GitLab | [gitlab.com/M-Umar-2017](https://gitlab.com/M-Umar-2017) |
| Reddit | [u/Impressive_Art_6681](https://www.reddit.com/user/Impressive_Art_6681/) |
| Community Fandom | [User: MADEC2017](https://community.fandom.com/wiki/User:MADEC2017) |
| Tumblr | [madec2017](https://www.tumblr.com/madec2017?source=share) |
| Quora | [The Guy 2017](https://www.quora.com/profile/The-Guy-2017) |
| Twitch | [madec2017](https://www.twitch.tv/madec2017) |
| Mastodon | [@The_Guy_2017](https://mastodon.social/@The_Guy_2017) |
| Uiverse | [M-Umar-2017](https://uiverse.io/profile/M-Umar-2017) |
| Pinterest | [The_Guy_2017](https://www.pinterest.com/The_Guy_2017/) |
| CrazyGames | [FlyinCocktail.0349](https://www.crazygames.com/u/FlyinCocktail.0349) |
| BloxdHub | [@MADEC](https://bloxdhub.com/@MADEC) |
| Itch.io | [the-guy-of-games-2017](https://the-guy-of-games-2017.itch.io/) |

## Run Locally

Install dependencies with `pnpm install`, then run `pnpm dev`. Create a production build with `pnpm build`; the resulting static client bundle is generated in `dist/public`.

## GitHub Pages

GitHub Pages serves static **HTML, CSS, JavaScript, image, font, and audio files**. This project now keeps its wallpaper, profile avatar, decorative illustrations, and optional music file under `client/public/assets`, so Vite copies them into the published site bundle. Production builds use the repository base path, `/MADEC-s-Link-Portfolio/`, which ensures every asset resolves correctly from the project Pages URL rather than from the account root.

The repository also includes a GitHub Actions workflow that installs dependencies, generates the Vite build, uploads `dist/public`, and deploys that bundle to GitHub Pages. The Pages source must use **GitHub Actions**, not the legacy branch-root setting. GitHub’s official documentation describes Pages deployment options and repository-site URL behavior. [1] [2]

## References

[1]: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
[2]: https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages
