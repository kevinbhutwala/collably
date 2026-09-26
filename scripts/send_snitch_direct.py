#!/usr/bin/env python3
"""
Direct dispatcher for Snitch Influencer Marketing Team
"""
import os
import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SENDER_EMAIL = "abeycollab@gmail.com"
SENDER_NAME = "Kevin Bhutwala | AbeyCollab"
RECIPIENT_EMAIL = "influencer.reach@snitch.co.in"
APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "").replace(" ", "").strip()

subject = "AbeyCollab × Snitch — Creator Cohorts & Milestone Escrow Collaboration"

text_body = """Hi Snitch Influencer & Creator Partnerships Team,

Thanks for the prompt redirection from your support desk!

I am reaching out from AbeyCollab (https://abeycollab.com)—a creator collaboration platform built to help fast-moving fashion brands scale high-converting creator campaigns without the typical ghosting, payment friction, or delayed drafts.

Given Snitch's rapid drop cadence, we have vetted fashion & lifestyle creators ready for:
1. Fast-paced "3 Ways to Style" reels & transitional streetwear drops
2. GRWM (Get Ready With Me) styling integrations
3. High-engagement unboxings and aesthetic lookbooks

Why D2C brands partner with AbeyCollab:
• Milestone Escrow Protection: Your campaign budget is held securely in escrow and only released after you review and approve the final 4K cut frame-by-frame.
• 0% Platform Agency Fees: We are waiving platform transaction fees for Snitch's first pilot campaign.
• Pre-Vetted Creator Roster: Verified demographics, authentic engagement, and pre-negotiated rate cards ready for instant booking.

Would your team be open to exploring our creator roster at: https://abeycollab.com/creators ?

Or if you would like to run a quick test pilot with 2-3 vetted creators, you can register Snitch directly in 2 minutes: https://abeycollab.com/brand/register .

Looking forward to hearing from you!

Best regards,
Kevin Bhutwala
Founder, AbeyCollab
abeycollab@gmail.com | https://abeycollab.com
"""

html_body = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px; }
    .badge { display: inline-block; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; }
    h2 { color: #0f172a; margin-top: 12px; margin-bottom: 8px; font-size: 20px; }
    p { margin: 14px 0; font-size: 15px; color: #334155; }
    .perks { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 20px 0; }
    .perk-item { margin: 10px 0; font-size: 14px; color: #1e293b; }
    .btn { display: inline-block; background: #ffd21f; color: #0a0a0e; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin-right: 12px; }
    .btn-secondary { display: inline-block; background: #f1f5f9; color: #0f172a; font-weight: 600; font-size: 14px; padding: 12px 20px; border-radius: 10px; text-decoration: none; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">AbeyCollab &times; Snitch Creator Squad</span>
    <h2>Creator Cohorts &amp; Milestone Escrow for Snitch</h2>
    
    <p>Hi Snitch Influencer &amp; Creator Partnerships Team,</p>
    
    <p>Thanks for the prompt redirection from your support desk!</p>
    
    <p>I am reaching out from <a href="https://abeycollab.com" style="color: #0f172a; font-weight: 700;">AbeyCollab</a>—a creator collaboration platform built to help fast-moving fashion brands scale high-converting creator campaigns without the typical ghosting, payment friction, or delayed drafts.</p>
    
    <p>Given Snitch's rapid drop cadence, we have vetted creators ready for:</p>
    <ul>
      <li>Fast-paced <strong>&ldquo;3 Ways to Style&rdquo;</strong> reels &amp; transitional streetwear drops</li>
      <li><strong>GRWM</strong> styling integrations</li>
      <li>High-engagement unboxings and aesthetic lookbooks</li>
    </ul>
    
    <div class="perks">
      <div class="perk-item">&#128737;&#65039; <strong>Milestone Escrow:</strong> Your budget is securely held in escrow and only released after you review and approve the final 4K cut frame-by-frame.</div>
      <div class="perk-item">&#127873; <strong>0% Platform Fees:</strong> We are waiving platform transaction fees for Snitch's first pilot campaign.</div>
      <div class="perk-item">&#10024; <strong>Pre-Vetted Roster:</strong> Verified demographics, authentic engagement, and pre-negotiated rate cards ready for instant booking.</div>
    </div>
    
    <div style="margin: 28px 0;">
      <a href="https://abeycollab.com/creators" class="btn">Explore Creator Roster &rarr;</a>
      <a href="https://abeycollab.com/brand/register" class="btn-secondary">Post a Brief (2 mins)</a>
    </div>
    
    <div class="footer">
      <strong>Kevin Bhutwala</strong><br>
      Founder, <a href="https://abeycollab.com" style="color: #0f172a;">AbeyCollab</a><br>
      <a href="mailto:abeycollab@gmail.com" style="color: #64748b;">abeycollab@gmail.com</a>
    </div>
  </div>
</body>
</html>"""

def main():
    if not APP_PASSWORD:
        print("[!] Missing GMAIL_APP_PASSWORD")
        sys.exit(1)

    print(f"[*] Sending direct email to Snitch: {RECIPIENT_EMAIL}...")
    server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    server.login(SENDER_EMAIL, APP_PASSWORD)

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
    msg["To"] = RECIPIENT_EMAIL
    msg["Reply-To"] = SENDER_EMAIL

    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    server.sendmail(SENDER_EMAIL, [RECIPIENT_EMAIL], msg.as_string())
    server.quit()
    print("[+] Successfully delivered to Snitch Influencer Team!")

if __name__ == "__main__":
    main()
