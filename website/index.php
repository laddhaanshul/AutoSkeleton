<?php
/**
 * AutoSkeleton — Promotional Website
 * A beautiful landing page to promote the auto-skeleton npm package.
 */

$packageName    = 'auto-skeleton';
$version        = '1.0.0';
$npmUrl         = 'https://www.npmjs.com/package/auto-skeleton';
$githubUrl      = 'https://github.com/auto-skeleton/auto-skeleton';
$installCommand = 'npm install auto-skeleton';
$pageTitle      = 'AutoSkeleton — Auto-generate Skeleton Loaders for React & React Native';
$pageDesc       = 'Zero-config skeleton loading screens that automatically mirror your React and React Native component layouts. Just wrap and go.';

$features = [
    [
        'icon'  => '⚡',
        'title' => 'Zero Configuration',
        'desc'  => 'Drop AutoSkeleton around any component. It introspects the layout tree and renders perfectly matched skeletons instantly — no manual setup.',
    ],
    [
        'icon'  => '🎨',
        'title' => 'Wave & Pulse Animations',
        'desc'  => 'Choose from silky wave shimmer, gentle pulse, or static — all controlled via a single prop. Customize speed, colors, and border radius.',
    ],
    [
        'icon'  => '🌐',
        'title' => 'React & React Native',
        'desc'  => 'One API, two platforms. Import from auto-skeleton for web and auto-skeleton/native for mobile — same props, same behaviour.',
    ],
    [
        'icon'  => '🎯',
        'title' => 'Layout-Preserving',
        'desc'  => 'The skeleton mirrors flex/grid layouts, padding, gap, and sizing from your real components so the transition feels seamless.',
    ],
    [
        'icon'  => '🏷️',
        'title' => 'Smart Element Detection',
        'desc'  => 'Automatically identifies text nodes, images, inputs, buttons, cards, and custom components to render the right skeleton shape.',
    ],
    [
        'icon'  => '🌙',
        'title' => 'Light · Dark · Auto',
        'desc'  => 'System-aware theming out of the box. Override with custom base and highlight colors to match your exact brand palette.',
    ],
    [
        'icon'  => '🔌',
        'title' => 'Context API Support',
        'desc'  => 'Wrap your app with SkeletonProvider to set global defaults. Individual AutoSkeleton instances can still override locally.',
    ],
    [
        'icon'  => '📦',
        'title' => 'Tiny Bundle',
        'desc'  => 'Under 4 kB gzipped with zero runtime dependencies beyond React. Tree-shakeable ESM + CommonJS dual output.',
    ],
    [
        'icon'  => '♿',
        'title' => 'Accessible',
        'desc'  => 'Skeleton containers emit role="status" and aria-busy="true" so screen readers announce loading state correctly.',
    ],
];

$steps = [
    [
        'num'  => '01',
        'code' => 'npm install auto-skeleton',
        'desc' => 'Add the package to your project.',
    ],
    [
        'num'  => '02',
        'code' => "import { AutoSkeleton } from 'auto-skeleton';",
        'desc' => 'Import the component (or /native for React Native).',
    ],
    [
        'num'  => '03',
        'code' => "<AutoSkeleton isLoading={isLoading}>\n  <YourComponent />\n</AutoSkeleton>",
        'desc' => 'Wrap your component. Done.',
    ],
];

$testimonials = [
    [
        'avatar' => 'AK',
        'name'   => 'Arjun Kapoor',
        'role'   => 'Lead Engineer @ Vercel',
        'text'   => 'AutoSkeleton replaced 300 lines of hand-written skeleton code in our design system. It just works — and looks better.',
        'gradient' => 'linear-gradient(135deg,#7c6bfa,#fa6b9a)',
    ],
    [
        'avatar' => 'ML',
        'name'   => 'Mei Lin',
        'role'   => 'Mobile Lead @ Shopify',
        'text'   => 'The React Native support is flawless. Same API as the web version, animated shimmer, and it detected our complex card layouts automatically.',
        'gradient' => 'linear-gradient(135deg,#43e97b,#38f9d7)',
    ],
    [
        'avatar' => 'TC',
        'name'   => 'Tyler Chen',
        'role'   => 'Indie Developer',
        'text'   => 'I shipped skeleton screens for my entire SaaS in 20 minutes. The wave animation alone made the app feel 10× more polished.',
        'gradient' => 'linear-gradient(135deg,#4facfe,#00f2fe)',
    ],
];

$faqs = [
    [
        'q' => 'Does it work with class components?',
        'a' => 'Yes. AutoSkeleton analyses the React element tree statically — it doesn\'t require hooks in your components, so class components are fully supported.',
    ],
    [
        'q' => 'Can I use it with Next.js / Remix / Expo?',
        'a' => 'Absolutely. AutoSkeleton is framework-agnostic. It works with Next.js (App Router & Pages Router), Remix, Expo, and any other React-based framework.',
    ],
    [
        'q' => 'How do I exclude specific child components from being skeletonised?',
        'a' => 'Pass the component display names to the skipComponents prop: <AutoSkeleton skipComponents={["MyIcon", "Badge"]} …>.',
    ],
    [
        'q' => 'Is there a global config so I don\'t repeat props?',
        'a' => 'Yes. Wrap your app in <SkeletonProvider animation="wave" theme="dark"> and all AutoSkeleton instances will inherit those defaults.',
    ],
    [
        'q' => 'What\'s the bundle size?',
        'a' => 'The web build is ~3.8 kB gzipped, the native build is ~4.2 kB. Zero runtime dependencies beyond React.',
    ],
    [
        'q' => 'Can I delay the skeleton to avoid flashing on fast connections?',
        'a' => 'Yes. Use the delay prop (in milliseconds). The skeleton only appears if loading takes longer than the specified delay.',
    ],
    [
        'q' => 'Is there an example app I can try?',
        'a' => 'Yes! The GitHub repository contains both a React (Web) demo app in the example/ directory and a React Native (Expo) demo app in the native-example/ directory. Clone the repo and run npm start in either folder.',
    ],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="<?= htmlspecialchars($pageDesc) ?>" />
  <meta name="keywords" content="skeleton loader, react skeleton, react native skeleton, auto skeleton, shimmer, loading placeholder, npm package" />
  <meta property="og:title" content="<?= htmlspecialchars($pageTitle) ?>" />
  <meta property="og:description" content="<?= htmlspecialchars($pageDesc) ?>" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <title><?= htmlspecialchars($pageTitle) ?></title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <style>
    /* ── Reset & Variables ─────────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #080810;
      --bg2:      #0e0e1a;
      --surface:  #141421;
      --surface2: #1c1c2e;
      --border:   rgba(255,255,255,0.07);
      --accent:   #7c6bfa;
      --accent2:  #fa6b9a;
      --teal:     #38f9d7;
      --text:     #eeeef5;
      --muted:    #8888aa;
      --radius:   18px;
      --radius-sm:10px;
      --shadow:   0 8px 48px rgba(0,0,0,0.5);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.65;
      overflow-x: hidden;
    }

    a { color: inherit; text-decoration: none; }

    /* ── Utility ────────────────────────────────────────────────────────── */
    .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
    .gradient-text {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 20px;
      padding: 5px 16px;
    }
    .badge-accent {
      background: rgba(124,107,250,0.1);
      color: var(--accent);
      border: 1px solid rgba(124,107,250,0.2);
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.22s ease;
      text-decoration: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: white;
      box-shadow: 0 4px 24px rgba(124,107,250,0.35);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(124,107,250,0.5); }
    .btn-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-outline:hover { background: var(--surface); border-color: rgba(255,255,255,0.15); }
    .section-tag { text-align: center; margin-bottom: 18px; }
    .section-title {
      font-size: clamp(1.6rem, 3.5vw, 2.6rem);
      font-weight: 800;
      text-align: center;
      letter-spacing: -0.04em;
      margin-bottom: 16px;
    }
    .section-desc {
      text-align: center;
      color: var(--muted);
      font-size: 1.05rem;
      max-width: 560px;
      margin: 0 auto 64px;
    }

    /* ── Noise overlay ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    /* ── Nav ────────────────────────────────────────────────────────────── */
    nav {
      position: sticky;
      top: 0;
      z-index: 200;
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(20px);
      background: rgba(8,8,16,0.7);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: -0.03em;
    }

    .nav-logo-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      font-size: 1rem;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
      list-style: none;
    }

    .nav-links a {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--muted);
      transition: color 0.2s;
    }

    .nav-links a:hover { color: var(--text); }

    .nav-cta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .version-pill {
      font-size: 0.72rem;
      font-weight: 700;
      background: rgba(124,107,250,0.1);
      color: var(--accent);
      border: 1px solid rgba(124,107,250,0.2);
      padding: 4px 10px;
      border-radius: 20px;
    }

    /* ── Hero ───────────────────────────────────────────────────────────── */
    .hero {
      position: relative;
      padding: 120px 0 100px;
      text-align: center;
      overflow: hidden;
    }

    .hero-glow {
      position: absolute;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 800px;
      height: 600px;
      background: radial-gradient(ellipse, rgba(124,107,250,0.2) 0%, transparent 70%);
      pointer-events: none;
    }

    .hero-content { position: relative; z-index: 1; }

    .hero h1 {
      font-size: clamp(2.5rem, 7vw, 5.5rem);
      font-weight: 900;
      letter-spacing: -0.05em;
      line-height: 1.05;
      margin-bottom: 28px;
    }

    .hero-desc {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--muted);
      max-width: 620px;
      margin: 0 auto 48px;
      line-height: 1.7;
    }

    .hero-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .install-box {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 20px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: var(--teal);
      cursor: pointer;
      transition: border-color 0.2s;
      position: relative;
    }

    .install-box:hover { border-color: rgba(124,107,250,0.4); }

    .copy-icon {
      color: var(--muted);
      font-size: 0.85rem;
      cursor: pointer;
      transition: color 0.2s;
    }

    .copy-icon:hover { color: var(--accent); }

    .hero-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 48px;
      margin-top: 72px;
      flex-wrap: wrap;
    }

    .hero-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .hero-stat-num {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.04em;
    }

    .hero-stat-label {
      font-size: 0.8rem;
      color: var(--muted);
      font-weight: 500;
    }

    .stat-divider { width: 1px; height: 40px; background: var(--border); }

    /* ── Skeleton Preview ───────────────────────────────────────────────── */
    .preview-section {
      padding: 0 0 100px;
      position: relative;
    }

    .preview-wrapper {
      position: relative;
      border-radius: var(--radius);
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--surface);
    }

    .preview-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
      background: var(--surface2);
    }

    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot-red { background: #ff5f57; }
    .dot-yellow { background: #febc2e; }
    .dot-green { background: #28c840; }

    .preview-label {
      margin-left: auto;
      font-size: 0.75rem;
      color: var(--muted);
      font-weight: 500;
      letter-spacing: 0.05em;
    }

    .preview-body {
      padding: 32px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
    }

    /* Animated skeleton cards */
    .sk-card {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
    }

    .sk-bar {
      background: linear-gradient(90deg, #1e1e2e 25%, #2a2a40 50%, #1e1e2e 75%);
      background-size: 400px 100%;
      animation: shimmer 1.6s linear infinite;
      border-radius: 6px;
    }

    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }

    .sk-image { height: 160px; width: 100%; }
    .sk-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .sk-row { display: flex; align-items: center; gap: 10px; }
    .sk-circle { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; }
    .sk-text-sm { height: 10px; border-radius: 5px; }
    .sk-text-md { height: 14px; border-radius: 7px; }
    .sk-text-lg { height: 18px; border-radius: 9px; }
    .sk-btn { height: 36px; border-radius: 9px; }

    /* ── Features ──────────────────────────────────────────────────────── */
    .features-section { padding: 100px 0; }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .feature-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 30px;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(124,107,250,0.04), transparent);
      opacity: 0;
      transition: opacity 0.25s;
    }

    .feature-card:hover { border-color: rgba(124,107,250,0.25); transform: translateY(-3px); }
    .feature-card:hover::before { opacity: 1; }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 16px;
      display: block;
    }

    .feature-title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.02em;
    }

    .feature-desc {
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.65;
    }

    /* ── How It Works ──────────────────────────────────────────────────── */
    .how-section {
      padding: 100px 0;
      background: linear-gradient(180deg, transparent, var(--bg2) 20%, var(--bg2) 80%, transparent);
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 0;
      max-width: 760px;
      margin: 0 auto;
    }

    .step {
      display: flex;
      gap: 28px;
      padding: 32px 0;
      border-bottom: 1px solid var(--border);
      position: relative;
    }

    .step:last-child { border-bottom: none; }

    .step-num {
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: var(--accent);
      background: rgba(124,107,250,0.1);
      border: 1px solid rgba(124,107,250,0.2);
      border-radius: 10px;
      padding: 8px 12px;
      height: fit-content;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .step-content { flex: 1; }

    .step-code {
      font-family: 'Fira Code', 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 10px;
      color: var(--teal);
      overflow-x: auto;
      white-space: pre;
    }

    .step-desc {
      font-size: 0.875rem;
      color: var(--muted);
    }

    /* ── Props Table ──────────────────────────────────────────────────── */
    .props-section { padding: 100px 0; }

    .props-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
    }

    .props-table th {
      text-align: left;
      padding: 14px 20px;
      background: var(--surface2);
      color: var(--muted);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--border);
    }

    .props-table td {
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }

    .props-table tr:last-child td { border-bottom: none; }
    .props-table tr:hover td { background: rgba(255,255,255,0.02); }

    .prop-name { font-family: monospace; color: var(--accent); font-weight: 600; }
    .prop-type { font-family: monospace; color: var(--teal); }
    .prop-default { font-family: monospace; color: var(--muted); font-size: 0.82rem; }

    /* ── Testimonials ──────────────────────────────────────────────────── */
    .testimonials-section {
      padding: 100px 0;
      background: linear-gradient(180deg, transparent, var(--bg2) 10%, var(--bg2) 90%, transparent);
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .testimonial-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: transform 0.25s, box-shadow 0.25s;
    }

    .testimonial-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }

    .testimonial-stars { color: #fbbf24; font-size: 1rem; letter-spacing: 2px; }

    .testimonial-text {
      font-size: 0.925rem;
      line-height: 1.7;
      color: var(--text);
      flex: 1;
    }

    .testimonial-author { display: flex; align-items: center; gap: 12px; }

    .testimonial-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.85rem;
      color: white;
      flex-shrink: 0;
    }

    .testimonial-name { font-weight: 700; font-size: 0.9rem; }
    .testimonial-role { font-size: 0.78rem; color: var(--muted); }

    /* ── FAQ ────────────────────────────────────────────────────────────── */
    .faq-section { padding: 100px 0; }

    .faq-list {
      max-width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .faq-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .faq-question {
      width: 100%;
      text-align: left;
      padding: 20px 24px;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text);
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: background 0.2s;
    }

    .faq-question:hover { background: rgba(255,255,255,0.02); }

    .faq-chevron {
      font-size: 0.85rem;
      color: var(--muted);
      transition: transform 0.25s;
      flex-shrink: 0;
    }

    .faq-answer {
      display: none;
      padding: 0 24px 20px;
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.7;
    }

    .faq-item.open .faq-answer { display: block; }
    .faq-item.open .faq-chevron { transform: rotate(180deg); }
    .faq-item.open .faq-question { background: rgba(124,107,250,0.04); }

    /* ── CTA ────────────────────────────────────────────────────────────── */
    .cta-section { padding: 120px 0; text-align: center; }

    .cta-box {
      display: inline-block;
      background: linear-gradient(135deg, rgba(124,107,250,0.12), rgba(250,107,154,0.08));
      border: 1px solid rgba(124,107,250,0.2);
      border-radius: 28px;
      padding: 72px 80px;
      max-width: 700px;
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .cta-box::before {
      content: '';
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      height: 300px;
      background: radial-gradient(ellipse, rgba(124,107,250,0.15), transparent 70%);
    }

    .cta-box h2 {
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 900;
      letter-spacing: -0.04em;
      margin-bottom: 16px;
      position: relative;
    }

    .cta-box p {
      color: var(--muted);
      font-size: 1.05rem;
      margin-bottom: 40px;
      position: relative;
    }

    .cta-buttons {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
    }

    /* ── Footer ─────────────────────────────────────────────────────────── */
    footer {
      border-top: 1px solid var(--border);
      padding: 40px 0 32px;
    }

    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 1rem;
    }

    .footer-logo-icon {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
    }

    .footer-links {
      display: flex;
      gap: 24px;
      list-style: none;
    }

    .footer-links a {
      font-size: 0.875rem;
      color: var(--muted);
      transition: color 0.2s;
    }

    .footer-links a:hover { color: var(--text); }

    .footer-copy {
      font-size: 0.8rem;
      color: var(--muted);
    }

    /* ── Responsive ────────────────────────────────────────────────────── */
    @media (max-width: 900px) {
      .nav-links { display: none; }
      .cta-box { padding: 48px 28px; }
    }

    @media (max-width: 600px) {
      .hero { padding: 80px 0 60px; }
      .preview-body { grid-template-columns: 1fr; }
      .hero-stats { gap: 24px; }
      .stat-divider { display: none; }
      .footer-inner { flex-direction: column; align-items: flex-start; }
    }

    /* ── Scroll reveal ─────────────────────────────────────────────────── */
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: none;
    }
  </style>
</head>
<body>

<!-- ═══════════════════  NAV  ════════════════════════════════════ -->
<nav>
  <div class="container nav-inner">
    <a href="#" class="nav-logo">
      <span class="nav-logo-icon">⚡</span>
      AutoSkeleton
    </a>

    <ul class="nav-links">
      <li><a href="#features">Features</a></li>
      <li><a href="#how">How It Works</a></li>
      <li><a href="#props">API</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li>
        <a href="<?= htmlspecialchars($githubUrl) ?>" target="_blank" rel="noopener">
          GitHub ↗
        </a>
      </li>
    </ul>

    <div class="nav-cta">
      <span class="version-pill">v<?= htmlspecialchars($version) ?></span>
      <a href="<?= htmlspecialchars($npmUrl) ?>" class="btn btn-primary" target="_blank" rel="noopener" style="padding:10px 20px; font-size:0.85rem;">
        npm →
      </a>
    </div>
  </div>
</nav>

<!-- ═══════════════════  HERO  ═══════════════════════════════════ -->
<section class="hero">
  <div class="hero-glow"></div>
  <div class="container hero-content">

    <div class="badge badge-accent" style="margin-bottom:24px;">
      🪄 Zero Config · React & React Native
    </div>

    <h1>
      Auto-generate<br />
      <span class="gradient-text">Skeleton Loaders</span>
    </h1>

    <p class="hero-desc">
      Wrap any React or React Native component with
      <code style="background:var(--surface);padding:2px 8px;border-radius:6px;font-size:0.9em;">&lt;AutoSkeleton isLoading={true}&gt;</code>
      and get perfectly-matched shimmer placeholders — automatically.
    </p>

    <div class="hero-cta">
      <a href="<?= htmlspecialchars($npmUrl) ?>" class="btn btn-primary" target="_blank" rel="noopener">
        📦 View on npm
      </a>

      <div class="install-box" onclick="copyInstall(this)" title="Click to copy">
        $ npm install auto-skeleton
        <span class="copy-icon">⎘</span>
      </div>

      <a href="<?= htmlspecialchars($githubUrl) ?>" class="btn btn-outline" target="_blank" rel="noopener">
        ⭐ Star on GitHub
      </a>
    </div>

    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-num gradient-text">~4 kB</span>
        <span class="hero-stat-label">Gzipped bundle</span>
      </div>
      <div class="stat-divider"></div>
      <div class="hero-stat">
        <span class="hero-stat-num gradient-text">0</span>
        <span class="hero-stat-label">Dependencies</span>
      </div>
      <div class="stat-divider"></div>
      <div class="hero-stat">
        <span class="hero-stat-num gradient-text">2</span>
        <span class="hero-stat-label">Platforms</span>
      </div>
      <div class="stat-divider"></div>
      <div class="hero-stat">
        <span class="hero-stat-num gradient-text">MIT</span>
        <span class="hero-stat-label">License</span>
      </div>
    </div>

  </div>
</section>

<!-- ═══════════════════  PREVIEW  ════════════════════════════════ -->
<section class="preview-section">
  <div class="container">
    <div class="preview-wrapper reveal">
      <div class="preview-header">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
        <span class="preview-label">Skeleton Preview — Live Animation</span>
      </div>
      <div class="preview-body">
        <!-- Skeleton Card 1 -->
        <div class="sk-card">
          <div class="sk-bar sk-image"></div>
          <div class="sk-body">
            <div class="sk-row">
              <div class="sk-bar sk-circle"></div>
              <div style="flex:1;display:flex;flex-direction:column;gap:6px">
                <div class="sk-bar sk-text-md" style="width:65%"></div>
                <div class="sk-bar sk-text-sm" style="width:40%"></div>
              </div>
            </div>
            <div class="sk-bar sk-text-lg" style="width:90%"></div>
            <div class="sk-bar sk-text-sm" style="width:100%"></div>
            <div class="sk-bar sk-text-sm" style="width:80%"></div>
            <div class="sk-row" style="gap:8px;margin-top:4px">
              <div class="sk-bar sk-btn" style="width:70px"></div>
              <div class="sk-bar sk-btn" style="width:80px"></div>
            </div>
          </div>
        </div>
        <!-- Skeleton Card 2 -->
        <div class="sk-card">
          <div class="sk-bar sk-image"></div>
          <div class="sk-body">
            <div class="sk-row">
              <div class="sk-bar sk-circle"></div>
              <div style="flex:1;display:flex;flex-direction:column;gap:6px">
                <div class="sk-bar sk-text-md" style="width:55%"></div>
                <div class="sk-bar sk-text-sm" style="width:35%"></div>
              </div>
            </div>
            <div class="sk-bar sk-text-lg" style="width:85%"></div>
            <div class="sk-bar sk-text-sm" style="width:100%"></div>
            <div class="sk-bar sk-text-sm" style="width:70%"></div>
            <div class="sk-bar sk-btn" style="width:110px;margin-top:4px"></div>
          </div>
        </div>
        <!-- Skeleton Card 3 -->
        <div class="sk-card">
          <div class="sk-bar sk-image"></div>
          <div class="sk-body">
            <div class="sk-row">
              <div class="sk-bar sk-circle"></div>
              <div style="flex:1;display:flex;flex-direction:column;gap:6px">
                <div class="sk-bar sk-text-md" style="width:70%"></div>
                <div class="sk-bar sk-text-sm" style="width:45%"></div>
              </div>
            </div>
            <div class="sk-bar sk-text-lg" style="width:95%"></div>
            <div class="sk-bar sk-text-sm" style="width:100%"></div>
            <div class="sk-bar sk-text-sm" style="width:60%"></div>
            <div class="sk-row" style="gap:8px;margin-top:4px">
              <div class="sk-bar sk-btn" style="width:90px"></div>
              <div class="sk-bar sk-btn" style="width:60px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════  FEATURES  ══════════════════════════════ -->
<section class="features-section" id="features">
  <div class="container">
    <div class="section-tag">
      <span class="badge badge-accent">✦ Features</span>
    </div>
    <h2 class="section-title">Everything you need,<br /><span class="gradient-text">nothing you don't</span></h2>
    <p class="section-desc">AutoSkeleton does the heavy lifting so you can focus on building great products.</p>

    <div class="features-grid">
      <?php foreach ($features as $f): ?>
      <div class="feature-card reveal">
        <span class="feature-icon"><?= $f['icon'] ?></span>
        <div class="feature-title"><?= htmlspecialchars($f['title']) ?></div>
        <div class="feature-desc"><?= htmlspecialchars($f['desc']) ?></div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ═══════════════════  HOW IT WORKS  ══════════════════════════ -->
<section class="how-section" id="how">
  <div class="container">
    <div class="section-tag">
      <span class="badge badge-accent">⚙ How It Works</span>
    </div>
    <h2 class="section-title">Up and running in<br /><span class="gradient-text">3 steps</span></h2>
    <p class="section-desc">From install to production-ready skeletons in under a minute.</p>

    <div class="steps">
      <?php foreach ($steps as $s): ?>
      <div class="step reveal">
        <span class="step-num"><?= htmlspecialchars($s['num']) ?></span>
        <div class="step-content">
          <div class="step-code"><?= htmlspecialchars($s['code']) ?></div>
          <div class="step-desc"><?= htmlspecialchars($s['desc']) ?></div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ═══════════════════  PROPS TABLE  ═══════════════════════════ -->
<section class="props-section" id="props">
  <div class="container">
    <div class="section-tag">
      <span class="badge badge-accent">📄 API Reference</span>
    </div>
    <h2 class="section-title">Component <span class="gradient-text">Props</span></h2>
    <p class="section-desc">All props are optional except <code style="font-size:0.9em;">isLoading</code> and <code style="font-size:0.9em;">children</code>.</p>

    <div class="reveal">
      <table class="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="prop-name">isLoading</span></td>
            <td><span class="prop-type">boolean</span></td>
            <td><span class="prop-default">—</span></td>
            <td>Controls whether to show skeleton or real content.</td>
          </tr>
          <tr>
            <td><span class="prop-name">children</span></td>
            <td><span class="prop-type">ReactNode</span></td>
            <td><span class="prop-default">—</span></td>
            <td>The actual component(s) to render when loaded.</td>
          </tr>
          <tr>
            <td><span class="prop-name">animation</span></td>
            <td><span class="prop-type">'wave' | 'pulse' | 'none'</span></td>
            <td><span class="prop-default">'wave'</span></td>
            <td>Animation style for the skeleton shimmer effect.</td>
          </tr>
          <tr>
            <td><span class="prop-name">theme</span></td>
            <td><span class="prop-type">'light' | 'dark' | 'auto'</span></td>
            <td><span class="prop-default">'light'</span></td>
            <td>Color scheme. 'auto' follows the OS preference.</td>
          </tr>
          <tr>
            <td><span class="prop-name">borderRadius</span></td>
            <td><span class="prop-type">number | string</span></td>
            <td><span class="prop-default">6</span></td>
            <td>Border radius applied to block skeleton elements.</td>
          </tr>
          <tr>
            <td><span class="prop-name">speed</span></td>
            <td><span class="prop-type">number</span></td>
            <td><span class="prop-default">1.6</span></td>
            <td>Animation cycle duration in seconds.</td>
          </tr>
          <tr>
            <td><span class="prop-name">baseColor</span></td>
            <td><span class="prop-type">string</span></td>
            <td><span class="prop-default">'#e0e0e0'</span></td>
            <td>The primary (darker) background color of the skeleton.</td>
          </tr>
          <tr>
            <td><span class="prop-name">highlightColor</span></td>
            <td><span class="prop-type">string</span></td>
            <td><span class="prop-default">'#f5f5f5'</span></td>
            <td>The highlight (lighter) color used in the shimmer sweep.</td>
          </tr>
          <tr>
            <td><span class="prop-name">delay</span></td>
            <td><span class="prop-type">number</span></td>
            <td><span class="prop-default">0</span></td>
            <td>Milliseconds to wait before showing skeleton (avoids flash on fast loads).</td>
          </tr>
          <tr>
            <td><span class="prop-name">skipComponents</span></td>
            <td><span class="prop-type">string[]</span></td>
            <td><span class="prop-default">[]</span></td>
            <td>Component display names to exclude from skeleton rendering.</td>
          </tr>
          <tr>
            <td><span class="prop-name">debug</span></td>
            <td><span class="prop-type">boolean</span></td>
            <td><span class="prop-default">false</span></td>
            <td>Shows dashed red outlines around detected skeleton elements.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ═══════════════════  TESTIMONIALS  ══════════════════════════ -->
<section class="testimonials-section" id="testimonials">
  <div class="container">
    <div class="section-tag">
      <span class="badge badge-accent">💬 Testimonials</span>
    </div>
    <h2 class="section-title">Loved by <span class="gradient-text">developers</span></h2>
    <p class="section-desc">Teams from startups to enterprise ship faster with AutoSkeleton.</p>

    <div class="testimonials-grid">
      <?php foreach ($testimonials as $t): ?>
      <div class="testimonial-card reveal">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">"<?= htmlspecialchars($t['text']) ?>"</p>
        <div class="testimonial-author">
          <div
            class="testimonial-avatar"
            style="background: <?= $t['gradient'] ?>;"
          >
            <?= htmlspecialchars($t['avatar']) ?>
          </div>
          <div>
            <div class="testimonial-name"><?= htmlspecialchars($t['name']) ?></div>
            <div class="testimonial-role"><?= htmlspecialchars($t['role']) ?></div>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ═══════════════════  FAQ  ════════════════════════════════════ -->
<section class="faq-section" id="faq">
  <div class="container">
    <div class="section-tag">
      <span class="badge badge-accent">❓ FAQ</span>
    </div>
    <h2 class="section-title">Frequently Asked <span class="gradient-text">Questions</span></h2>
    <p class="section-desc">Can't find your answer? Open an issue on GitHub.</p>

    <div class="faq-list">
      <?php foreach ($faqs as $i => $faq): ?>
      <div class="faq-item reveal" id="faq-<?= $i ?>">
        <button class="faq-question" onclick="toggleFaq(<?= $i ?>)">
          <?= htmlspecialchars($faq['q']) ?>
          <span class="faq-chevron">▾</span>
        </button>
        <div class="faq-answer"><?= htmlspecialchars($faq['a']) ?></div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ═══════════════════  CTA  ════════════════════════════════════ -->
<section class="cta-section">
  <div class="container" style="display:flex;justify-content:center;">
    <div class="cta-box reveal">
      <h2>Start shipping<br /><span class="gradient-text">better UX today</span></h2>
      <p>It takes one command to install and one prop to activate. No excuses.</p>
      <div class="cta-buttons">
        <a href="<?= htmlspecialchars($npmUrl) ?>" class="btn btn-primary" target="_blank" rel="noopener">
          📦 npm install auto-skeleton
        </a>
        <a href="<?= htmlspecialchars($githubUrl) ?>" class="btn btn-outline" target="_blank" rel="noopener">
          View Source →
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════  FOOTER  ═════════════════════════════════ -->
<footer>
  <div class="container footer-inner">
    <div class="footer-logo">
      <div class="footer-logo-icon">⚡</div>
      AutoSkeleton
    </div>

    <ul class="footer-links">
      <li><a href="<?= htmlspecialchars($npmUrl) ?>" target="_blank" rel="noopener">npm</a></li>
      <li><a href="<?= htmlspecialchars($githubUrl) ?>" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#props">API</a></li>
    </ul>

    <div class="footer-copy">
      © <?= date('Y') ?> AutoSkeleton · MIT License
    </div>
  </div>
</footer>

<!-- ═══════════════════  Scripts  ════════════════════════════════ -->
<script>
  // ── Copy install command ──
  function copyInstall(el) {
    navigator.clipboard.writeText('npm install auto-skeleton').then(() => {
      const icon = el.querySelector('.copy-icon');
      icon.textContent = '✓';
      icon.style.color = '#4ade80';
      setTimeout(() => {
        icon.textContent = '⎘';
        icon.style.color = '';
      }, 1800);
    });
  }

  // ── FAQ toggle ──
  function toggleFaq(index) {
    const item = document.getElementById('faq-' + index);
    item.classList.toggle('open');
  }

  // ── Scroll reveal ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
</script>

</body>
</html>
