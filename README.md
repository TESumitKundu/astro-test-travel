# TrailNest Tours

A static Astro travel website where tours are managed from GitHub through Pages CMS. There is no database, backend API, WordPress install, or server-side CMS.

## Content Model

Tour packages live as Markdown files in:

```text
src/content/tours
```

Each tour supports:

- `title`
- `slug`
- `place`
- `durationDays`
- `durationLabel`
- `bestMonths`
- `season`
- `coverImage`
- `costInr`
- `minHeadCount`
- `featured`
- `draft`
- `seoTitle`
- `seoDescription`
- Markdown body for the day-wise itinerary

Images are stored in:

```text
public/uploads
```

## Pages

- Home: `/`
- Tour list: `/tours/`
- Tour details: `/tours/[slug]/`
- About: `/about/`

## Homepage Logic

The homepage uses `src/lib/tours.ts`.

- Current month tours: tours where `bestMonths` includes the build month.
- Short duration tours: `durationDays <= 4`.
- Long duration tours: `durationDays >= 5`.

Because this is static, month-wise content updates when the site rebuilds. Use GitHub Actions on content changes and optionally add a monthly scheduled rebuild.

## Pages CMS

The `.pages.yml` file configures:

- Tours collection: `src/content/tours`
- Pages collection: `src/content/pages`
- Site settings: `config/site.json`
- Media uploads: `public/uploads`

When a tour is created in Pages CMS, it commits a Markdown file to GitHub. GitHub Actions can then rebuild and redeploy the static Astro site.

## GitHub Pages

For a project site such as:

```text
https://tesumitkundu.github.io/astro-test-travel/
```

the config uses:

```js
site: 'https://tesumitkundu.github.io',
base: '/astro-test-travel/'
```

Build:

```bash
npm install
npm run build
```

Publish the generated `dist` folder or deploy through GitHub Actions.
