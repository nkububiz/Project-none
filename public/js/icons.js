/**
 * KaziRemote Vector Icon & Authentic Brand Logo Registry
 * High-fidelity, resolution-independent SVG icons and brand emblems.
 * Zero external font or image network dependencies.
 */
(function () {
  const SVGS = {
    // --- System & UI Icons ---
    briefcase: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    shieldCheck: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alertTriangle: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    hourglass: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>',
    bell: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    fileText: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    creditCard: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    externalLink: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    download: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    zap: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
    target: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    send: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    verifiedBadge: '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" style="display:inline-block;vertical-align:-1px"><path d="M8 0L1.5 3v5c0 4.14 2.77 7.99 6.5 9 3.73-1.01 6.5-4.86 6.5-9V3L8 0zm-1 11.5l-3.5-3.5 1.41-1.41L7 8.67l4.59-4.59L13 5.5l-6 6z"/></svg>',

    // --- Communication Brands ---
    whatsapp: '<svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="#229ED9"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/></svg>',
    google: '<svg viewBox="0 0 48 48" width="18" height="18"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',

    // --- Job Categories (SVGs replacing emojis) ---
    cat_engineering: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>',
    cat_design: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    cat_marketing: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    cat_support: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    cat_data: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
    cat_writing: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    cat_finance: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><path d="M7 15h2M15 15h2"/></svg>',
    cat_va: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',

    // --- Country Flag SVG Badges (Replacing emoji flags) ---
    flag_KE: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="32" height="7" fill="#000000"/><rect y="7" width="32" height="2" fill="#FFFFFF"/><rect y="9" width="32" height="6" fill="#BB0000"/><rect y="15" width="32" height="2" fill="#FFFFFF"/><rect y="17" width="32" height="7" fill="#006600"/><ellipse cx="16" cy="12" rx="3.5" ry="5.5" fill="#BB0000" stroke="#FFFFFF" stroke-width="0.8"/><circle cx="16" cy="12" r="1.5" fill="#000000"/></svg>',
    flag_NG: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="10.6" height="24" fill="#008751"/><rect x="10.6" width="10.8" height="24" fill="#FFFFFF"/><rect x="21.4" width="10.6" height="24" fill="#008751"/></svg>',
    flag_GH: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="32" height="8" fill="#CF1126"/><rect y="8" width="32" height="8" fill="#FCD116"/><rect y="16" width="32" height="8" fill="#006B3F"/><polygon points="16,8.5 17.5,13.2 22,13.2 18.5,15.8 19.8,20.5 16,17.7 12.2,20.5 13.5,15.8 10,13.2 14.5,13.2" fill="#000000"/></svg>',
    flag_RW: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="32" height="12" fill="#00A1DE"/><rect y="12" width="32" height="6" fill="#E5AA70"/><rect y="18" width="32" height="6" fill="#20603D"/><circle cx="26" cy="6" r="3" fill="#E5AA70"/></svg>',
    flag_ZA: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="32" height="12" fill="#DE3831"/><rect y="12" width="32" height="12" fill="#002395"/><polygon points="0,0 14,12 0,24" fill="#000000"/><polygon points="0,0 18,12 0,24 0,20 12,12 0,4" fill="#FFB612"/><path d="M0,8 L10,8 L16,12 L10,16 L0,16 L0,20 L12,20 L20,13 L32,13 L32,11 L20,11 L12,4 L0,4 Z" fill="#007A4D"/></svg>',
    flag_UG: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="32" height="4" fill="#000000"/><rect y="4" width="32" height="4" fill="#FCDC04"/><rect y="8" width="32" height="4" fill="#D90000"/><rect y="12" width="32" height="4" fill="#000000"/><rect y="16" width="32" height="4" fill="#FCDC04"/><rect y="20" width="32" height="4" fill="#D90000"/><circle cx="16" cy="12" r="3.2" fill="#FFFFFF"/></svg>',
    flag_ET: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="32" height="8" fill="#078930"/><rect y="8" width="32" height="8" fill="#FCDD09"/><rect y="16" width="32" height="8" fill="#DA121A"/><circle cx="16" cy="12" r="4.5" fill="#0F47AF"/><polygon points="16,8.5 17.2,12 20.5,12 17.8,14 18.8,17.2 16,15.2 13.2,17.2 14.2,14 11.5,12 14.8,12" fill="#FCDD09"/></svg>',
    flag_GLOBAL: '<svg viewBox="0 0 32 24" width="22" height="16" class="flag-svg"><rect width="32" height="24" rx="3" fill="#1e293b"/><circle cx="16" cy="12" r="8" fill="none" stroke="#38bdf8" stroke-width="1.4"/><ellipse cx="16" cy="12" rx="4" ry="8" fill="none" stroke="#38bdf8" stroke-width="1.2"/><line x1="8" y1="12" x2="24" y2="12" stroke="#38bdf8" stroke-width="1.2"/></svg>',

    // --- Payment Provider Logos ---
    mpesa_badge: '<svg viewBox="0 0 44 28" width="44" height="28"><rect width="44" height="28" rx="6" fill="#008000"/><text x="7" y="19" font-family="system-ui, sans-serif" font-weight="900" font-size="12" fill="#FFFFFF">M-PESA</text><rect x="36" y="6" width="3" height="16" rx="1.5" fill="#E11D48"/></svg>',
    momo_badge: '<svg viewBox="0 0 44 28" width="44" height="28"><rect width="44" height="28" rx="6" fill="#FFCC00"/><circle cx="22" cy="14" r="10" fill="#000000"/><text x="14" y="18" font-family="system-ui, sans-serif" font-weight="900" font-size="10" fill="#FFCC00">MoMo</text></svg>',
    paystack_badge: '<svg viewBox="0 0 44 28" width="44" height="28"><rect width="44" height="28" rx="6" fill="#00C3F7"/><rect x="8" y="9" width="28" height="4" rx="2" fill="#FFFFFF"/><rect x="8" y="16" width="18" height="4" rx="2" fill="#FFFFFF"/></svg>',
    card_badge: '<svg viewBox="0 0 44 28" width="44" height="28"><rect width="44" height="28" rx="6" fill="#1E293B"/><circle cx="18" cy="14" r="7" fill="#EB001B" fill-opacity="0.9"/><circle cx="26" cy="14" r="7" fill="#F79E1B" fill-opacity="0.9"/></svg>',
    bank_badge: '<svg viewBox="0 0 44 28" width="44" height="28"><rect width="44" height="28" rx="6" fill="#0F172A"/><path d="M12 12h20M14 12v6M22 12v6M30 12v6M10 20h24M22 7l12 5H10l12-5z" stroke="#38BDF8" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>',

    // --- Employer & Brand Logos ---
    logo_sendwave: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#F97316"/><path d="M10 20l9-9 5 5 10-10M27 6h7v7" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    logo_lipalater: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#18181B"/><path d="M13 28V12h5v11h10v5H13z" fill="#F97316"/></svg>',
    logo_andela: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#3359DF"/><path d="M20 9l9 19h-5l-4-9-4 9h-5l9-19z" fill="#FFFFFF"/></svg>',
    logo_twiga: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#15803D"/><circle cx="20" cy="20" r="8" fill="#FACC15"/><path d="M16 20a4 4 0 0 1 8 0" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>',
    logo_mkopa: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#0284C7"/><path d="M12 27V13l8 7 8-7v14" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
    logo_devdocs: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#27272A"/><path d="M11 13h18M11 20h18M11 27h10" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/></svg>',
    logo_bridgepartners: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#FB923C"/><circle cx="20" cy="20" r="7" stroke="#FFFFFF" stroke-width="3" fill="none"/><path d="M20 9v5M20 26v5M9 20h5M26 20h5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/></svg>',
    logo_pesapal: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#059669"/><path d="M13 20h14M20 13v14" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/><circle cx="20" cy="20" r="11" stroke="#FFFFFF" stroke-width="2" fill="none"/></svg>',
    logo_ledgerly: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#D97706"/><rect x="11" y="11" width="18" height="18" rx="3" stroke="#FFFFFF" stroke-width="2.5" fill="none"/><line x1="16" y1="16" x2="24" y2="16" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><line x1="16" y1="22" x2="24" y2="22" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/></svg>',
    logo_kazicreative: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#7C3AED"/><circle cx="20" cy="20" r="8" stroke="#FFFFFF" stroke-width="3" fill="none"/><circle cx="20" cy="20" r="3" fill="#F472B6"/></svg>',
    logo_safiri: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#EA580C"/><circle cx="20" cy="20" r="10" stroke="#FFFFFF" stroke-width="2" fill="none"/><polygon points="20,12 25,23 20,20 15,23" fill="#FFFFFF"/></svg>',
    logo_dukapro: '<svg viewBox="0 0 40 40" width="40" height="40"><rect width="40" height="40" rx="10" fill="#3F3F46"/><path d="M12 16l3-6h10l3 6v12a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V16z" stroke="#FFFFFF" stroke-width="2" fill="none"/><line x1="12" y1="16" x2="28" y2="16" stroke="#FFFFFF" stroke-width="2"/></svg>',
  };

  function getIcon(name, size) {
    let svg = SVGS[name] || "";
    if (size && svg) {
      svg = svg.replace(/width="[0-9.]+"/, `width="${size}"`).replace(/height="[0-9.]+"/, `height="${size}"`);
    }
    return svg;
  }

  function getFlag(code) {
    if (!code) return SVGS.flag_GLOBAL;
    const clean = String(code).trim().toUpperCase();
    if (clean.includes("KE") || clean === "KENYA") return SVGS.flag_KE;
    if (clean.includes("NG") || clean === "NIGERIA") return SVGS.flag_NG;
    if (clean.includes("GH") || clean === "GHANA") return SVGS.flag_GH;
    if (clean.includes("RW") || clean === "RWANDA") return SVGS.flag_RW;
    if (clean.includes("ZA") || clean === "SOUTH AFRICA") return SVGS.flag_ZA;
    if (clean.includes("UG") || clean === "UGANDA") return SVGS.flag_UG;
    if (clean.includes("ET") || clean === "ETHIOPIA") return SVGS.flag_ET;
    return SVGS.flag_GLOBAL;
  }

  function getCategoryIcon(id) {
    return SVGS["cat_" + id] || SVGS.briefcase;
  }

  function getPaymentBadge(gateway) {
    const g = String(gateway || "").toLowerCase();
    if (g.includes("mpesa") || g.includes("m-pesa") || g.includes("safaricom")) return SVGS.mpesa_badge;
    if (g.includes("momo") || g.includes("mtn")) return SVGS.momo_badge;
    if (g.includes("paystack")) return SVGS.paystack_badge;
    if (g.includes("card") || g.includes("stripe") || g.includes("visa")) return SVGS.card_badge;
    if (g.includes("ozow") || g.includes("eft") || g.includes("bank")) return SVGS.bank_badge;
    return SVGS.card_badge;
  }

  function getCompanyLogo(company, color = "#f97316") {
    const key = String(company || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (key.includes("sendwave")) return SVGS.logo_sendwave;
    if (key.includes("lipalater")) return SVGS.logo_lipalater;
    if (key.includes("andela")) return SVGS.logo_andela;
    if (key.includes("twiga")) return SVGS.logo_twiga;
    if (key.includes("mkopa")) return SVGS.logo_mkopa;
    if (key.includes("devdocs")) return SVGS.logo_devdocs;
    if (key.includes("bridge")) return SVGS.logo_bridgepartners;
    if (key.includes("pesapal")) return SVGS.logo_pesapal;
    if (key.includes("ledgerly")) return SVGS.logo_ledgerly;
    if (key.includes("kazicreative")) return SVGS.logo_kazicreative;
    if (key.includes("safiri")) return SVGS.logo_safiri;
    if (key.includes("dukapro")) return SVGS.logo_dukapro;

    // Deterministic geometric monogram for generated or custom companies
    const inits = String(company || "Kazi")
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return `<svg viewBox="0 0 40 40" width="40" height="40">
      <defs>
        <linearGradient id="g-${inits}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#g-${inits})"/>
      <rect x="2" y="2" width="36" height="36" rx="8" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.2"/>
      <text x="20" y="25" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.02em">${inits}</text>
    </svg>`;
  }

  window.KaziIcons = {
    svgs: SVGS,
    get: getIcon,
    icon: getIcon,
    flag: getFlag,
    category: getCategoryIcon,
    payment: getPaymentBadge,
    company: getCompanyLogo,
  };
})();
