const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REELS_DIR = path.join(__dirname, '../public/reels');
if (!fs.existsSync(REELS_DIR)) fs.mkdirSync(REELS_DIR, { recursive: true });

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AbeyCollab Debut Reel</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 720px;
    height: 1280px;
    background: #090d16;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
    overflow: hidden;
    position: relative;
  }

  /* Ambient glowing background circles */
  .bg-glow-1 {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%);
    top: -100px;
    left: -100px;
    border-radius: 50%;
    filter: blur(40px);
  }
  .bg-glow-2 {
    position: absolute;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0) 70%);
    bottom: 50px;
    right: -100px;
    border-radius: 50%;
    filter: blur(50px);
  }

  .stage {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 60px 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Header Branding */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  }
  .brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 20px;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  }
  .brand-name {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(to right, #ffffff, #cbd5e1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .live-badge {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.4);
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .pulse-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 10px #10b981;
  }

  /* SCENE 1: The Frustrating DMs (0s - 4.5s) */
  #scene1 {
    position: absolute;
    top: 140px;
    left: 48px;
    right: 48px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hook-title {
    font-size: 42px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 32px;
  }
  .highlight-red {
    color: #f43f5e;
    text-shadow: 0 0 25px rgba(244, 63, 94, 0.5);
  }

  .dm-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    padding: 20px 24px;
    margin-bottom: 18px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    opacity: 0;
    transform: translateY(20px) scale(0.96);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dm-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
  .dm-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
  }
  .dm-user { font-size: 15px; font-weight: 700; color: #f1f5f9; }
  .dm-text { font-size: 17px; line-height: 1.4; color: #cbd5e1; font-weight: 600; }
  .dm-tag {
    display: inline-block;
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
    font-size: 11px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 6px;
    margin-top: 8px;
    text-transform: uppercase;
  }

  /* SCENE 2: The Breakthrough / Pivot (4.5s - 8s) */
  #scene2 {
    position: absolute;
    top: 360px;
    left: 48px;
    right: 48px;
    text-align: center;
    opacity: 0;
    transform: scale(0.85);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .big-stop {
    font-size: 58px;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin-bottom: 24px;
  }
  .big-stop span {
    background: linear-gradient(135deg, #f43f5e 0%, #fb923c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .sub-stop {
    font-size: 24px;
    font-weight: 600;
    color: #94a3b8;
  }

  /* SCENE 3: The AbeyCollab Solution (8s - 14s) */
  #scene3 {
    position: absolute;
    top: 130px;
    left: 48px;
    right: 48px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .solution-badge {
    display: inline-block;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%);
    border: 1px solid rgba(165, 180, 252, 0.3);
    color: #a5b4fc;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }
  .solution-title {
    font-size: 44px;
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1.15;
    margin-bottom: 28px;
  }
  .feature-box {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
  .feature-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    flex-shrink: 0;
  }
  .icon-green { background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); }
  .icon-blue { background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); }
  .icon-purple { background: rgba(168, 85, 247, 0.2); border: 1px solid rgba(168, 85, 247, 0.4); }

  .feature-info h3 { font-size: 20px; font-weight: 800; margin-bottom: 4px; color: #ffffff; }
  .feature-info p { font-size: 15px; color: #94a3b8; font-weight: 500; }
  .escrow-pill {
    background: #10b981;
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 999px;
    display: inline-block;
    margin-left: 8px;
  }

  /* SCENE 4: CTA / Outro (14s - 18s) */
  #scene4 {
    position: absolute;
    top: 260px;
    left: 48px;
    right: 48px;
    text-align: center;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cta-headline {
    font-size: 50px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1.5px;
    margin-bottom: 24px;
  }
  .cta-desc {
    font-size: 20px;
    color: #cbd5e1;
    margin-bottom: 44px;
    line-height: 1.4;
  }
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    color: #ffffff;
    font-size: 22px;
    font-weight: 800;
    padding: 22px 42px;
    border-radius: 999px;
    box-shadow: 0 10px 40px rgba(99, 102, 241, 0.6);
  }
  .cta-sub {
    font-size: 16px;
    color: #94a3b8;
    margin-top: 24px;
    font-weight: 600;
  }

  /* Bottom Progress Bar */
  .footer-progress {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
    z-index: 10;
  }
  .progress-bar {
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, #6366f1, #ec4899);
    transition: width 18s linear;
  }
</style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>

  <div class="stage">
    <!-- Header -->
    <div class="header">
      <div class="brand-logo">
        <div class="brand-icon">A</div>
        <div class="brand-name">AbeyCollab</div>
      </div>
      <div class="live-badge">
        <span class="pulse-dot"></span> EARLY ACCESS LIVE
      </div>
    </div>

    <!-- SCENE 1: The DM Nightmare -->
    <div id="scene1">
      <div class="hook-title">
        POV: You're an Indian creator checking brand DMs in 2026 <span class="highlight-red">💀</span>
      </div>

      <div class="dm-card" id="dm1">
        <div class="dm-header">
          <div class="dm-avatar">💄</div>
          <div class="dm-user">glow_ayurveda_official</div>
        </div>
        <div class="dm-text">"Hey dear, barter collab? We send 1 lip balm, you give 3 Reels, 5 Stories & YouTube integration."</div>
        <div class="dm-tag">❌ Absurd Barter</div>
      </div>

      <div class="dm-card" id="dm2">
        <div class="dm-header">
          <div class="dm-avatar">⏳</div>
          <div class="dm-user">trendy_apparels_in</div>
        </div>
        <div class="dm-text">"Payment terms: 90 to 180 business days after the festive season invoice approval."</div>
        <div class="dm-tag">❌ Delayed Payout</div>
      </div>

      <div class="dm-card" id="dm3">
        <div class="dm-header">
          <div class="dm-avatar">👻</div>
          <div class="dm-user">middleman_media_agency</div>
        </div>
        <div class="dm-text">"Deliverables submitted? Great! *[Seen at 11:42 AM - No Response for 3 Weeks]*"</div>
        <div class="dm-tag">❌ Ghost Agency</div>
      </div>
    </div>

    <!-- SCENE 2: The Stop Pivot -->
    <div id="scene2">
      <div class="big-stop">
        Can we PLEASE stop doing collabs in <span>random DMs?</span> 🛑
      </div>
      <div class="sub-stop">There is a much better way to work with brands.</div>
    </div>

    <!-- SCENE 3: The AbeyCollab Solution -->
    <div id="scene3">
      <div class="solution-badge">✨ The New Standard</div>
      <div class="solution-title">Meet AbeyCollab.<br>India's Creator Platform.</div>

      <div class="feature-box">
        <div class="feature-icon icon-green">🛡️</div>
        <div class="feature-info">
          <h3>Milestone Escrow <span class="escrow-pill">PAYOUT LOCKED</span></h3>
          <p>Brand funds are deposited in escrow before you shoot. Payment released on time.</p>
        </div>
      </div>

      <div class="feature-box">
        <div class="feature-icon icon-blue">🎯</div>
        <div class="feature-info">
          <h3>Verified D2C Brand Briefs</h3>
          <p>Direct campaigns matching your exact niche (Fashion, Tech, Beauty, Fitness).</p>
        </div>
      </div>

      <div class="feature-box">
        <div class="feature-icon icon-purple">💰</div>
        <div class="feature-info">
          <h3>0% Platform Fee</h3>
          <p>No agency cuts. You keep 100% of your agreed commercial fee.</p>
        </div>
      </div>
    </div>

    <!-- SCENE 4: CTA -->
    <div id="scene4">
      <div class="solution-badge">⚡ Now Onboarding</div>
      <div class="cta-headline">Stop chasing invoices.<br>Start real collabs.</div>
      <div class="cta-desc">Join our exclusive cohort of Indian creators for upcoming festive D2C campaigns.</div>
      <div class="cta-button">
        <span>abeycollab.com</span> <span>🚀</span>
      </div>
      <div class="cta-sub">🔗 Link in Bio — @abeycollab</div>
    </div>

    <!-- Bottom Progress Indicator -->
    <div class="footer-progress">
      <div class="progress-bar" id="progressBar"></div>
    </div>
  </div>

  <script>
    const scene1 = document.getElementById('scene1');
    const dm1 = document.getElementById('dm1');
    const dm2 = document.getElementById('dm2');
    const dm3 = document.getElementById('dm3');
    const scene2 = document.getElementById('scene2');
    const scene3 = document.getElementById('scene3');
    const scene4 = document.getElementById('scene4');
    const progressBar = document.getElementById('progressBar');

    // Start progress bar
    setTimeout(() => { progressBar.style.width = '100%'; }, 50);

    // Sequence timeline (18 seconds total)
    // 0.5s: Scene 1 enters
    setTimeout(() => {
      scene1.style.opacity = '1';
      scene1.style.transform = 'translateY(0)';
    }, 500);

    // 1.2s: DM 1 pop
    setTimeout(() => {
      dm1.style.opacity = '1';
      dm1.style.transform = 'translateY(0) scale(1)';
    }, 1200);

    // 2.3s: DM 2 pop
    setTimeout(() => {
      dm2.style.opacity = '1';
      dm2.style.transform = 'translateY(0) scale(1)';
    }, 2300);

    // 3.4s: DM 3 pop
    setTimeout(() => {
      dm3.style.opacity = '1';
      dm3.style.transform = 'translateY(0) scale(1)';
    }, 3400);

    // 5.0s: Scene 1 exits, Scene 2 enters
    setTimeout(() => {
      scene1.style.opacity = '0';
      scene1.style.transform = 'translateY(-30px)';
      setTimeout(() => {
        scene2.style.opacity = '1';
        scene2.style.transform = 'scale(1)';
      }, 300);
    }, 5000);

    // 8.2s: Scene 2 exits, Scene 3 enters (AbeyCollab)
    setTimeout(() => {
      scene2.style.opacity = '0';
      scene2.style.transform = 'scale(1.1)';
      setTimeout(() => {
        scene3.style.opacity = '1';
        scene3.style.transform = 'translateY(0)';
      }, 300);
    }, 8200);

    // 13.8s: Scene 3 exits, Scene 4 enters (CTA)
    setTimeout(() => {
      scene3.style.opacity = '0';
      scene3.style.transform = 'translateY(-30px)';
      setTimeout(() => {
        scene4.style.opacity = '1';
        scene4.style.transform = 'scale(1)';
      }, 300);
    }, 13800);
  </script>
</body>
</html>`;

const HTML_PATH = path.join(REELS_DIR, 'abeycollab_reel_preview.html');
const VIDEO_PATH = path.join(REELS_DIR, 'abeycollab_debut_reel.webm');
const MP4_PATH = path.join(REELS_DIR, 'abeycollab_debut_reel.mp4');

fs.writeFileSync(HTML_PATH, HTML_CONTENT, 'utf-8');
console.log('[+] Saved standalone animated Reel page to:', HTML_PATH);

async function renderReelVideo() {
  console.log('[*] Launching Chromium to record video reel in vertical 720x1280 (9:16)...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    recordVideo: {
      dir: REELS_DIR,
      size: { width: 720, height: 1280 }
    },
    viewport: { width: 720, height: 1280 }
  });

  const page = await context.newPage();
  console.log('[*] Loading Reel animation stage...');
  await page.goto('file://' + HTML_PATH, { waitUntil: 'networkidle' });

  // Total recording duration: 18.5 seconds
  console.log('[*] Recording 18.5 second high-energy animated sequence...');
  await page.waitForTimeout(18500);

  console.log('[*] Finalizing and encoding video stream...');
  await page.close();
  await context.close();
  await browser.close();

  // Find generated webm file in directory
  const files = fs.readdirSync(REELS_DIR).filter(f => f.endsWith('.webm') && f.startsWith('page@'));
  if (files.length > 0) {
    const latestFile = path.join(REELS_DIR, files[files.length - 1]);
    fs.copyFileSync(latestFile, VIDEO_PATH);
    console.log('[+] Video successfully recorded and saved to:', VIDEO_PATH);

    // Try converting to MP4 using macOS native avconvert
    try {
      console.log('[*] Converting to standard MP4 using macOS avconvert...');
      execSync('avconvert --source "' + VIDEO_PATH + '" --output "' + MP4_PATH + '" --preset PresetHEVCHighestQuality --replace', { stdio: 'pipe' });
      console.log('[+] MP4 version created at:', MP4_PATH);
    } catch (err) {
      console.log('[*] Note: WebM video is ready directly.');
    }
  }

  console.log('[*] Reel generation complete!');
}

renderReelVideo();
