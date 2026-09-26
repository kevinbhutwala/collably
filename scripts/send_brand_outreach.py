#!/usr/bin/env python3
"""
AbeyCollab Brand Outreach Automated Dispatcher
Sends personalized outreach emails from abeycollab@gmail.com to curated brand leads.
"""

import csv
import os
import sys
import time
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SENDER_EMAIL = "abeycollab@gmail.com"
SENDER_NAME = "Kevin Bhutwala | AbeyCollab"
CSV_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "brand_outreach_leads.csv")

def build_email_body(brand_name, category, pitch_hook):
    text_content = f"""Hi {brand_name} Partnerships Team,

Big fan of your latest releases and brand storytelling.

I noticed you frequently collaborate with creators for visual campaigns. We recently launched AbeyCollab (https://abeycollab.com)—a creator collaboration platform built specifically to eliminate creator ghosting, endless contract back-and-forth, and upfront payment risks:

1. Milestone Escrow Protection: Your campaign budget stays securely locked in escrow. Funds are only disbursed when you review the 4K draft frame-by-frame and click "Approve".
2. Vetted Creator Roster: Pre-negotiated rate cards, audited engagement metrics, and verified creator portfolios ready for instant booking.
3. Tailored for {brand_name}: Vetted talent ready for {pitch_hook}.

We are onboarding a select cohort of founding D2C brands this month and waiving all platform agency fees for your first pilot campaign.

Would you be open to browsing our creator roster here: https://abeycollab.com/creators ?

Or if you have a brief ready, you can post it directly in 2 minutes: https://abeycollab.com/brand/register .

Best regards,
Kevin Bhutwala
Founder, AbeyCollab
abeycollab@gmail.com | https://abeycollab.com
"""

    html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }}
    .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px; }}
    .header {{ margin-bottom: 24px; }}
    .badge {{ display: inline-block; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; }}
    h2 {{ color: #0f172a; margin-top: 12px; margin-bottom: 8px; font-size: 20px; }}
    p {{ margin: 14px 0; font-size: 15px; color: #334155; }}
    .perks {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 20px 0; }}
    .perk-item {{ margin: 10px 0; font-size: 14px; color: #1e293b; }}
    .perk-item strong {{ color: #0f172a; }}
    .cta-container {{ margin: 28px 0; text-align: left; }}
    .btn {{ display: inline-block; background: #ffd21f; color: #0a0a0e; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin-right: 12px; margin-bottom: 10px; }}
    .btn-secondary {{ display: inline-block; background: #f1f5f9; color: #0f172a; font-weight: 600; font-size: 14px; padding: 12px 20px; border-radius: 10px; text-decoration: none; }}
    .footer {{ margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">AbeyCollab &times; {brand_name}</span>
      <h2>Quick idea for {brand_name} &times; creator collaborations</h2>
    </div>
    
    <p>Hi {brand_name} Partnerships Team,</p>
    
    <p>Big fan of your latest releases and visual storytelling.</p>
    
    <p>I noticed you frequently collaborate with creators for visual campaigns. We recently launched <a href="https://abeycollab.com" style="color: #0f172a; font-weight: 700;">AbeyCollab</a>—a creator collaboration platform built specifically to eliminate creator ghosting, endless contract friction, and payment risks:</p>
    
    <div class="perks">
      <div class="perk-item">&#128737;&#65039; <strong>Milestone Escrow Protection:</strong> Your budget is securely locked in escrow. Funds are only disbursed when you review the 4K draft frame-by-frame and click &ldquo;Approve&rdquo;.</div>
      <div class="perk-item">&#10024; <strong>Vetted Creator Roster:</strong> Pre-negotiated rate cards, verified demographics, and 4K production reels ready for instant booking.</div>
      <div class="perk-item">&#127919; <strong>Tailored for {brand_name}:</strong> Vetted creators specialized in <em>{pitch_hook}</em>.</div>
    </div>
    
    <p>We are onboarding a select cohort of founding D2C brands this month and <strong>waiving all platform agency fees</strong> for your first pilot campaign.</p>
    
    <div class="cta-container">
      <a href="https://abeycollab.com/creators" class="btn">Explore Creator Roster &rarr;</a>
      <a href="https://abeycollab.com/brand/register" class="btn-secondary">Post a Brief (2 mins)</a>
    </div>
    
    <div class="footer">
      <strong>Kevin Bhutwala</strong><br>
      Founder, <a href="https://abeycollab.com" style="color: #0f172a;">AbeyCollab</a><br>
      <a href="mailto:abeycollab@gmail.com" style="color: #64748b;">abeycollab@gmail.com</a> | Mumbai &bull; Global
    </div>
  </div>
</body>
</html>"""

    return text_content, html_content

def main():
    is_dry_run = "--dry-run" in sys.argv or "--preview" in sys.argv
    app_password = os.environ.get("GMAIL_APP_PASSWORD", "").replace(" ", "").strip()

    if not is_dry_run and not app_password:
        print("[!] ERROR: GMAIL_APP_PASSWORD environment variable not set.")
        print("    To send emails, generate a 16-character Google App Password for abeycollab@gmail.com")
        print("    and run: GMAIL_APP_PASSWORD='your-16-char-password' python3 scripts/send_brand_outreach.py")
        print("    Or run with --preview to inspect all 25 drafts without sending.")
        sys.exit(1)

    with open(CSV_FILE_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        leads = list(reader)

    print(f"[*] Loaded {len(leads)} brand leads from {CSV_FILE_PATH}")
    print(f"[*] Sender: {SENDER_NAME} <{SENDER_EMAIL}>")
    print(f"[*] Mode: {'PREVIEW / DRY RUN (No emails sent)' if is_dry_run else 'LIVE DISPATCH'}")
    print("=" * 60)

    server = None
    if not is_dry_run:
        print("[*] Connecting to Google SMTP (smtp.gmail.com:465)...")
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(SENDER_EMAIL, app_password)
        print("[+] Logged into Gmail SMTP successfully!")

    success_count = 0

    for idx, row in enumerate(leads, 1):
        brand_name = row.get("Brand Name", "").strip()
        recipient_email = row.get("Email ID", "").strip()
        category = row.get("Category", "").strip()
        pitch_hook = row.get("Pitch Hook / Angle", "").strip()

        if not recipient_email or "@" not in recipient_email:
            print(f"[-] [{idx}/{len(leads)}] Skipping {brand_name} (Invalid email: '{recipient_email}')")
            continue

        subject = f"Quick idea for {brand_name} × creator collaborations"
        text_body, html_body = build_email_body(brand_name, category, pitch_hook)

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
        msg["To"] = recipient_email
        msg["Reply-To"] = SENDER_EMAIL

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        if is_dry_run:
            print(f"\n[{idx}/{len(leads)}] PREVIEW: To: {brand_name} <{recipient_email}>")
            print(f"    Subject: {subject}")
            print(f"    Angle:   {pitch_hook}")
            success_count += 1
        else:
            try:
                server.sendmail(SENDER_EMAIL, [recipient_email], msg.as_string())
                print(f"[+] [{idx}/{len(leads)}] Sent to {brand_name} <{recipient_email}>")
                success_count += 1
                time.sleep(2)  # 2 second pause between sends to comply with rate limits
            except Exception as e:
                print(f"[!] Failed to send to {brand_name} ({recipient_email}): {e}")

    if server:
        server.quit()

    print("\n" + "=" * 60)
    print(f"[*] Finished! Processed {success_count}/{len(leads)} brands successfully.")

if __name__ == "__main__":
    main()
