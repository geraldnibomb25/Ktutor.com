import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   AESTHETIC DIRECTION
   Khan Academy DNA × editorial studio refinement
   • Literata (serif display) + Cabinet Grotesk (geometric UI sans)
   • Khan blue #1865F2, white canvas, mastery green #1b8a4c
   • Dot-grid texture backgrounds, diagonal section breaks
   • Staggered entrance animations, smooth hover micro-interactions
   • Overlapping elements, asymmetric hero, grid-breaking moments
   • ZERO generic SaaS card grids — every component uniquely composed
──────────────────────────────────────────────────────────────────────────*/

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,300;0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,300;1,7..72,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --khan-blue:    #1865F2;
    --khan-blue-d:  #0e4fbf;
    --khan-blue-dd: #0a3a8a;
    --khan-blue-l:  #3d7ff7;
    --khan-blue-xl: #e8f0fe;
    --khan-blue-xs: #f0f5ff;

    --green:     #1b8a4c;
    --green-l:   #27ae60;
    --green-xl:  #e6f7ed;
    --green-xs:  #f0fbf5;

    --gold:      #c47f17;
    --gold-xl:   #fef9e7;
    --red:       #c0392b;
    --red-xl:    #fdf0ef;

    --ink:       #1c1d1f;
    --ink-2:     #3b3d42;
    --ink-3:     #6b6e7a;
    --ink-4:     #9da1af;
    --ink-5:     #c8cad0;

    --canvas:    #ffffff;
    --surface:   #f7f8fc;
    --surface-2: #eef1f8;

    --border:    #e0e4ef;
    --border-2:  #cdd3e5;

    --radius-xs: 6px;
    --radius-sm: 10px;
    --radius:    14px;
    --radius-lg: 20px;
    --radius-xl: 28px;

    --shadow-xs: 0 1px 3px rgba(24,101,242,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-sm: 0 2px 8px rgba(24,101,242,0.08), 0 2px 4px rgba(0,0,0,0.04);
    --shadow:    0 4px 20px rgba(24,101,242,0.1), 0 4px 8px rgba(0,0,0,0.04);
    --shadow-lg: 0 12px 48px rgba(24,101,242,0.14), 0 8px 16px rgba(0,0,0,0.06);
    --shadow-xl: 0 24px 80px rgba(24,101,242,0.16);

    --font-display: 'Literata', Georgia, serif;
    --font-ui:      'DM Sans', system-ui, sans-serif;

    --nav-h: 62px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--canvas);
    color: var(--ink);
    font-family: var(--font-ui);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── DOT GRID TEXTURE ── */
  .dot-grid {
    background-image: radial-gradient(circle, var(--ink-5) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  /* ── TOPNAV ── */
  .topnav {
    height: var(--nav-h);
    background: var(--khan-blue);
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 0;
    position: sticky;
    top: 0;
    z-index: 200;
    box-shadow: 0 2px 0 rgba(0,0,0,0.12), 0 4px 16px rgba(10,58,138,0.25);
  }

  .topnav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 36px;
    flex-shrink: 0;
    text-decoration: none;
    cursor: pointer;
  }

  .topnav-logo-mark {
    width: 34px; height: 34px;
    background: rgba(255,255,255,0.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.25);
    transition: background 0.2s;
  }

  .topnav-logo:hover .topnav-logo-mark { background: rgba(255,255,255,0.3); }

  .topnav-logo-text {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.3px;
    font-style: italic;
  }

  .topnav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }

  .topnav-link {
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255,255,255,0.72);
    cursor: pointer;
    transition: all 0.18s;
    border: none;
    background: none;
    font-family: var(--font-ui);
    letter-spacing: -0.1px;
  }

  .topnav-link:hover { color: white; background: rgba(255,255,255,0.12); }
  .topnav-link.active { color: white; background: rgba(255,255,255,0.18); }
  .topnav-link.active-pill {
    background: rgba(255,255,255,0.22);
    color: white;
    position: relative;
  }

  .topnav-link.active-pill::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 50%; transform: translateX(-50%);
    width: 20px; height: 2px;
    background: white;
    border-radius: 2px;
  }

  .topnav-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .topnav-user {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15));
    border: 2px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800;
    font-size: 13px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .topnav-user:hover { background: rgba(255,255,255,0.3); transform: scale(1.05); }

  /* ── LAYOUT ── */
  .layout {
    display: flex;
    min-height: calc(100vh - var(--nav-h));
  }

  /* ── LEFT SIDEBAR ── */
  .leftnav {
    width: 220px;
    flex-shrink: 0;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 24px 14px;
    position: sticky;
    top: var(--nav-h);
    height: calc(100vh - var(--nav-h));
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .leftnav::-webkit-scrollbar { display: none; }

  .leftnav-section { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-4); padding: 14px 10px 6px; }

  .leftnav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 9px;
    cursor: pointer;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink-2);
    transition: all 0.16s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: var(--font-ui);
    position: relative;
  }

  .leftnav-item:hover { background: var(--surface-2); color: var(--ink); }

  .leftnav-item.active {
    background: var(--khan-blue-xl);
    color: var(--khan-blue);
    font-weight: 700;
  }

  .leftnav-item.active::before {
    content: '';
    position: absolute;
    left: 0; top: 18%; bottom: 18%;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: var(--khan-blue);
  }

  .leftnav-icon { font-size: 15px; width: 20px; text-align: center; flex-shrink: 0; }

  .leftnav-badge {
    margin-left: auto;
    background: var(--red);
    color: white;
    font-size: 10px;
    font-weight: 800;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    padding: 0 4px;
  }

  .leftnav-bottom {
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .user-info {
    padding: 12px;
    border-radius: 10px;
    background: white;
    border: 1px solid var(--border);
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .user-avatar-sm {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--khan-blue-l), var(--khan-blue-dd));
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 13px; color: white; flex-shrink: 0;
  }

  .user-info-name { font-size: 13px; font-weight: 700; color: var(--ink); line-height: 1.2; }
  .user-info-plan { font-size: 11px; color: var(--ink-4); font-weight: 500; }

  /* ── MAIN CONTENT ── */
  .main {
    flex: 1;
    overflow: hidden;
    min-width: 0;
  }

  /* ── PAGE ── */
  .page { padding: 32px 36px; animation: pageIn 0.35s ease forwards; }
  @keyframes pageIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  /* ── PAGE HEADER ── */
  .page-hero {
    background: linear-gradient(135deg, var(--khan-blue-dd) 0%, var(--khan-blue) 60%, var(--khan-blue-l) 100%);
    padding: 36px 40px 40px;
    position: relative;
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
    margin: -32px -36px 32px;
  }

  .page-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  .page-hero-circle-1 {
    position: absolute; top: -60px; right: 60px;
    width: 280px; height: 280px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
    pointer-events: none;
  }

  .page-hero-circle-2 {
    position: absolute; bottom: -40px; right: -20px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(255,255,255,0.04);
    pointer-events: none;
  }

  .page-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: rgba(255,255,255,0.15);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 12px;
    position: relative;
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.2);
  }

  .page-hero-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 600;
    color: white;
    line-height: 1.2;
    letter-spacing: -0.5px;
    position: relative;
    max-width: 520px;
  }

  .page-hero-title em { font-style: italic; color: rgba(255,255,255,0.85); }

  .page-hero-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.7);
    margin-top: 8px;
    line-height: 1.6;
    font-weight: 400;
    position: relative;
    max-width: 420px;
  }

  .page-hero-actions {
    display: flex;
    gap: 10px;
    margin-top: 22px;
    position: relative;
  }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    padding: 10px 20px; border-radius: var(--radius-sm);
    font-family: var(--font-ui); font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
    border: none; outline: none; letter-spacing: -0.1px;
    position: relative; overflow: hidden;
  }

  .btn::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.2s;
  }

  .btn:hover::after { background: rgba(255,255,255,0.1); }

  .btn-khan {
    background: var(--khan-blue);
    color: white;
    box-shadow: 0 2px 8px rgba(24,101,242,0.35), 0 1px 2px rgba(0,0,0,0.1);
  }
  .btn-khan:hover { background: var(--khan-blue-d); box-shadow: 0 4px 16px rgba(24,101,242,0.45); transform: translateY(-1px); }
  .btn-khan:active { transform: translateY(0); }

  .btn-white {
    background: white;
    color: var(--khan-blue);
    box-shadow: var(--shadow-sm);
  }
  .btn-white:hover { background: var(--khan-blue-xs); box-shadow: var(--shadow); transform: translateY(-1px); }

  .btn-ghost-blue {
    background: rgba(255,255,255,0.15);
    color: white;
    border: 1.5px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(4px);
  }
  .btn-ghost-blue:hover { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.5); }

  .btn-outline {
    background: white;
    color: var(--khan-blue);
    border: 2px solid var(--khan-blue-xl);
  }
  .btn-outline:hover { background: var(--khan-blue-xs); border-color: var(--khan-blue); transform: translateY(-1px); }

  .btn-ghost {
    background: var(--surface);
    color: var(--ink-2);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { background: var(--surface-2); color: var(--ink); }

  .btn-green {
    background: var(--green);
    color: white;
    box-shadow: 0 2px 8px rgba(27,138,76,0.3);
  }
  .btn-green:hover { background: var(--green-l); box-shadow: 0 4px 16px rgba(27,138,76,0.4); transform: translateY(-1px); }

  .btn-sm  { padding: 7px 14px; font-size: 12.5px; border-radius: var(--radius-xs); }
  .btn-lg  { padding: 13px 28px; font-size: 15px; border-radius: var(--radius-sm); }
  .btn-xl  { padding: 16px 36px; font-size: 16px; border-radius: var(--radius); }
  .btn-block { width: 100%; }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

  /* ── CARDS ── */
  .card {
    background: var(--canvas);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .card:hover { box-shadow: var(--shadow-sm); }

  .card-lift:hover { box-shadow: var(--shadow); transform: translateY(-2px); }

  .card-khan {
    background: linear-gradient(135deg, var(--khan-blue-dd), var(--khan-blue));
    border: none;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .card-khan::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 22px 22px;
    pointer-events: none;
  }

  .card-header {
    padding: 18px 22px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .card-icon {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: var(--khan-blue-xl);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 600;
    flex: 1;
    letter-spacing: -0.2px;
  }

  .card-body { padding: 22px; }

  /* ── STAT UNITS ── */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }

  .stat-unit {
    background: var(--canvas);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .stat-unit:hover { box-shadow: var(--shadow); transform: translateY(-2px); }

  .stat-unit-stripe {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 3px 3px 0 0;
  }

  .stripe-blue  { background: var(--khan-blue); }
  .stripe-green { background: var(--green); }
  .stripe-gold  { background: var(--gold); }
  .stripe-ink   { background: var(--ink-2); }

  .stat-unit-icon {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .stat-unit-label { font-size: 11px; font-weight: 800; color: var(--ink-4); text-transform: uppercase; letter-spacing: 0.8px; }
  .stat-unit-value { font-family: var(--font-display); font-size: 30px; font-weight: 600; color: var(--ink); letter-spacing: -1.5px; line-height: 1; margin: 4px 0 2px; }
  .stat-unit-sub   { font-size: 12px; color: var(--ink-3); font-weight: 500; }

  /* ── MASTERY TRACK ── */
  .mastery-track { display: flex; flex-direction: column; gap: 14px; }

  .mastery-row {
    display: grid;
    grid-template-columns: 120px 1fr 44px;
    align-items: center;
    gap: 14px;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    transition: background 0.15s;
  }

  .mastery-row:hover { background: var(--surface); }

  .mastery-label { font-size: 13px; font-weight: 600; color: var(--ink); }
  .mastery-bar-outer { height: 8px; background: var(--surface-2); border-radius: 100px; overflow: hidden; }
  .mastery-bar-inner {
    height: 100%;
    background: linear-gradient(90deg, var(--green) 0%, var(--green-l) 100%);
    border-radius: 100px;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 1px 4px rgba(27,138,76,0.3);
  }
  .mastery-pct { font-size: 12px; font-weight: 800; color: var(--green); text-align: right; }

  /* ── CHAT ── */
  .chat-wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--nav-h) - 56px);
    max-height: 760px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  .chat-header {
    background: white;
    padding: 16px 22px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .chat-ai-avatar {
    width: 38px; height: 38px;
    border-radius: 11px;
    background: linear-gradient(135deg, var(--khan-blue), var(--khan-blue-dd));
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 13px;
    font-style: italic;
    color: white;
    box-shadow: 0 4px 12px rgba(24,101,242,0.3);
    flex-shrink: 0;
  }

  .chat-header-info { flex: 1; }
  .chat-header-title { font-family: var(--font-display); font-size: 15px; font-weight: 600; letter-spacing: -0.2px; }
  .chat-header-sub   { font-size: 12px; color: var(--ink-3); margin-top: 1px; }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: var(--surface);
  }

  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 4px; }

  .msg { display: flex; gap: 11px; max-width: 78%; }
  .msg-ai   { align-self: flex-start; }
  .msg-user { align-self: flex-end; flex-direction: row-reverse; }

  .msg-avatar {
    width: 32px; height: 32px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800;
    flex-shrink: 0; margin-top: 2px;
  }

  .msg-avatar-ai   { background: var(--khan-blue); color: white; font-family: var(--font-display); font-style: italic; }
  .msg-avatar-user { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; }

  .msg-bubble {
    padding: 12px 16px;
    font-size: 14px;
    line-height: 1.7;
    font-weight: 400;
  }

  .msg-bubble-ai {
    background: white;
    border: 1px solid var(--border);
    border-radius: 3px 14px 14px 14px;
    color: var(--ink);
    box-shadow: var(--shadow-xs);
    font-family: var(--font-ui);
  }

  .msg-bubble-user {
    background: var(--khan-blue);
    color: rgba(255,255,255,0.95);
    border-radius: 14px 3px 14px 14px;
    box-shadow: 0 4px 14px rgba(24,101,242,0.3);
    font-weight: 500;
  }

  .confusion-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 22px;
    background: var(--khan-blue-xs);
    border-bottom: 1px solid var(--khan-blue-xl);
    font-size: 12px;
    font-weight: 600;
    color: var(--khan-blue-d);
  }

  .c-dot { width: 7px; height: 7px; border-radius: 50%; }
  .c-low  { background: var(--green); }
  .c-mid  { background: var(--gold); }
  .c-high { background: var(--red); }

  .chat-footer {
    padding: 14px 20px 18px;
    border-top: 1px solid var(--border);
    background: white;
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .chat-input {
    flex: 1;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1.5px solid var(--border-2);
    background: var(--surface);
    font-family: var(--font-ui);
    font-size: 14px;
    resize: none;
    outline: none;
    line-height: 1.55;
    min-height: 46px;
    max-height: 130px;
    transition: all 0.18s;
    color: var(--ink);
  }

  .chat-input:focus { border-color: var(--khan-blue); background: white; box-shadow: 0 0 0 3px rgba(24,101,242,0.1); }
  .chat-input::placeholder { color: var(--ink-4); }

  .chat-send {
    width: 46px; height: 46px;
    border-radius: 12px;
    background: var(--khan-blue);
    color: white;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(24,101,242,0.35);
  }

  .chat-send:hover { background: var(--khan-blue-d); transform: scale(1.06); box-shadow: 0 6px 18px rgba(24,101,242,0.4); }
  .chat-send:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }

  .typing { display: flex; gap: 4px; padding: 12px 14px; }
  .t-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ink-4); animation: tBounce 1.2s infinite ease-in-out; }
  .t-dot:nth-child(2) { animation-delay: 0.2s; }
  .t-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes tBounce { 0%,60%,100% { transform: translateY(0); opacity: 0.3; } 30% { transform: translateY(-7px); opacity: 1; } }

  /* ── INPUTS ── */
  .input, .textarea, .select {
    width: 100%;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border-2);
    background: var(--canvas);
    font-family: var(--font-ui);
    font-size: 14px;
    font-weight: 400;
    color: var(--ink);
    transition: all 0.18s;
    outline: none;
  }

  .input:focus, .textarea:focus, .select:focus {
    border-color: var(--khan-blue);
    box-shadow: 0 0 0 3px rgba(24,101,242,0.1);
    background: white;
  }

  .input::placeholder, .textarea::placeholder { color: var(--ink-4); }
  .textarea { resize: vertical; min-height: 100px; line-height: 1.65; }

  .label { display: block; font-size: 12px; font-weight: 700; color: var(--ink-2); margin-bottom: 6px; letter-spacing: 0.2px; }
  .field { margin-bottom: 18px; }

  /* ── BLOOM TAGS ── */
  .btag { display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 100px; font-size: 10px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
  .b1 { background: #dbeafe; color: #1d4ed8; }
  .b2 { background: #d1fae5; color: #065f46; }
  .b3 { background: #fef3c7; color: #92400e; }
  .b4 { background: #fee2e2; color: #991b1b; }
  .b5 { background: #ede9fe; color: #5b21b6; }
  .b6 { background: #fce7f3; color: #9d174d; }

  /* ── TABS ── */
  .tabs-bar {
    display: flex;
    gap: 0;
    border-bottom: 2px solid var(--border);
    margin-bottom: 24px;
  }

  .tab-btn {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink-3);
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--font-ui);
    transition: all 0.18s;
    position: relative;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
  }

  .tab-btn:hover { color: var(--khan-blue); }
  .tab-btn.active { color: var(--khan-blue); border-bottom-color: var(--khan-blue); }

  /* ── QUIZ ── */
  .q-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    box-shadow: var(--shadow-sm);
  }

  .q-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .q-num { font-size: 12px; font-weight: 800; color: var(--khan-blue); text-transform: uppercase; letter-spacing: 1px; }
  .q-text { font-family: var(--font-display); font-size: 18px; line-height: 1.55; font-weight: 500; color: var(--ink); }

  .options { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }

  .opt {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: var(--radius-sm);
    border: 2px solid var(--border-2);
    cursor: pointer;
    transition: all 0.18s;
    font-size: 14px;
    font-weight: 500;
    background: white;
    color: var(--ink);
  }

  .opt:hover { border-color: var(--khan-blue); background: var(--khan-blue-xs); color: var(--khan-blue-d); }
  .opt.sel     { border-color: var(--khan-blue); background: var(--khan-blue); color: white; }
  .opt.correct { border-color: var(--green); background: var(--green-xl); color: var(--green); }
  .opt.wrong   { border-color: var(--red); background: var(--red-xl); color: var(--red); }

  .opt-letter {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: var(--surface-2);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800;
    color: var(--ink-2);
    flex-shrink: 0;
    transition: all 0.18s;
  }

  .opt.sel     .opt-letter { background: rgba(255,255,255,0.2); color: white; }
  .opt.correct .opt-letter { background: var(--green); color: white; }
  .opt.wrong   .opt-letter { background: var(--red); color: white; }

  .feedback-box {
    margin-top: 20px;
    padding: 16px 20px;
    background: var(--khan-blue-xs);
    border-radius: var(--radius-sm);
    border-left: 3px solid var(--khan-blue);
    font-size: 14px;
    line-height: 1.65;
    color: var(--ink-2);
    animation: fadeUp 0.3s ease;
  }

  /* ── PROGRESS BAR ── */
  .progress-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .progress-outer { height: 6px; background: var(--surface-2); border-radius: 100px; overflow: hidden; }
  .progress-inner { height: 100%; background: linear-gradient(90deg, var(--khan-blue-l), var(--khan-blue)); border-radius: 100px; transition: width 0.6s ease; box-shadow: 0 1px 4px rgba(24,101,242,0.25); }

  /* ── EXAM ITEMS ── */
  .exam-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: white;
    margin-bottom: 10px;
    transition: all 0.18s;
    cursor: pointer;
  }

  .exam-row:hover { box-shadow: var(--shadow); transform: translateY(-1px); border-color: var(--border-2); }

  .exam-date-box {
    width: 50px; height: 50px;
    border-radius: 12px;
    background: var(--khan-blue);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(24,101,242,0.25);
  }

  .exam-day   { font-family: var(--font-display); font-size: 18px; font-weight: 600; line-height: 1; color: white; }
  .exam-month { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  .exam-row-info { flex: 1; }
  .exam-row-name { font-weight: 700; font-size: 14px; color: var(--ink); }
  .exam-row-sub  { font-size: 12px; color: var(--ink-3); margin-top: 2px; font-weight: 500; }

  .days-pill { padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; }
  .dp-urgent { background: var(--red-xl); color: var(--red); }
  .dp-soon   { background: var(--gold-xl); color: var(--gold); }
  .dp-ok     { background: var(--green-xl); color: var(--green); }

  /* ── WORKSHEET PREVIEW ── */
  .ws-doc {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  .ws-doc-top {
    background: linear-gradient(135deg, var(--khan-blue-dd) 0%, var(--khan-blue) 100%);
    padding: 26px 30px;
    position: relative;
    overflow: hidden;
  }

  .ws-doc-top::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .ws-doc-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; color: white; position: relative; font-style: italic; }
  .ws-doc-meta  { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 6px; position: relative; }
  .ws-doc-tags  { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; position: relative; }

  .ws-doc-body { padding: 28px 30px; }

  .ws-q { padding: 16px 0; border-bottom: 1px solid var(--border); }
  .ws-q:last-child { border-bottom: none; }
  .ws-q-row { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; }
  .ws-q-n { font-weight: 800; color: var(--khan-blue); font-size: 13px; width: 24px; flex-shrink: 0; }
  .ws-q-t { font-size: 14px; line-height: 1.6; font-weight: 500; }
  .ws-opts { padding-left: 34px; display: flex; flex-direction: column; gap: 4px; margin-top: 6px; }
  .ws-opt { font-size: 13px; color: var(--ink-2); }

  .ws-key {
    margin-top: 24px;
    padding: 18px 22px;
    background: var(--green-xs);
    border-radius: var(--radius-sm);
    border: 1px solid var(--green-xl);
  }

  .ws-key-title { font-size: 11px; font-weight: 800; color: var(--green); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .ws-key-row { font-size: 13px; color: var(--ink-2); margin-bottom: 4px; display: flex; gap: 8px; }
  .ws-key-n { font-weight: 800; color: var(--ink); width: 22px; }

  /* ── NOTIFICATION ── */
  .notif {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 18px;
    background: linear-gradient(135deg, var(--khan-blue-dd), var(--khan-blue));
    color: white; border-radius: var(--radius-sm);
    margin-bottom: 24px;
    box-shadow: var(--shadow);
    animation: fadeUp 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .notif::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 18px 18px;
  }

  .notif-icon { font-size: 20px; position: relative; }
  .notif-text { font-size: 13.5px; flex: 1; line-height: 1.5; font-weight: 500; position: relative; }
  .notif-em   { color: #fde68a; font-weight: 800; }

  /* ── SCORE ── */
  .score-circle {
    width: 110px; height: 110px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center; flex-direction: column;
    font-family: var(--font-display); font-size: 28px; font-weight: 600;
    border: 4px solid; letter-spacing: -1px;
  }

  .score-lbl { font-family: var(--font-ui); font-size: 11px; font-weight: 700; opacity: 0.6; margin-top: 2px; letter-spacing: 0.3px; }
  .s-great { border-color: var(--green); color: var(--green); background: var(--green-xs); }
  .s-ok    { border-color: var(--khan-blue); color: var(--khan-blue); background: var(--khan-blue-xs); }
  .s-low   { border-color: var(--red); color: var(--red); background: var(--red-xl); }

  /* ── EMPTY ── */
  .empty { text-align: center; padding: 52px 28px; }
  .empty-icon  { font-size: 48px; margin-bottom: 14px; }
  .empty-title { font-family: var(--font-display); font-size: 20px; font-weight: 600; color: var(--ink); margin-bottom: 8px; font-style: italic; }
  .empty-sub   { font-size: 14px; color: var(--ink-3); line-height: 1.65; max-width: 300px; margin: 0 auto; }

  /* ── LOADING ── */
  .ldots span { display: inline-block; width: 7px; height: 7px; background: var(--khan-blue-l); border-radius: 50%; margin: 0 2px; animation: ldotPulse 1.2s infinite ease-in-out; }
  .ldots span:nth-child(2) { animation-delay: 0.2s; }
  .ldots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes ldotPulse { 0%,60%,100% { opacity: 0.2; transform: scale(0.8); } 30% { opacity: 1; transform: scale(1.1); } }

  /* ── PREP PLAN ── */
  .prep-row { display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--border); align-items: flex-start; }
  .prep-row:last-child { border-bottom: none; }
  .prep-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .prep-text { font-size: 13px; font-weight: 500; color: var(--ink-2); flex: 1; line-height: 1.5; }
  .prep-text.today { color: var(--ink); font-weight: 700; }

  /* ── GRID ── */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; }

  /* ── ONBOARDING MODAL ── */
  .ov {
    position: fixed; inset: 0;
    background: rgba(14,24,55,0.65);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(8px);
  }

  .o-card {
    background: white;
    border-radius: 22px;
    width: 480px;
    max-width: 95vw;
    overflow: hidden;
    box-shadow: var(--shadow-xl);
    animation: scaleUp 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
  }

  @keyframes scaleUp { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .o-hero {
    background: linear-gradient(135deg, var(--khan-blue-dd) 0%, var(--khan-blue) 65%, var(--khan-blue-l) 100%);
    padding: 34px 36px 30px;
    position: relative;
    overflow: hidden;
  }

  .o-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 22px 22px;
  }

  .o-hero-ball {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    pointer-events: none;
  }

  .o-step-pill {
    display: inline-flex; padding: 4px 12px;
    background: rgba(255,255,255,0.15); border-radius: 100px;
    font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.85);
    letter-spacing: 0.5px; margin-bottom: 14px; position: relative;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .o-title { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: white; line-height: 1.2; position: relative; font-style: italic; }
  .o-sub   { font-size: 14.5px; color: rgba(255,255,255,0.68); margin-top: 8px; line-height: 1.6; position: relative; }
  .o-emoji { font-size: 40px; margin-bottom: 12px; position: relative; display: block; }

  .o-body { padding: 28px 32px 32px; }

  /* ── BLOOM FILTER CHIPS ── */
  .bloom-chip {
    padding: 6px 14px;
    border-radius: 100px;
    border: 2px solid;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    font-family: var(--font-ui);
    transition: all 0.18s;
  }

  .bloom-chip-off { border-color: var(--border-2); background: white; color: var(--ink-3); }
  .bloom-chip-off:hover { border-color: var(--khan-blue); color: var(--khan-blue); }
  .bloom-chip-on  { border-color: var(--khan-blue); background: var(--khan-blue); color: white; }

  /* ── STAGGER ANIMATIONS ── */
  .stagger > * { opacity: 0; animation: fadeUp 0.45s ease forwards; }
  .stagger > *:nth-child(1) { animation-delay: 0.05s; }
  .stagger > *:nth-child(2) { animation-delay: 0.10s; }
  .stagger > *:nth-child(3) { animation-delay: 0.15s; }
  .stagger > *:nth-child(4) { animation-delay: 0.20s; }
  .stagger > *:nth-child(5) { animation-delay: 0.25s; }
  .stagger > *:nth-child(6) { animation-delay: 0.30s; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 1100px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
    .g2 { grid-template-columns: 1fr; }
  }
`;

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const BLOOMS = [
  { id: 1, name: "Remember",   cls: "b1" },
  { id: 2, name: "Understand", cls: "b2" },
  { id: 3, name: "Apply",      cls: "b3" },
  { id: 4, name: "Analyze",    cls: "b4" },
  { id: 5, name: "Evaluate",   cls: "b5" },
  { id: 6, name: "Create",     cls: "b6" },
];

const SUBJECTS = ["Mathematics","Physics","Chemistry","Biology","History","Literature",
  "Economics","Psychology","Computer Science","Philosophy","Statistics","Engineering"];

const INIT_MASTERY = {
  Mathematics: 0.62, Physics: 0.45, Chemistry: 0.38,
  Biology: 0.71, History: 0.55, Economics: 0.29,
};

const INIT_EXAMS = [
  { id: 1, name: "Midterm Exam",  subject: "Chemistry",   date: new Date(Date.now() + 3 * 86400000) },
  { id: 2, name: "Final Project", subject: "Economics",   date: new Date(Date.now() + 8 * 86400000) },
  { id: 3, name: "Quiz 3",        subject: "Mathematics", date: new Date(Date.now() + 14 * 86400000) },
];

const NAV = [
  { id: "dashboard", icon: "⊞",  label: "Dashboard" },
  { id: "tutor",     icon: "🎓", label: "AI Tutor" },
  { id: "worksheet", icon: "📄", label: "Worksheets" },
  { id: "quiz",      icon: "✏️", label: "Quizzes" },
  { id: "calendar",  icon: "📅", label: "Exam Calendar" },
];

// ── API ────────────────────────────────────────────────────────────────────
async function claude(messages, system) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
  });
  const d = await r.json();
  return d.content?.map(b => b.text || "").join("") || "Sorry, couldn't connect.";
}

// ── UTILS ──────────────────────────────────────────────────────────────────
const daysUntil  = d => Math.ceil((new Date(d) - Date.now()) / 86400000);
const fmtDate    = d => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const daysClass  = d => d <= 3 ? "dp-urgent" : d <= 7 ? "dp-soon" : "dp-ok";
const confLevel  = (fu, total) => !total ? "low" : fu/total > 0.5 ? "high" : fu/total > 0.25 ? "mid" : "low";
const isFollowUp = t => ["what","why","how","don't understand","confused","again","explain","clarify","?"].some(w => t.toLowerCase().includes(w));

function tutorSys(subject, topic, mastery, conf) {
  const depth = { low: "detailed", mid: "standard", high: "simple" }[conf];
  return `Expert academic tutor. Subject: ${subject||"general"}. ${topic?"Topic: "+topic+".":""} Mastery: ${Math.round((mastery||.5)*100)}%. Depth: ${depth}.
${depth==="simple"?"Use everyday analogies, short sentences, zero jargon.":""}
${depth==="detailed"?"Full technical depth, multiple examples, edge cases.":""}
Rules: guide with questions, never give answers outright. Under 200 words. Acknowledge correct answers specifically. Never complete assignments.`;
}

// ── SUB-COMPONENTS ─────────────────────────────────────────────────────────
function MasteryRow({ label, score }) {
  return (
    <div className="mastery-row">
      <span className="mastery-label">{label}</span>
      <div className="mastery-bar-outer">
        <div className="mastery-bar-inner" style={{ width: `${score * 100}%` }} />
      </div>
      <span className="mastery-pct">{Math.round(score * 100)}%</span>
    </div>
  );
}

function BTag({ level }) {
  const b = BLOOMS.find(x => x.id === level) || BLOOMS[0];
  return <span className={`btag ${b.cls}`}>{b.name}</span>;
}

// ── DASHBOARD ──────────────────────────────────────────────────────────────
function Dashboard({ mastery, exams, onNav, user }) {
  const total    = Object.keys(mastery).length;
  const mastered = Object.values(mastery).filter(v => v >= .8).length;
  const avg      = total ? Math.round(Object.values(mastery).reduce((a,b)=>a+b,0)/total*100) : 0;
  const urgent   = exams.filter(e => daysUntil(e.date) <= 7);

  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-circle-1" />
        <div className="page-hero-circle-2" />
        <div className="page-hero-eyebrow">✦ Your Study Dashboard</div>
        <h1 className="page-hero-title">
          {user ? <>Good to see you, <em>{user.name.split(" ")[0]}</em>.</> : <>Welcome back.</>}
        </h1>
        <p className="page-hero-sub">Your personalized study overview — mastery progress, upcoming exams, and daily learning recommendations.</p>
        <div className="page-hero-actions">
          <button className="btn btn-white btn-lg" onClick={() => onNav("tutor")}>🎓 Start Tutoring</button>
          <button className="btn btn-ghost-blue" onClick={() => onNav("quiz")}>✏️ Quick Quiz</button>
        </div>
      </div>

      {urgent.length > 0 && (
        <div className="notif">
          <span className="notif-icon">🔔</span>
          <span className="notif-text"><span className="notif-em">Exam alert — </span>{urgent.length} exam{urgent.length>1?"s":""} within 7 days: {urgent.map(e=>e.subject).join(", ")}.</span>
          <button className="btn btn-ghost-blue btn-sm" onClick={() => onNav("quiz")}>Practice Now</button>
        </div>
      )}

      <div className="stat-grid stagger">
        {[
          { stripe: "stripe-blue",  icon: "🧠", label: "Avg Mastery",     val: `${avg}%`,   sub: `${total} subjects tracked` },
          { stripe: "stripe-green", icon: "⭐", label: "Mastered",         val: mastered,    sub: `of ${total} subjects` },
          { stripe: "stripe-gold",  icon: "📅", label: "Upcoming Exams",   val: exams.length,sub: `${urgent.length} urgent this week` },
          { stripe: "stripe-ink",   icon: "🔥", label: "Study Streak",     val: "4 days",    sub: "Keep the momentum" },
        ].map((s, i) => (
          <div key={i} className="stat-unit">
            <div className={`stat-unit-stripe ${s.stripe}`} />
            <div className="stat-unit-icon">{s.icon}</div>
            <div className="stat-unit-label">{s.label}</div>
            <div className="stat-unit-value">{s.val}</div>
            <div className="stat-unit-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🧠</div>
            <span className="card-title">Mastery by Subject</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-3)", background: "var(--surface)", padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)" }}>{total} subjects</span>
          </div>
          <div className="card-body">
            <div className="mastery-track">
              {Object.entries(mastery).map(([s, v]) => <MasteryRow key={s} label={s} score={v} />)}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-icon">📅</div>
              <span className="card-title">Upcoming Exams</span>
            </div>
            <div style={{ padding: "14px 18px" }}>
              {exams.slice(0, 3).map(e => {
                const d = daysUntil(e.date);
                return (
                  <div key={e.id} className="exam-row">
                    <div className="exam-date-box">
                      <div className="exam-day">{new Date(e.date).getDate()}</div>
                      <div className="exam-month">{new Date(e.date).toLocaleString("en-US",{month:"short"})}</div>
                    </div>
                    <div className="exam-row-info">
                      <div className="exam-row-name">{e.name}</div>
                      <div className="exam-row-sub">{e.subject}</div>
                    </div>
                    <span className={`days-pill ${daysClass(d)}`}>{d}d</span>
                  </div>
                );
              })}
              <button className="btn btn-outline btn-sm btn-block" style={{ marginTop: 8, justifyContent: "center" }} onClick={() => onNav("calendar")}>
                View all exams →
              </button>
            </div>
          </div>

          <div className="card card-khan">
            <div className="card-body" style={{ position: "relative", padding: "24px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "white", marginBottom: 6, fontStyle: "italic" }}>Ready to study?</div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 20 }}>Your AI tutor adapts to your understanding — the more you use it, the smarter it gets about <em>your</em> gaps.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "🎓 Start AI Tutor Session", page: "tutor", primary: true },
                  { label: "📄 Generate Worksheet",    page: "worksheet", primary: false },
                  { label: "✏️ Take Practice Quiz",    page: "quiz",      primary: false },
                ].map((b, i) => (
                  <button key={i} className={`btn ${b.primary ? "btn-white" : "btn-ghost-blue"}`} style={{ justifyContent: "flex-start" }} onClick={() => onNav(b.page)}>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI TUTOR ───────────────────────────────────────────────────────────────
function Tutor({ mastery, onMasteryUpdate }) {
  const [msgs, setMsgs]   = useState([{ role: "assistant", content: "Hi! I'm your AI tutor. What subject and topic would you like to explore today? I'll adapt how I explain things based on how you're understanding." }]);
  const [input, setInput] = useState("");
  const [busy, setBusy]   = useState(false);
  const [subj, setSubj]   = useState("");
  const [topic, setTopic] = useState("");
  const [fu, setFu]       = useState(0);
  const [tm, setTm]       = useState(0);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const conf = confLevel(fu, tm);
  const confLabel = { low: "Understanding well", mid: "Some confusion — adjusting depth", high: "High confusion — simplifying now" }[conf];
  const confDotCls = { low: "c-low", mid: "c-mid", high: "c-high" }[conf];

  const send = async () => {
    if (!input.trim() || busy) return;
    const um = { role: "user", content: input.trim() };
    const next = [...msgs, um];
    setMsgs(next); setInput(""); setBusy(true);
    const newTm = tm + 1;
    const newFu = isFollowUp(input) ? fu + 1 : fu;
    setTm(newTm); setFu(newFu);
    const sys = tutorSys(subj, topic, subj ? mastery[subj] || .5 : .5, confLevel(newFu, newTm));
    try {
      const reply = await claude(next.map(m => ({ role: m.role, content: m.content })), sys);
      setMsgs(p => [...p, { role: "assistant", content: reply }]);
      if (subj && mastery[subj] != null) onMasteryUpdate(subj, Math.min(1, mastery[subj] + .02));
    } catch { setMsgs(p => [...p, { role: "assistant", content: "Trouble connecting. Please try again." }]); }
    setBusy(false);
  };

  return (
    <div className="page" style={{ padding: "20px 28px" }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <select className="select" style={{ width: "auto", minWidth: 150 }} value={subj} onChange={e => setSubj(e.target.value)}>
          <option value="">Select subject…</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input className="input" style={{ flex: 1, minWidth: 180, maxWidth: 280 }} placeholder="Topic (optional)" value={topic} onChange={e => setTopic(e.target.value)} />
        {tm > 2 && <span style={{ fontSize: 12, fontWeight: 700, color: conf === "high" ? "var(--red)" : conf === "mid" ? "var(--gold)" : "var(--green)", background: conf === "high" ? "var(--red-xl)" : conf === "mid" ? "var(--gold-xl)" : "var(--green-xl)", padding: "5px 12px", borderRadius: 100, display: "flex", gap: 6, alignItems: "center" }}><span className={`c-dot ${confDotCls}`} />{confLabel}</span>}
      </div>

      <div className="chat-wrap">
        <div className="chat-header">
          <div className="chat-ai-avatar">AI</div>
          <div className="chat-header-info">
            <div className="chat-header-title">AI Tutor{subj ? ` — ${subj}` : ""}</div>
            <div className="chat-header-sub">Explanation depth adapts to your understanding in real time</div>
          </div>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 0 3px var(--green-xl)", flexShrink: 0 }} />
        </div>

        <div className="chat-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.role === "assistant" ? "msg-ai" : "msg-user"}`} style={{ animation: `fadeUp 0.3s ease ${i * 0.04}s forwards`, opacity: 0 }}>
              <div className={`msg-avatar ${m.role === "assistant" ? "msg-avatar-ai" : "msg-avatar-user"}`}>{m.role === "assistant" ? "AI" : "U"}</div>
              <div className={`msg-bubble ${m.role === "assistant" ? "msg-bubble-ai" : "msg-bubble-user"}`} style={{ whiteSpace: "pre-wrap" }}>{m.content}</div>
            </div>
          ))}
          {busy && (
            <div className="msg msg-ai">
              <div className="msg-avatar msg-avatar-ai">AI</div>
              <div className="msg-bubble msg-bubble-ai"><div className="typing"><div className="t-dot"/><div className="t-dot"/><div className="t-dot"/></div></div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="chat-footer">
          <textarea className="chat-input" placeholder="Ask anything about your subject…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} rows={1} />
          <button className="chat-send" onClick={send} disabled={!input.trim() || busy}>↑</button>
        </div>
      </div>
    </div>
  );
}

// ── WORKSHEET GENERATOR ────────────────────────────────────────────────────
function Worksheet() {
  const [mode, setMode]   = useState("topic");
  const [subj, setSubj]   = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [numQ, setNumQ]   = useState("8");
  const [qt, setQt]       = useState("mixed");
  const [bls, setBls]     = useState([1, 2, 3]);
  const [busy, setBusy]   = useState(false);
  const [ws, setWs]       = useState(null);

  const toggleB = id => setBls(p => p.includes(id) ? p.filter(b => b !== id) : [...p, id]);

  const gen = async () => {
    if (!subj || (!topic && !notes)) return;
    setBusy(true); setWs(null);
    const blNames = bls.map(id => BLOOMS.find(b => b.id === id)?.name).join(", ");
    const prompt = `Generate a structured academic worksheet.
Subject: ${subj}. ${mode==="notes"?`From notes:\n\n${notes}`:`Topic: ${topic}`}
Questions: ${numQ}, Types: ${qt}, Bloom's: ${blNames}
Return ONLY valid JSON:
{"title":"...","subject":"${subj}","topic":"${topic||"From notes"}","estimatedMinutes":20,"sections":[{"bloomLevel":1,"bloomName":"Remember","questions":[{"number":1,"type":"mcq","text":"...","options":["A) ...","B) ...","C) ...","D) ..."],"answer":"A","explanation":"..."}]}]}
No markdown, no backticks, no explanation.`;
    try {
      const raw = await claude([{ role: "user", content: prompt }], "Expert academic content creator. Return ONLY valid JSON, nothing else.");
      setWs(JSON.parse(raw.replace(/```json|```/g, "").trim()));
    } catch { setWs({ error: true }); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-circle-1" /><div className="page-hero-circle-2" />
        <div className="page-hero-eyebrow">✦ Worksheet Generator</div>
        <h1 className="page-hero-title">Build a <em>practice worksheet</em> in seconds.</h1>
        <p className="page-hero-sub">Enter a topic or paste your notes — we'll generate structured questions with answer key, auto-tagged by Bloom's taxonomy.</p>
      </div>

      <div className="g2" style={{ alignItems: "start" }}>
        <div className="card">
          <div className="card-header"><div className="card-icon">⚙️</div><span className="card-title">Configuration</span></div>
          <div className="card-body">
            <div className="tabs-bar">
              <button className={`tab-btn ${mode==="topic"?"active":""}`} onClick={() => setMode("topic")}>By Topic</button>
              <button className={`tab-btn ${mode==="notes"?"active":""}`} onClick={() => setMode("notes")}>From My Notes</button>
            </div>
            <div className="field"><label className="label">Subject</label>
              <select className="select" value={subj} onChange={e => setSubj(e.target.value)}>
                <option value="">Select subject…</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {mode === "topic"
              ? <div className="field"><label className="label">Topic</label><input className="input" placeholder="e.g. Mitosis and Cell Division" value={topic} onChange={e => setTopic(e.target.value)} /></div>
              : <div className="field"><label className="label">Paste Your Notes</label><textarea className="textarea" style={{ minHeight: 130 }} placeholder="Paste lecture notes, textbook excerpts, or any study material…" value={notes} onChange={e => setNotes(e.target.value)} /></div>
            }
            <div className="g2">
              <div className="field"><label className="label">Questions</label>
                <select className="select" value={numQ} onChange={e => setNumQ(e.target.value)}>
                  {[5,8,10,15,20].map(n => <option key={n} value={n}>{n} questions</option>)}
                </select>
              </div>
              <div className="field"><label className="label">Question Types</label>
                <select className="select" value={qt} onChange={e => setQt(e.target.value)}>
                  <option value="mixed">Mixed</option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="short_answer">Short Answer</option>
                  <option value="problem_solving">Problem Solving</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Bloom's Taxonomy Levels</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {BLOOMS.map(b => (
                  <button key={b.id} className={`bloom-chip ${bls.includes(b.id)?"bloom-chip-on":"bloom-chip-off"}`} onClick={() => toggleB(b.id)}>{b.name}</button>
                ))}
              </div>
            </div>
            <button className="btn btn-khan btn-lg btn-block" onClick={gen} disabled={busy || !subj || (!topic && !notes)}>
              {busy ? "Generating…" : "✨ Generate Worksheet"}
            </button>
          </div>
        </div>

        <div>
          {busy && (
            <div className="card" style={{ padding: 56, textAlign: "center" }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>⚙️</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, fontStyle: "italic", marginBottom: 8 }}>Crafting your worksheet…</div>
              <div style={{ color: "var(--ink-3)", fontSize: 14 }}>Generating questions across Bloom's levels</div>
              <div className="ldots" style={{ marginTop: 20 }}><span /><span /><span /></div>
            </div>
          )}
          {ws?.error && <div className="card" style={{ padding: 36, textAlign: "center" }}><div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div><div style={{ fontWeight: 700 }}>Generation failed. Please try again.</div></div>}
          {ws && !ws.error && (
            <div className="ws-doc" style={{ animation: "scaleUp 0.3s ease" }}>
              <div className="ws-doc-top">
                <div className="ws-doc-title">{ws.title}</div>
                <div className="ws-doc-meta">{ws.subject} · {ws.topic} · Est. {ws.estimatedMinutes} min</div>
                <div className="ws-doc-tags">{ws.sections?.map(s => <BTag key={s.bloomLevel} level={s.bloomLevel} />)}</div>
              </div>
              <div className="ws-doc-body">
                {ws.sections?.flatMap(sec => sec.questions?.map((q, i) => (
                  <div key={`${sec.bloomLevel}-${i}`} className="ws-q">
                    <div className="ws-q-row">
                      <span className="ws-q-n">Q{q.number}.</span>
                      <div style={{ flex: 1 }}><BTag level={sec.bloomLevel} /><div className="ws-q-t" style={{ marginTop: 6 }}>{q.text}</div></div>
                    </div>
                    {q.options && <div className="ws-opts">{q.options.map((o, oi) => <div key={oi} className="ws-opt">{o}</div>)}</div>}
                  </div>
                )))}
                <div className="ws-key">
                  <div className="ws-key-title">✓ Answer Key</div>
                  {ws.sections?.flatMap(sec => sec.questions?.map(q => (
                    <div key={`ak-${q.number}`} className="ws-key-row">
                      <span className="ws-key-n">{q.number}.</span>
                      <span><strong>{q.answer}</strong>{q.explanation ? ` — ${q.explanation}` : ""}</span>
                    </div>
                  )))}
                </div>
                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                  <button className="btn btn-khan btn-sm">⬇ Download PDF</button>
                  <button className="btn btn-outline btn-sm">⬇ Download DOCX</button>
                </div>
              </div>
            </div>
          )}
          {!ws && !busy && (
            <div className="card dot-grid"><div className="empty">
              <div className="empty-icon">📝</div>
              <div className="empty-title">Your worksheet will appear here</div>
              <div className="empty-sub">Configure settings and click Generate to create a structured worksheet with answer key</div>
            </div></div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── QUIZ ENGINE ────────────────────────────────────────────────────────────
function Quiz({ mastery, onMasteryUpdate }) {
  const [phase, setPhase]   = useState("setup");
  const [subj, setSubj]     = useState("");
  const [topic, setTopic]   = useState("");
  const [numQ, setNumQ]     = useState("5");
  const [qs, setQs]         = useState([]);
  const [cur, setCur]       = useState(0);
  const [sel, setSel]       = useState(null);
  const [answers, setAns]   = useState([]);
  const [revealed, setRev]  = useState(false);
  const [busy, setBusy]     = useState(false);
  const [fb, setFb]         = useState("");
  const [loadFb, setLoadFb] = useState(false);

  const genQuiz = async () => {
    if (!subj) return;
    setBusy(true);
    const prompt = `Generate a ${numQ}-question multiple choice quiz. Subject: ${subj}${topic?`. Topic: ${topic}`:""}.
Return ONLY valid JSON: {"questions":[{"id":1,"text":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":"A","explanation":"...","bloomLevel":2,"topic":"..."}]}
No backticks, no extra text.`;
    try {
      const raw = await claude([{ role: "user", content: prompt }], "Expert quiz designer. Return ONLY valid JSON.");
      const d = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setQs(d.questions); setAns([]); setCur(0); setSel(null); setRev(false); setFb("");
      setPhase("active");
    } catch { alert("Failed to generate quiz. Please try again."); }
    setBusy(false);
  };

  const getFb = async (q, userAns, correct) => {
    setLoadFb(true);
    try {
      const reply = await claude([{ role: "user", content: `Student answered ${correct?"correctly":"incorrectly"}. Q: ${q.text}. Correct: ${q.correct}. Student: ${userAns}. ${!correct?`Explanation: ${q.explanation}`:""} 1-2 sentence feedback. Under 50 words. Specific.` }], "Concise academic tutor. Direct and specific.");
      setFb(reply);
    } catch { setFb(""); }
    setLoadFb(false);
  };

  const pick = async opt => {
    if (revealed) return;
    setSel(opt); setRev(true);
    const letter = opt.charAt(0);
    const q = qs[cur];
    const ok = letter === q.correct;
    setAns(p => [...p, { qid: q.id, sel: letter, ok, bl: q.bloomLevel }]);
    await getFb(q, letter, ok);
  };

  const next = () => {
    if (cur + 1 >= qs.length) {
      const sc = answers.filter(a => a.ok).length / answers.length;
      if (subj && mastery[subj] != null) onMasteryUpdate(subj, Math.min(1, mastery[subj] + (sc - .5) * .1));
      setPhase("results");
    } else { setCur(p => p + 1); setSel(null); setRev(false); setFb(""); }
  };

  const score    = answers.filter(a => a.ok).length;
  const pct      = qs.length ? Math.round(score / qs.length * 100) : 0;
  const scClass  = pct >= 80 ? "s-great" : pct >= 60 ? "s-ok" : "s-low";

  if (phase === "setup") return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-circle-1" /><div className="page-hero-circle-2" />
        <div className="page-hero-eyebrow">✦ Practice Quiz</div>
        <h1 className="page-hero-title">Test your <em>understanding</em> before the exam.</h1>
        <p className="page-hero-sub">Questions are auto-tagged by Bloom's taxonomy level and difficulty adapts to your mastery data.</p>
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="card">
          <div className="card-header"><div className="card-icon">🎯</div><span className="card-title">Quiz Setup</span></div>
          <div className="card-body">
            <div className="field"><label className="label">Subject</label>
              <select className="select" value={subj} onChange={e => setSubj(e.target.value)}>
                <option value="">Choose subject…</option>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field"><label className="label">Topic (optional)</label><input className="input" placeholder="e.g. Newton's Laws of Motion" value={topic} onChange={e => setTopic(e.target.value)} /></div>
            <div className="field"><label className="label">Number of Questions</label>
              <select className="select" value={numQ} onChange={e => setNumQ(e.target.value)}>
                {[5,10,15,20].map(n => <option key={n} value={n}>{n} questions</option>)}
              </select>
            </div>
            {subj && mastery[subj] != null && (
              <div style={{ padding: "14px 16px", background: "var(--khan-blue-xs)", borderRadius: "var(--radius-sm)", marginBottom: 18, border: "1px solid var(--khan-blue-xl)" }}>
                <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.6px" }}>Your mastery in {subj}</div>
                <MasteryRow label={subj} score={mastery[subj]} />
              </div>
            )}
            <button className="btn btn-khan btn-lg btn-block" onClick={genQuiz} disabled={busy || !subj}>{busy ? "Building quiz…" : "🚀 Start Quiz"}</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (phase === "active") {
    const q = qs[cur];
    return (
      <div className="page" style={{ paddingTop: 28 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="progress-row">
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-2)" }}>Question {cur+1} of {qs.length}</span>
            <span style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 600 }}>{answers.filter(a=>a.ok).length} correct so far</span>
          </div>
          <div className="progress-outer" style={{ marginBottom: 24 }}>
            <div className="progress-inner" style={{ width: `${(cur/qs.length)*100}%` }} />
          </div>

          <div className="q-card" style={{ animation: "fadeUp 0.3s ease" }}>
            <div className="q-head"><span className="q-num">Question {q.id}</span><BTag level={q.bloomLevel} /></div>
            <div className="q-text">{q.text}</div>
            <div className="options">
              {q.options.map((opt, i) => {
                const letter = opt.charAt(0);
                let cls = "opt";
                if (revealed) { if (letter === q.correct) cls += " correct"; else if (opt === sel) cls += " wrong"; }
                else if (opt === sel) cls += " sel";
                return (
                  <div key={i} className={cls} onClick={() => pick(opt)}>
                    <div className="opt-letter">{letter}</div>
                    <span>{opt.slice(3)}</span>
                  </div>
                );
              })}
            </div>
            {revealed && (
              <div className="feedback-box">
                {loadFb
                  ? <div className="ldots"><span /><span /><span /></div>
                  : <><strong style={{ color: sel?.charAt(0) === q.correct ? "var(--green)" : "var(--red)" }}>{sel?.charAt(0) === q.correct ? "✓ Correct. " : "✗ Not quite. "}</strong>{fb || q.explanation}</>
                }
              </div>
            )}
          </div>

          {revealed && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button className="btn btn-khan btn-lg" onClick={next}>{cur+1 >= qs.length ? "View Results →" : "Next Question →"}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingTop: 28 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="card">
          <div className="card-body" style={{ textAlign: "center", padding: "44px 32px" }}>
            <div className={`score-circle ${scClass}`} style={{ margin: "0 auto 24px" }}><span>{pct}%</span><span className="score-lbl">Score</span></div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, fontStyle: "italic", marginBottom: 8 }}>
              {pct >= 80 ? "Excellent work! 🎉" : pct >= 60 ? "Good effort! 💪" : "Keep practicing! 📚"}
            </div>
            <div style={{ color: "var(--ink-3)", marginBottom: 28, fontSize: 15 }}>{score} of {qs.length} correct · {subj}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28, textAlign: "left" }}>
              {qs.map((q, i) => {
                const a = answers[i];
                return (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: a?.ok ? "var(--green-xl)" : "var(--red-xl)", borderRadius: "var(--radius-sm)", border: `1px solid ${a?.ok ? "#b7dfc5" : "#f5c5c0"}` }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{a?.ok ? "✓" : "✗"}</span>
                    <div style={{ flex: 1, fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)" }}>{q.text}</div>
                    <BTag level={q.bloomLevel} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="btn btn-khan" onClick={() => { setPhase("setup"); setQs([]); setAns([]); }}>Try Another Quiz</button>
              <button className="btn btn-outline" onClick={() => setPhase("setup")}>Change Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── EXAM CALENDAR ──────────────────────────────────────────────────────────
function Calendar({ exams, onAdd, onRemove }) {
  const [newE, setNewE] = useState({ name: "", subject: "", date: "" });
  const [adding, setAdding] = useState(false);
  const sorted = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));

  const add = () => {
    if (!newE.name || !newE.subject || !newE.date) return;
    onAdd({ ...newE, id: Date.now(), date: new Date(newE.date) });
    setNewE({ name: "", subject: "", date: "" }); setAdding(false);
  };

  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-circle-1" /><div className="page-hero-circle-2" />
        <div className="page-hero-eyebrow">✦ Exam Calendar</div>
        <h1 className="page-hero-title">Never walk into an exam <em>unprepared.</em></h1>
        <p className="page-hero-sub">Add your exam dates and we'll automatically build a 7-day prep plan with daily study reminders.</p>
        <div className="page-hero-actions">
          <button className="btn btn-white" onClick={() => setAdding(true)}>+ Add Exam Date</button>
        </div>
      </div>

      <div className="g2" style={{ alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, fontStyle: "italic" }}>Your Exams</div>
            {!adding && <button className="btn btn-khan btn-sm" onClick={() => setAdding(true)}>+ Add Exam</button>}
          </div>

          {adding && (
            <div className="card" style={{ marginBottom: 14, animation: "fadeUp 0.25s ease" }}>
              <div className="card-body">
                <div className="field"><label className="label">Exam Name</label><input className="input" placeholder="e.g. Midterm Exam" value={newE.name} onChange={e => setNewE(p => ({ ...p, name: e.target.value }))} /></div>
                <div className="g2">
                  <div className="field"><label className="label">Subject</label>
                    <select className="select" value={newE.subject} onChange={e => setNewE(p => ({ ...p, subject: e.target.value }))}>
                      <option value="">Select…</option>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="field"><label className="label">Date</label><input className="input" type="date" value={newE.date} onChange={e => setNewE(p => ({ ...p, date: e.target.value }))} /></div>
                </div>
                <div style={{ display: "flex", gap: 9 }}>
                  <button className="btn btn-khan" onClick={add}>Add Exam</button>
                  <button className="btn btn-ghost" onClick={() => setAdding(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {sorted.length === 0
            ? <div className="card dot-grid"><div className="empty"><div className="empty-icon">📅</div><div className="empty-title">No exams added yet</div><div className="empty-sub">Add your exam dates and we'll build personalized prep plans starting 7 days out</div></div></div>
            : sorted.map(e => {
              const d = daysUntil(e.date);
              return (
                <div key={e.id} className="exam-row">
                  <div className="exam-date-box">
                    <div className="exam-day">{new Date(e.date).getDate()}</div>
                    <div className="exam-month">{new Date(e.date).toLocaleString("en-US",{month:"short"})}</div>
                  </div>
                  <div className="exam-row-info">
                    <div className="exam-row-name">{e.name}</div>
                    <div className="exam-row-sub">{e.subject}</div>
                  </div>
                  <span className={`days-pill ${daysClass(d)}`}>{d > 0 ? `${d}d left` : "Today!"}</span>
                  <button onClick={() => onRemove(e.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", fontSize: 18, padding: "0 4px", lineHeight: 1 }}>×</button>
                </div>
              );
            })}
        </div>

        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, fontStyle: "italic", marginBottom: 16 }}>Smart Prep Plans</div>
          {sorted.filter(e => daysUntil(e.date) <= 14).length === 0
            ? <div className="card dot-grid"><div className="empty"><div className="empty-icon">🎯</div><div className="empty-title">No upcoming exams</div><div className="empty-sub">Prep plans appear automatically when an exam is within 14 days</div></div></div>
            : sorted.filter(e => daysUntil(e.date) <= 14).map(e => {
              const d = daysUntil(e.date);
              const steps = [
                { day: 7, text: `Start reviewing core ${e.subject} concepts`, icon: "📖" },
                { day: 5, text: `Take a full practice quiz on ${e.subject}`, icon: "✏️" },
                { day: 3, text: `Generate a focused worksheet on your weakest topics`, icon: "📄" },
                { day: 1, text: `Final review — 10 rapid-fire questions`, icon: "⚡" },
                { day: 0, text: `Exam day — you've prepared well. Good luck!`, icon: "🎯" },
              ];
              return (
                <div key={e.id} className="card" style={{ marginBottom: 16 }}>
                  <div className="card-header" style={{ background: "linear-gradient(135deg, var(--khan-blue-dd), var(--khan-blue))", borderBottom: "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📋</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "white", fontStyle: "italic" }}>{e.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>{e.subject} · {fmtDate(e.date)}</div>
                    </div>
                    <span className={`days-pill ${daysClass(d)}`}>{d}d left</span>
                  </div>
                  <div className="card-body" style={{ paddingTop: 16 }}>
                    {steps.filter(s => s.day <= Math.min(7, d + 1)).reverse().map((s, i) => (
                      <div key={i} className="prep-row">
                        <span className="prep-icon">{s.icon}</span>
                        <span className={`prep-text ${s.day === d ? "today" : ""}`}>{s.text}</span>
                        {s.day === d && <span style={{ fontSize: 11, fontWeight: 800, color: "var(--khan-blue)", background: "var(--khan-blue-xl)", padding: "3px 10px", borderRadius: 100, flexShrink: 0 }}>Today</span>}
                        {s.day < d  && <span style={{ fontSize: 13, color: "var(--green)", flexShrink: 0 }}>✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// ── ONBOARDING ─────────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(1);
  const [d, setD] = useState({ name: "", university: "", major: "", year: "" });

  const steps = [
    { emoji: "🎓", title: "Welcome to Scholara.", sub: "Your AI-powered study companion. Let's build your profile so we can personalize everything.", fields: [{ key: "name", label: "Your Name", ph: "e.g. Alex Johnson", type: "text" }, { key: "university", label: "University", ph: "e.g. University of Michigan", type: "text" }] },
    { emoji: "📚", title: "What are you studying?", sub: "This shapes your worksheets, quizzes, and how your AI tutor talks to you.", fields: [{ key: "major", label: "Major / Program", ph: "e.g. Biochemistry", type: "text" }, { key: "year", label: "Year", type: "select", opts: ["Freshman","Sophomore","Junior","Senior","Graduate"] }] },
  ];

  const s = steps[step - 1];
  const ok = s.fields.every(f => d[f.key]?.trim());

  return (
    <div className="ov">
      <div className="o-card">
        <div className="o-hero">
          <div className="o-hero-ball" style={{ width: 200, height: 200, top: -60, right: -60 }} />
          <div className="o-hero-ball" style={{ width: 100, height: 100, bottom: -30, left: -30 }} />
          <span className="o-emoji">{s.emoji}</span>
          <div className="o-step-pill">Step {step} of {steps.length}</div>
          <div className="o-title">{s.title}</div>
          <div className="o-sub">{s.sub}</div>
        </div>
        <div className="o-body">
          {s.fields.map(f => (
            <div className="field" key={f.key}>
              <label className="label">{f.label}</label>
              {f.type === "select"
                ? <select className="select" value={d[f.key]} onChange={e => setD(p => ({ ...p, [f.key]: e.target.value }))}><option value="">Select year…</option>{f.opts.map(o => <option key={o} value={o}>{o}</option>)}</select>
                : <input className="input" type={f.type} placeholder={f.ph} value={d[f.key]} onChange={e => setD(p => ({ ...p, [f.key]: e.target.value }))} />
              }
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            {step > 1 && <button className="btn btn-ghost" onClick={() => setStep(p => p - 1)}>← Back</button>}
            <button className="btn btn-khan btn-lg" style={{ flex: 1 }} disabled={!ok} onClick={() => step < steps.length ? setStep(p => p + 1) : onDone(d)}>
              {step < steps.length ? "Continue →" : "Start Learning 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]     = useState("dashboard");
  const [user, setUser]     = useState(null);
  const [mastery, setMastery] = useState(INIT_MASTERY);
  const [exams, setExams]   = useState(INIT_EXAMS);

  const updMastery = useCallback((s, v) => setMastery(p => ({ ...p, [s]: Math.min(1, Math.max(0, v)) })), []);
  const addExam    = useCallback(e => setExams(p => [...p, e]), []);
  const rmExam     = useCallback(id => setExams(p => p.filter(e => e.id !== id)), []);

  const pageMeta = {
    dashboard: { title: "Dashboard",           icon: "⊞" },
    tutor:     { title: "AI Tutor",             icon: "🎓" },
    worksheet: { title: "Worksheet Generator",  icon: "📄" },
    quiz:      { title: "Practice Quiz",        icon: "✏️" },
    calendar:  { title: "Exam Calendar",        icon: "📅" },
  };

  const urgentExams = exams.filter(e => daysUntil(e.date) <= 3);

  return (
    <>
      <style>{css}</style>
      {!user && <Onboarding onDone={setUser} />}

      <div>
        {/* TOP NAV — Khan Academy style */}
        <nav className="topnav">
          <div className="topnav-logo" onClick={() => setPage("dashboard")}>
            <div className="topnav-logo-mark">🎓</div>
            <span className="topnav-logo-text">Scholara</span>
          </div>

          <div className="topnav-links">
            {NAV.map(n => (
              <button key={n.id} className={`topnav-link ${page === n.id ? "active-pill" : ""}`} onClick={() => setPage(n.id)}>
                {n.icon} {n.label}
                {n.id === "calendar" && urgentExams.length > 0 && (
                  <span style={{ marginLeft: 4, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", color: "white", fontSize: 9, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", verticalAlign: "middle" }}>{urgentExams.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="topnav-right">
            {page === "tutor"  && <span style={{ fontSize: 12, fontWeight: 700, color: "#7fe08a", background: "rgba(127,224,138,0.15)", padding: "5px 12px", borderRadius: 100, border: "1px solid rgba(127,224,138,0.25)" }}>● AI Active</span>}
            {user && <div className="topnav-user">{user.name?.charAt(0)?.toUpperCase() || "S"}</div>}
          </div>
        </nav>

        {/* SIDE + MAIN LAYOUT */}
        <div className="layout">
          {/* LEFT NAV */}
          <aside className="leftnav">
            <div className="leftnav-section">Study Tools</div>
            {NAV.map(n => (
              <button key={n.id} className={`leftnav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                <span className="leftnav-icon">{n.icon}</span>
                {n.label}
                {n.id === "calendar" && urgentExams.length > 0 && <span className="leftnav-badge">{urgentExams.length}</span>}
              </button>
            ))}

            <div className="leftnav-bottom">
              {user && (
                <div className="user-info">
                  <div className="user-avatar-sm">{user.name?.charAt(0)?.toUpperCase() || "S"}</div>
                  <div>
                    <div className="user-info-name">{user.name}</div>
                    <div className="user-info-plan">Free Plan</div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* MAIN */}
          <main className="main">
            {page === "dashboard" && <Dashboard  mastery={mastery} exams={exams} onNav={setPage} user={user} />}
            {page === "tutor"     && <Tutor       mastery={mastery} onMasteryUpdate={updMastery} />}
            {page === "worksheet" && <Worksheet />}
            {page === "quiz"      && <Quiz        mastery={mastery} onMasteryUpdate={updMastery} />}
            {page === "calendar"  && <Calendar    exams={exams} onAdd={addExam} onRemove={rmExam} />}
          </main>
        </div>
      </div>
    </>
  );
}
