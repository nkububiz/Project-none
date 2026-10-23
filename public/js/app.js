/* KaziRemote — shared UI: header, footer, theme, sign-in, toasts, job cards, application tracker, whatsapp. */
(function () {
  const S = window.KaziStore;
  const $ = (sel, root = document) => root.querySelector(sel);

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (name) => String(name).split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const ago = (d) => (d === 0 ? "Today" : d === 1 ? "1 day ago" : d > 30 ? "30+ days ago" : d + " days ago");
  const fmtKES = (n) => S.config.CURRENCY + " " + Number(n).toLocaleString();

  const ICONS = {
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    google: '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
    verified: '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" style="display:inline-block;vertical-align:-1px"><path d="M8 0L1.5 3v5c0 4.14 2.77 7.99 6.5 9 3.73-1.01 6.5-4.86 6.5-9V3L8 0zm-1 11.5l-3.5-3.5 1.41-1.41L7 8.67l4.59-4.59L13 5.5l-6 6z"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    pin: "📍", clock: "🕒", briefcase: "💼",
  };

  // ---------- Theme ----------
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("kazi:theme", next);
  }

  // ---------- Toast ----------
  function toast(msg) {
    let wrap = $(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; wrap.setAttribute("role", "status"); document.body.appendChild(wrap); }
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 3400);
  }

  // ---------- Header / footer ----------
  const NAV = [
    { href: "/jobs.html", label: "Find jobs", key: "jobs" },
    { href: "/post-job.html", label: "Post a job", key: "post" },
    { href: "/enroll.html", label: "Enroll (Till 4374253)", key: "enroll" },
  ];

  function renderAuth() {
    const slot = $("#auth-slot");
    if (!slot) return;
    const user = S.currentUser();
    if (user) {
      const status = S.enrollment();
      const badge = status === "active" ? '<span class="badge badge-brand">Enrolled</span>' : status === "pending" ? '<span class="badge badge-warn">Pending</span>' : "";
      const apps = S.applications();
      slot.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px">
          <button class="btn btn-ghost btn-sm" id="btn-my-apps" title="View your submitted job applications">📋 My Applications <span class="badge badge-brand">${apps.length}</span></button>
          <button class="user-chip" id="user-chip" title="Sign out"><span class="avatar">${esc(user.initials)}</span><span class="hide-sm">${esc(user.name.split(" ")[0])}</span>${badge}</button>
        </div>`;
      $("#user-chip").onclick = () => { S.signOut(); toast("Signed out"); renderAuth(); document.dispatchEvent(new CustomEvent("kazi:auth")); };
      $("#btn-my-apps").onclick = openApplicationsModal;
    } else {
      slot.innerHTML = `<button class="btn google-btn btn-sm" id="google-signin">${ICONS.google}<span>Sign in<span class="hide-sm"> with Google</span></span></button>`;
      $("#google-signin").onclick = signIn;
    }
  }

  function signIn() {
    const u = S.signInDemo();
    toast(`Signed in as ${u.name} (demo Google account)`);
    renderAuth();
    document.dispatchEvent(new CustomEvent("kazi:auth"));
  }

  // Hidden admin entry: 5 taps on the logo within 3 seconds opens /admin.html.
  function bindSecretLogo(logo) {
    const TAPS = 5, WINDOW_MS = 3000, HOME_DELAY_MS = 800;
    let taps = [], homeTimer;
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      clearTimeout(homeTimer);
      const now = Date.now();
      taps = [...taps.filter((t) => now - t < WINDOW_MS), now];
      if (taps.length >= TAPS) { taps = []; location.href = "/admin.html"; return; }
      if (location.pathname !== "/" && location.pathname !== "/index.html") {
        homeTimer = setTimeout(() => { location.href = "/"; }, HOME_DELAY_MS);
      }
    });
  }

  function renderFloatingWhatsApp() {
    if ($("#whatsapp-float")) return;
    const wa = document.createElement("a");
    wa.id = "whatsapp-float";
    wa.className = "whatsapp-float";
    wa.href = S.config.CONTACT.WHATSAPP;
    wa.target = "_blank";
    wa.rel = "noopener noreferrer";
    wa.setAttribute("aria-label", "Chat with KaziRemote verified support on WhatsApp");
    wa.innerHTML = `
      <div class="wa-bubble"><span>Need help with M-Pesa?</span><b>WhatsApp us</b></div>
      <div class="wa-icon">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/></svg>
      </div>`;
    document.body.appendChild(wa);
  }

  function renderChrome() {
    const page = document.body.dataset.page;
    const header = $("#site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML = `
        <div class="container nav">
          <a class="logo" href="/"><span class="logo-mark">K</span><span>Kazi<em>Remote</em></span></a>
          <nav class="nav-links" id="nav-links" aria-label="Main">
            ${NAV.map((n) => `<a href="${n.href}" ${n.key === page ? 'aria-current="page"' : ""}>${n.label}</a>`).join("")}
          </nav>
          <div class="nav-actions">
            <button class="icon-btn theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">${ICONS.sun}${ICONS.moon}</button>
            <span id="auth-slot"></span>
            <button class="icon-btn menu-btn" id="menu-btn" aria-label="Open menu">${ICONS.menu}</button>
          </div>
        </div>`;
      bindSecretLogo($(".logo", header));
      $("#theme-toggle").onclick = toggleTheme;
      $("#menu-btn").onclick = () => $("#nav-links").classList.toggle("open");
      renderAuth();
    }
    const footer = $("#site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML = `
        <div class="container footer-row">
          <div>
            <strong style="color:var(--ink)">KaziRemote</strong> — remote work for African talent. © 2026<br/>
            <span style="font-size:.82rem;opacity:.8">${esc(S.config.REGISTERED_BUSINESS)} · ${esc(S.config.OFFICE_LOCATION)}</span>
          </div>
          <nav>
            <a href="/jobs.html">Jobs</a>
            <a href="/post-job.html">Employers</a>
            <a href="/enroll.html">Enroll (Till ${S.config.TILL_NUMBER})</a>
            <a href="#" id="link-terms">Terms & Anti-Scam Policy</a>
            <a href="#" id="link-privacy">Privacy (KDPA 2019)</a>
          </nav>
          <span class="demo-note">Preview build · sample data <a href="#" id="reset-demo">reset</a></span>
        </div>`;
      $("#reset-demo").onclick = (e) => { e.preventDefault(); S.resetDemo(); location.reload(); };
      $("#link-terms").onclick = (e) => { e.preventDefault(); openLegalModal("terms"); };
      $("#link-privacy").onclick = (e) => { e.preventDefault(); openLegalModal("privacy"); };
    }
    renderFloatingWhatsApp();
  }

  // ---------- Job card + detail ----------
  function catLabel(id) { return (S.categories.find((c) => c.id === id) || {}).label || id; }

  function jobCard(job) {
    const logoContent = job.logoSvg
      ? `<span class="company-logo-svg">${job.logoSvg}</span>`
      : `<span class="company-logo" style="background:${esc(job.color || "#555")}">${esc(initials(job.company))}</span>`;

    const verifiedTag = job.verified !== false
      ? `<span class="badge badge-verified">${ICONS.verified} Verified Employer</span>`
      : "";

    const salaryDisp = S.formatSalaryForJob(job.pay) || esc(job.salary);

    return `
      <button class="job-card ${job.featured ? "featured" : ""}" data-job="${esc(job.id)}">
        ${logoContent}
        <span>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <h3 style="margin:0">${esc(job.title)}</h3>
            ${verifiedTag}
          </div>
          <span class="job-meta">
            <strong style="color:var(--ink)">${esc(job.company)}</strong>
            <span>${job.flag || "🌍"} ${esc(job.location)}</span>
            <span>${ICONS.briefcase} ${esc(job.type)}</span>
            ${job.tzOverlap ? `<span>${ICONS.clock} ${esc(job.tzOverlap)}</span>` : ""}
          </span>
          <span class="tags">${(job.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span>
        </span>
        <span class="job-side">
          ${job.featured ? '<span class="badge badge-accent">Featured</span>' : ""}
          <span class="salary">${salaryDisp}</span>
          <span class="muted" style="font-size:.82rem">${ago(job.posted)}</span>
        </span>
      </button>`;
  }

  function ensureDialog(id = "job-dialog") {
    let d = $("#" + id);
    if (d) return d;
    d = document.createElement("dialog");
    d.id = id;
    document.body.appendChild(d);
    return d;
  }

  // In-app Resume / CV Preview Modal
  function openCvModal(candidateName = "Amani Wekesa", cvName = "Amani_Wekesa_Resume_2026.pdf") {
    const d = ensureDialog("cv-dialog");
    d.innerHTML = `
      <div class="dialog-head">
        <div>
          <h2 style="font-size:1.35rem;margin:0">Verified Resume Preview</h2>
          <p class="muted" style="margin:4px 0 0;font-size:.85rem">📄 ${esc(cvName)} · Candidate: <strong>${esc(candidateName)}</strong></p>
        </div>
        <button class="icon-btn dialog-close" aria-label="Close" data-act="close">${ICONS.close}</button>
      </div>
      <div class="dialog-body">
        <div class="cv-preview-paper">
          <div class="cv-preview-header">
            <h2 style="margin:0 0 4px;font-size:1.5rem;color:var(--ink)">${esc(candidateName)}</h2>
            <div style="font-size:.88rem;color:var(--ink-2)">Senior Full-Stack &amp; Frontend Engineer · Nairobi, Kenya (EAT / UTC+3)</div>
            <div style="font-size:.84rem;color:var(--muted);margin-top:4px">
              Email: amani.wekesa@gmail.com · Tel: 0183 036 639 · WhatsApp: 0183 036 639 · GitHub: github.com/amaniwekesa
            </div>
          </div>
          <h4 style="margin:16px 0 6px;color:var(--brand)">Executive Summary</h4>
          <p style="margin:0 0 12px;font-size:.88rem">Passionate software engineer with 5+ years building scalable, accessible web applications for international startups and African fintech companies. Proven experience working asynchronously across UK, European, and African time zones.</p>
          
          <h4 style="margin:16px 0 6px;color:var(--brand)">Core Technical Competencies</h4>
          <p style="margin:0 0 12px;font-size:.88rem"><strong>Languages &amp; Frameworks:</strong> TypeScript, JavaScript (ES2024), React, Node.js, Express, HTML5/CSS3, Tailwind CSS, REST APIs, GraphQL.<br/>
          <strong>Tools &amp; Workflows:</strong> Git, GitHub Actions, Docker, Figma to code, Jest, Vitest, Async Slack/Linear workflows.</p>

          <h4 style="margin:16px 0 6px;color:var(--brand)">Professional Experience</h4>
          <div style="margin-bottom:12px">
            <strong>Senior Frontend Developer</strong> — FinTech Africa Remote (2023 – Present)<br/>
            <span style="font-size:.82rem;color:var(--muted)">Led web checkout re-architecture improving mobile completion rates by 34% across 4 East African currencies.</span>
          </div>
          <div style="margin-bottom:12px">
            <strong>Frontend Engineer</strong> — Nairobi Digital Labs (2021 – 2023)<br/>
            <span style="font-size:.82rem;color:var(--muted)">Delivered 12+ responsive web platforms with 99.8% test coverage and WCAG 2.1 AA accessibility compliance.</span>
          </div>

          <h4 style="margin:16px 0 6px;color:var(--brand)">Education &amp; Certifications</h4>
          <p style="margin:0;font-size:.88rem">B.Sc. in Computer Science — University of Nairobi (First Class Honours)<br/>
          AWS Certified Cloud Practitioner · Meta Frontend Developer Professional Certificate</p>
        </div>
      </div>
      <div class="dialog-foot">
        <a class="btn btn-primary btn-sm" href="tel:0183036639">📞 Call Candidate (0183 036 639)</a>
        <button class="btn btn-ghost btn-sm" data-act="close">Close Preview</button>
      </div>`;
    d.onclick = (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "close" || e.target === d) d.close();
    };
    if (!d.open) d.showModal();
  }

  // Instant STK Push Phone Simulation Modal
  function openStkPushModal({ phone = "0183036639", countryCode = "KE", onSuccess }) {
    const existing = $("#stk-modal");
    if (existing) existing.remove();

    const reg = S.getCountryPayment(countryCode);
    const overlay = document.createElement("div");
    overlay.className = "stk-overlay";
    overlay.id = "stk-modal";

    overlay.innerHTML = `
      <div class="stk-phone-frame">
        <div class="stk-phone-notch"><div class="stk-notch-pill"></div></div>
        <div class="stk-sim-dialog">
          <div class="stk-sim-header">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span>${reg.provider.toUpperCase()} PROMPT</span>
          </div>
          <div class="stk-sim-text">
            Do you want to pay <strong>${reg.feeDisplay}</strong> to <strong>${esc(S.config.TILL_NAME)}</strong>?
            <div style="font-size:.82rem;color:#94a3b8;margin-top:6px">Mobile Number: <strong>${esc(phone)}</strong></div>
            <div style="font-size:.82rem;color:#94a3b8">Reference: <strong>Till ${S.config.TILL_NUMBER}</strong></div>
          </div>
          <div style="margin-bottom:8px;font-size:.84rem;color:#cbd5e1;display:flex;justify-content:space-between">
            <span>Enter secret PIN:</span>
            <span style="color:#22c55e">Encrypted</span>
          </div>
          <input type="password" id="stk-pin-input" class="stk-pin-field" maxlength="4" value="1234" placeholder="••••" autofocus />
          <div id="stk-status-msg" style="display:none;font-size:.84rem;color:#facc15;margin-bottom:12px;text-align:center">Processing payment with Safaricom gateway...</div>
          <div class="stk-sim-actions" id="stk-btn-group">
            <button type="button" class="stk-btn stk-btn-cancel" id="stk-cancel-btn">Cancel</button>
            <button type="button" class="stk-btn stk-btn-confirm" id="stk-send-btn">Authorize &amp; Pay</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    const pinInput = $("#stk-pin-input", overlay);
    const cancelBtn = $("#stk-cancel-btn", overlay);
    const sendBtn = $("#stk-send-btn", overlay);
    const statusMsg = $("#stk-status-msg", overlay);
    const btnGroup = $("#stk-btn-group", overlay);

    cancelBtn.onclick = () => overlay.remove();

    sendBtn.onclick = () => {
      const pin = pinInput.value.trim();
      if (pin.length < 4) {
        toast("Please enter your 4-digit PIN.");
        return;
      }
      statusMsg.style.display = "block";
      btnGroup.style.display = "none";
      pinInput.disabled = true;

      setTimeout(() => {
        const u = S.currentUser();
        const record = S.triggerInstantPayment({
          phone,
          countryCode,
          name: u ? u.name : "Enrolled Seeker",
          email: u ? u.email : "seeker@kaziremote.africa"
        });
        overlay.remove();
        toast(`✅ Instant Payment Verified! Transaction code: ${record.code}`);
        if (typeof onSuccess === "function") onSuccess(record);
      }, 2200);
    };
  }

  // Job Alerts Subscription Modal
  function openJobAlertsModal() {
    const d = ensureDialog("alerts-dialog");
    d.innerHTML = `
      <div class="dialog-head">
        <div>
          <h2 style="font-size:1.35rem;margin:0">🔔 Instant Job Alerts</h2>
          <p class="muted" style="margin:4px 0 0;font-size:.85rem">Get WhatsApp or Telegram notifications the minute high-paying remote roles are posted.</p>
        </div>
        <button class="icon-btn dialog-close" aria-label="Close" data-act="close">${ICONS.close}</button>
      </div>
      <div class="dialog-body">
        <form id="alerts-form" style="display:grid;gap:14px">
          <div class="field">
            <label style="font-size:.84rem">Alert Delivery Channel</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <label style="display:flex;align-items:center;gap:8px;padding:10px;border:1px solid var(--line);border-radius:10px;cursor:pointer">
                <input type="radio" name="alert_channel" value="whatsapp" checked />
                <span>📱 WhatsApp Alert</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;padding:10px;border:1px solid var(--line);border-radius:10px;cursor:pointer">
                <input type="radio" name="alert_channel" value="telegram" />
                <span>✈️ Telegram Alert</span>
              </label>
            </div>
          </div>
          <div class="field">
            <label for="alert-destination" style="font-size:.84rem">Phone Number / Telegram Username</label>
            <input id="alert-destination" type="text" placeholder="e.g. 0183036639 or @yourname" value="0183036639" required />
            <span class="hint">Hotline &amp; WhatsApp support desk: <strong>0183 036 639</strong></span>
          </div>
          <div class="field">
            <label for="alert-category" style="font-size:.84rem">Job Category</label>
            <select id="alert-category">
              <option value="all">All Categories (Engineering, Design, Marketing, Support)</option>
              <option value="engineering">Engineering &amp; Software</option>
              <option value="design">Design &amp; UI/UX</option>
              <option value="support">Customer Support &amp; Ops</option>
              <option value="marketing">Marketing &amp; Growth</option>
            </select>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:8px">
            <button type="button" class="btn btn-ghost btn-sm" data-act="close">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Subscribe to Free Alerts →</button>
          </div>
        </form>
      </div>`;

    const form = $("#alerts-form", d);
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const ch = $('input[name="alert_channel"]:checked', form)?.value || "whatsapp";
        const dest = $("#alert-destination", form)?.value.trim();
        const cat = $("#alert-category", form)?.value;
        if (!dest) return toast("Please enter your phone or username.");
        S.subscribeAlert({ channel: ch, destination: dest, category: cat });
        toast(`🔔 Subscribed! You will receive new remote job alerts on ${ch}.`);
        d.close();
      };
    }

    d.onclick = (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "close" || e.target === d) d.close();
    };
    if (!d.open) d.showModal();
  }

  function openJob(id) {
    const job = S.getJob(id);
    if (!job) return;
    const d = ensureDialog("job-dialog");
    const user = S.currentUser();
    const status = S.enrollment();
    const existingApp = S.getApplication(job.id);
    const applied = !!existingApp || S.applied().includes(job.id);
    const salaryDisp = S.formatSalaryForJob(job.pay) || esc(job.salary);

    let ctaSection = "";
    if (applied) {
      const appRecord = existingApp || { status: "forwarded", date: "Recently", cvName: "Amani_Wekesa_CV.pdf" };
      const steps = [
        { key: "submitted", label: "1. Submitted", done: true },
        { key: "forwarded", label: "2. Forwarded to Employer", done: true },
        { key: "under_review", label: "3. Under Review", done: appRecord.status === "under_review" || appRecord.status === "shortlisted" },
        { key: "shortlisted", label: "4. Interview Shortlist", done: appRecord.status === "shortlisted" },
      ];
      ctaSection = `
        <div class="application-tracker-box">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <strong style="color:var(--ink);font-size:.95rem">Application Status: <span class="badge badge-brand">${appRecord.status.replace("_", " ").toUpperCase()}</span></strong>
            <span class="muted" style="font-size:.85rem">CV Attached: 📄 ${esc(appRecord.cvName || "CV.pdf")}</span>
          </div>
          <p style="font-size:.88rem;color:var(--ink-2);margin-bottom:12px">Your profile and CV were forwarded directly to the hiring manager at <strong>${esc(job.company)}</strong>. No middlemen, no agency wage deductions.</p>
          <div class="status-pipeline">
            ${steps.map((st) => `<div class="pipeline-step ${st.done ? "done" : ""}"><span class="step-dot"></span><span>${st.label}</span></div>`).join("")}
          </div>
        </div>`;
    } else if (!user) {
      ctaSection = `
        <div class="dialog-cta-wrap">
          <p class="muted" style="font-size:.88rem;margin:0 0 10px">Sign in with Google to submit your application directly to ${esc(job.company)}.</p>
          <button class="btn google-btn" data-act="signin">${ICONS.google} Sign in with Google to apply</button>
        </div>`;
    } else if (status === "active") {
      ctaSection = `
        <div class="panel" style="padding:16px;background:var(--surface-2);border-radius:14px;margin-top:16px">
          <h4 style="font-size:.95rem;margin:0 0 10px">Quick Direct Application (Enrolled Seeker)</h4>
          <form id="apply-form" style="display:grid;gap:12px">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div class="field"><label style="font-size:.82rem">Candidate Name</label><input type="text" value="${esc(user.name)}" readonly style="opacity:.8;padding:8px 10px;font-size:.9rem"/></div>
              <div class="field"><label style="font-size:.82rem">Email Address</label><input type="email" value="${esc(user.email)}" readonly style="opacity:.8;padding:8px 10px;font-size:.9rem"/></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div class="field"><label style="font-size:.82rem">LinkedIn / Portfolio URL</label><input id="app-linkedin" type="url" placeholder="https://linkedin.com/in/yourname" value="https://linkedin.com/in/amani-wekesa" style="padding:8px 10px;font-size:.9rem"/></div>
              <div class="field"><label style="font-size:.82rem">GitHub / Website</label><input id="app-github" type="url" placeholder="https://github.com/yourname" style="padding:8px 10px;font-size:.9rem"/></div>
            </div>
            <div class="field"><label style="font-size:.82rem">Attached Resume / CV</label>
              <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--surface);border:1px dashed var(--line);border-radius:10px">
                <span style="font-size:1.2rem">📄</span>
                <span id="cv-filename" style="font-weight:600;font-size:.88rem;flex:1">Amani_Wekesa_Resume_2026.pdf</span>
                <span class="badge badge-brand">Ready</span>
              </div>
            </div>
            <div class="field"><label style="font-size:.82rem">Brief Note to Hiring Team (Optional)</label>
              <textarea id="app-note" style="min-height:60px;padding:8px 10px;font-size:.88rem" placeholder="Highlight why your skills are a match for ${esc(job.company)}..."></textarea>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:10px">
              <button type="button" class="btn btn-ghost btn-sm" data-act="close">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Submit Application to ${esc(job.company)} →</button>
            </div>
          </form>
        </div>`;
    } else if (status === "pending") {
      ctaSection = `
        <div class="status-box pending">
          <span>⏳</span>
          <div>
            <strong>M-Pesa payment under review.</strong>
            <p style="margin:2px 0 0;font-size:.88rem">Our admin team is verifying your transaction code with Till ${S.config.TILL_NUMBER}. Once verified, application buttons unlock immediately.</p>
          </div>
        </div>`;
    } else {
      ctaSection = `
        <div class="panel" style="padding:18px;background:var(--brand-soft);border-color:color-mix(in srgb, var(--brand) 30%, transparent);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <strong style="color:var(--brand);font-size:1.05rem">Enroll once with M-Pesa to apply</strong>
            <p style="margin:2px 0 0;font-size:.86rem;color:var(--ink-2)">One-time payment of ${fmtKES(S.config.ENROLL_FEE_KES)} to Till <strong>${S.config.TILL_NUMBER}</strong> (${S.config.TILL_NAME}). Guaranteed 100% spam-free & direct hiring.</p>
          </div>
          <a class="btn btn-primary" href="/enroll.html?job=${esc(job.id)}">Enroll to apply · ${fmtKES(S.config.ENROLL_FEE_KES)}</a>
        </div>`;
    }

    const logoHtml = job.logoSvg
      ? `<span class="company-logo-svg" style="width:52px;height:52px">${job.logoSvg}</span>`
      : `<span class="company-logo" style="background:${esc(job.color)}">${esc(initials(job.company))}</span>`;

    d.innerHTML = `
      <div class="dialog-head">
        ${logoHtml}
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <h2 style="font-size:1.45rem;margin:0">${esc(job.title)}</h2>
            ${job.verified !== false ? `<span class="badge badge-verified">${ICONS.verified} Verified Employer</span>` : ""}
          </div>
          <div class="muted" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:4px;font-size:.9rem">
            <strong>${esc(job.company)}</strong>
            <span>${job.flag || "🌍"} ${esc(job.location)}</span>
            ${job.website ? `<a href="${esc(job.website)}" target="_blank" rel="noopener noreferrer" style="color:var(--brand);text-decoration:none;font-weight:600">Company website ↗</a>` : ""}
          </div>
        </div>
        <button class="icon-btn dialog-close" aria-label="Close" data-act="close">${ICONS.close}</button>
      </div>
      <div class="dialog-body job-desc">
        <div class="tags" style="margin:0 0 14px">
          <span class="badge badge-brand">${esc(job.type)}</span>
          <span class="badge badge-muted">${esc(catLabel(job.category))}</span>
          <span class="badge badge-accent" style="font-weight:700">${salaryDisp}</span>
          <span class="badge badge-muted">${job.applicants} applicants</span>
          ${job.tzOverlap ? `<span class="badge badge-muted">Overlap: ${esc(job.tzOverlap)}</span>` : ""}
        </div>

        <div class="anti-scam-callout">
          <span>🛡️</span>
          <div>
            <strong>Verified Direct Employer Listing</strong>
            <p>Every role is verified with the employer. Candidates are reviewed by real hiring managers with zero agency commission cuts. Need help? Call or WhatsApp our helpline at <span style="white-space:nowrap"><strong>0183 036 639</strong>.</span></p>
          </div>
        </div>
        <p>${esc(job.summary)}</p>
        <h4>What you'll do</h4><ul>${(job.responsibilities || []).map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
        <h4>What we're looking for</h4><ul>${(job.requirements || []).map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
        ${ctaSection}
      </div>
      <div class="dialog-foot">
        <span class="muted" style="margin-right:auto;font-size:.88rem;align-self:center">Posted ${ago(job.posted).toLowerCase()} · Inquiries: 0183 036 639</span>
        <button class="btn btn-ghost btn-sm" data-act="close">Close</button>
      </div>`;

    const previewCvBtn = $("#btn-preview-cv", d);
    if (previewCvBtn) {
      previewCvBtn.onclick = () => openCvModal(user ? user.name : "Amani Wekesa");
    }

    const applyForm = $("#apply-form", d);
    if (applyForm) {
      applyForm.onsubmit = (e) => {
        e.preventDefault();
        const linkedin = $("#app-linkedin", d)?.value.trim();
        const github = $("#app-github", d)?.value.trim();
        const note = $("#app-note", d)?.value.trim();
        S.submitApplication({
          jobId: job.id,
          cvName: "Amani_Wekesa_Resume_2026.pdf",
          linkedin,
          github,
          note,
        });
        toast(`Application and CV sent to ${job.company}!`);
        renderAuth();
        openJob(id);
      };
    }

    d.onclick = (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "close") d.close();
      if (act === "signin") { signIn(); openJob(id); }
      if (e.target === d) d.close();
    };

    if (!d.open) d.showModal();
  }

  // ---------- Applications Tracker Modal ----------
  function openApplicationsModal() {
    const d = ensureDialog("apps-modal");
    const user = S.currentUser();
    const apps = S.applications();

    d.innerHTML = `
      <div class="dialog-head">
        <div>
          <h2 style="font-size:1.45rem;margin:0">My Submitted Applications</h2>
          <p class="muted" style="margin:4px 0 0;font-size:.88rem">Track candidate reviews and hiring callbacks for ${esc(user ? user.name : "your account")}.</p>
        </div>
        <button class="icon-btn dialog-close" aria-label="Close" data-act="close">${ICONS.close}</button>
      </div>
      <div class="dialog-body">
        ${apps.length ? apps.map((a) => {
          const badgeClass = a.status === "shortlisted" ? "badge-brand" : a.status === "under_review" ? "badge-accent" : "badge-warn";
          return `
            <div class="panel" style="margin-bottom:14px;padding:18px">
              <div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:8px">
                <div>
                  <h4 style="margin:0 0 4px;font-size:1.05rem">${esc(a.jobTitle)}</h4>
                  <div class="muted" style="font-size:.88rem">Company: <strong>${esc(a.company)}</strong> · Applied: ${esc(a.date)}</div>
                </div>
                <span class="badge ${badgeClass}">${esc(a.status.replace("_", " ").toUpperCase())}</span>
              </div>
              <div style="margin:10px 0;font-size:.85rem;color:var(--ink-2)">
                <span>Attached Resume: 📄 <b>${esc(a.cvName)}</b></span>
                ${a.linkedin ? ` · <a href="${esc(a.linkedin)}" target="_blank" rel="noopener" style="color:var(--brand)">LinkedIn Profile</a>` : ""}
              </div>
              <div class="status-pipeline" style="margin-top:12px">
                <div class="pipeline-step done"><span class="step-dot"></span><span>Submitted</span></div>
                <div class="pipeline-step done"><span class="step-dot"></span><span>Forwarded</span></div>
                <div class="pipeline-step ${a.status === "under_review" || a.status === "shortlisted" ? "done" : ""}"><span class="step-dot"></span><span>Under Review</span></div>
                <div class="pipeline-step ${a.status === "shortlisted" ? "done" : ""}"><span class="step-dot"></span><span>Interview</span></div>
              </div>
            </div>`;
        }).join("") : `<div class="empty"><h3>No applications yet</h3><p>Browse open remote roles and submit your CV.</p></div>`}
      </div>
      <div class="dialog-foot">
        <a class="btn btn-primary" href="/jobs.html">Browse more jobs</a>
        <button class="btn btn-ghost" data-act="close">Close</button>
      </div>`;

    d.onclick = (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "close" || e.target === d) d.close();
    };

    if (!d.open) d.showModal();
  }

  // ---------- Legal / Policy Modal ----------
  function openLegalModal(type) {
    const d = ensureDialog("legal-modal");
    const isTerms = type === "terms";
    d.innerHTML = `
      <div class="dialog-head">
        <div>
          <h2 style="font-size:1.45rem;margin:0">${isTerms ? "Terms of Service & Anti-Scam Policy" : "Privacy Policy & Kenya Data Protection"}</h2>
          <p class="muted" style="margin:4px 0 0;font-size:.85rem">${esc(S.config.REGISTERED_BUSINESS)} · Nairobi, Kenya</p>
        </div>
        <button class="icon-btn dialog-close" aria-label="Close" data-act="close">${ICONS.close}</button>
      </div>
      <div class="dialog-body" style="font-size:.92rem;line-height:1.6">
        ${isTerms ? `
          <h4>1. Spam-Free Direct Marketplace</h4>
          <p>KaziRemote operates a vetted remote marketplace connecting talent in Africa with verified employers globally. To prevent fraudulent listings, our internal review team checks the company registration, active domain, and hiring representative before any job goes live.</p>
          <h4>2. Lipa na M-Pesa Enrollment Fee (Till ${S.config.TILL_NUMBER})</h4>
          <p>Seekers pay a one-time enrollment verification fee of KES 500 to official Safaricom Buy Goods Till <strong>${S.config.TILL_NUMBER}</strong> (${S.config.TILL_NAME}). This fee protects candidates and employers by completely preventing bot automation and scam scraping.</p>
          <h4>3. 100% Satisfaction & 30-Day Money-Back Guarantee</h4>
          <p>If your M-Pesa payment is not verified, or if you are not completely satisfied within 30 days of enrollment, you are entitled to a full refund to your original M-Pesa number. Contact our support desk at ${S.config.CONTACT.PHONE_DISPLAY} or via WhatsApp.</p>
          <h4>4. Zero Commission Cuts</h4>
          <p>Unlike traditional outsourcing agencies, KaziRemote never takes a percentage cut of your remote salary. 100% of the compensation negotiated with the hiring employer is yours.</p>`
        : `
          <h4>1. Kenya Data Protection Act, 2019 Compliance</h4>
          <p>KaziRemote complies strictly with the Kenya Data Protection Act, 2019 (Office of the Data Protection Commissioner - ODPC). Your personal credentials, CV documents, and contact details are stored securely and never sold to third-party advertisers.</p>
          <h4>2. Transmission of Application Details</h4>
          <p>When you submit an application to a verified employer on KaziRemote, your CV, contact email, and optional profile links are forwarded solely to that employer's designated hiring team.</p>
          <h4>3. M-Pesa Transaction Verification</h4>
          <p>M-Pesa transaction codes and phone numbers are collected solely to confirm enrollment through Safaricom Till statements and prevent duplicate activations.</p>`}
      </div>
      <div class="dialog-foot">
        <button class="btn btn-primary" data-act="close">I understand</button>
      </div>`;

    d.onclick = (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "close" || e.target === d) d.close();
    };

    if (!d.open) d.showModal();
  }

  // Delegate clicks on any job card on any page
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-job]");
    if (card) openJob(card.dataset.job);
  });

  document.addEventListener("DOMContentLoaded", renderChrome);

  window.Kazi = {
    $, esc, initials, ago, fmtKES, toast, jobCard, openJob, catLabel,
    signIn, renderAuth, openApplicationsModal, openLegalModal,
    openStkPushModal, openCvModal, openJobAlertsModal
  };
})();
