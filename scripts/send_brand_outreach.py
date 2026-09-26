#!/usr/bin/env python3
"""
AbeyCollab Brand Outreach Automated Dispatcher
Sends personalized outreach emails from abeycollab@gmail.com to curated startup brand leads.
Supports Skincare, Fashion, Fitness, and Lifestyle categories with tailored creator recommendations.
"""

import csv
import os
import sys
import time
import argparse
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SENDER_EMAIL = "abeycollab@gmail.com"
SENDER_NAME = "Kevin Bhutwala | AbeyCollab"
CSV_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "brand_outreach_leads.csv")

def get_niche_creators(category: str):
    cat_lower = category.lower()
    if any(k in cat_lower for k in ["skin", "beauty", "cosmetic", "derma", "care"]):
        return {
            "subject": "Quick creator collab idea for {brand_name} (0% agency fee pilot)",
            "niche_label": "Skincare & Beauty",
            "creators_text": "Chetali Chadha (@chetalichadha, 78K), Priya Chaudhari (@_priyachaudhari, 62K), and Vasudha Rai (@vasudha.rai, 82K)",
            "creators_html": "<strong>Chetali Chadha</strong> (<em>@chetalichadha</em>, 78K), <strong>Priya Chaudhari</strong> (<em>@_priyachaudhari</em>, 62K), and <strong>Vasudha Rai</strong> (<em>@vasudha.rai</em>, 82K)",
            "roster_url": "https://abeycollab.com/creators?category=Beauty"
        }
    elif any(k in cat_lower for k in ["fashion", "streetwear", "apparel", "wear", "denim", "saree", "jewelry"]):
        return {
            "subject": "Styling & GRWM reels for {brand_name} (vetted creator roster)",
            "niche_label": "Fashion & Streetwear",
            "creators_text": "Mann Vaishnav (@mr_mannvaishnav, 88K), Tanya Singh (@itistanyasingh, 64K), and Sparsh Alawadhi (@sparshalawadhi, 95K)",
            "creators_html": "<strong>Mann Vaishnav</strong> (<em>@mr_mannvaishnav</em>, 88K), <strong>Tanya Singh</strong> (<em>@itistanyasingh</em>, 64K), and <strong>Sparsh Alawadhi</strong> (<em>@sparshalawadhi</em>, 95K)",
            "roster_url": "https://abeycollab.com/creators?category=Fashion"
        }
    elif any(k in cat_lower for k in ["fitness", "nutrition", "protein", "wellness", "activewear", "oral"]):
        return {
            "subject": "High-impact creator campaigns for {brand_name} (milestone escrow)",
            "niche_label": "Fitness & Wellness",
            "creators_text": "Kunal Rajput (@subtle.strength, 50K), Ashfina Charania (@thewickedsoul, 65K), and Sid Bhawsar (@thesept_boy, 92K)",
            "creators_html": "<strong>Kunal Rajput</strong> (<em>@subtle.strength</em>, 50K), <strong>Ashfina Charania</strong> (<em>@thewickedsoul</em>, 65K), and <strong>Sid Bhawsar</strong> (<em>@thesept_boy</em>, 92K)",
            "roster_url": "https://abeycollab.com/creators?category=Fitness"
        }
    elif any(k in cat_lower for k in ["tech", "keyboard", "audio", "desk", "smartwatch"]):
        return {
            "subject": "Minimalist desk & tech showcase for {brand_name} (milestone escrow)",
            "niche_label": "Tech & Workspace",
            "creators_text": "Sid Bhawsar (@thesept_boy, 92K), Daniel Titchener (@danieltitchener, 140K), and Martin Flindt (@martinflindt, 95K)",
            "creators_html": "<strong>Sid Bhawsar</strong> (<em>@thesept_boy</em>, 92K), <strong>Daniel Titchener</strong> (<em>@danieltitchener</em>, 140K), and <strong>Martin Flindt</strong> (<em>@martinflindt</em>, 95K)",
            "roster_url": "https://abeycollab.com/creators?category=Tech"
        }
    elif any(k in cat_lower for k in ["beverage", "soda", "coffee", "roaster", "cereal", "food", "snack", "cocktail", "nutrition", "protein"]):
        return {
            "subject": "Quick creator collab idea for {brand_name} (0% agency fee pilot)",
            "niche_label": "Food & Beverage",
            "creators_text": "Shreya Arora (@shreya.arora, 84K), Ashfina Charania (@thewickedsoul, 65K), and Kunal Rajput (@subtle.strength, 50K)",
            "creators_html": "<strong>Shreya Arora</strong> (<em>@shreya.arora</em>, 84K), <strong>Ashfina Charania</strong> (<em>@thewickedsoul</em>, 65K), and <strong>Kunal Rajput</strong> (<em>@subtle.strength</em>, 50K)",
            "roster_url": "https://abeycollab.com/creators?category=Lifestyle"
        }
    elif any(k in cat_lower for k in ["pet", "home", "cookware", "kitchen", "fragrance", "incense", "travel", "edc"]):
        return {
            "subject": "Aesthetic visual campaigns for {brand_name} (vetted creator roster)",
            "niche_label": "Design & Lifestyle",
            "creators_text": "Samantha Ferreira (@samanthaferreira, 98K), Ashfina Charania (@thewickedsoul, 65K), and Sid Bhawsar (@thesept_boy, 92K)",
            "creators_html": "<strong>Samantha Ferreira</strong> (<em>@samanthaferreira</em>, 98K), <strong>Ashfina Charania</strong> (<em>@thewickedsoul</em>, 65K), and <strong>Sid Bhawsar</strong> (<em>@thesept_boy</em>, 92K)",
            "roster_url": "https://abeycollab.com/creators?category=Lifestyle"
        }
    else:
        return {
            "subject": "Quick idea for {brand_name} × creator collaborations",
            "niche_label": "Lifestyle & D2C",
            "creators_text": "Prarthana (@prarthaana.04, 30K), Shreya Arora (@shreya.arora, 84K), and Samantha Ferreira (@samanthaferreira, 98K)",
            "creators_html": "<strong>Prarthana</strong> (<em>@prarthaana.04</em>, 30K), <strong>Shreya Arora</strong> (<em>@shreya.arora</em>, 84K), and <strong>Samantha Ferreira</strong> (<em>@samanthaferreira</em>, 98K)",
            "roster_url": "https://abeycollab.com/creators"
        }

def build_email_body(brand_name, category, pitch_hook):
    niche_info = get_niche_creators(category)
    subject = niche_info["subject"].format(brand_name=brand_name)
    roster_url = niche_info["roster_url"]
    creators_text = niche_info["creators_text"]
    creators_html = niche_info["creators_html"]

    text_content = f"""Hi {brand_name} Partnerships Team,

Huge fan of {brand_name}'s recent releases and visual storytelling.

I noticed you frequently collaborate with creators for visual campaigns. We recently launched AbeyCollab (https://abeycollab.com)—a creator collaboration platform built specifically to eliminate creator ghosting, endless contract friction, and payment risks:

1. Milestone Escrow Protection: Your campaign budget stays securely locked in escrow. Funds are only disbursed when you review the 4K draft frame-by-frame and click "Approve". If a creator flakes, 100% of your budget is automatically refunded.
2. Hand-Vetted Mid-Tier Creators (30K–100K): No overpriced celebrities with low engagement. We feature authentic creators like {creators_text} who have real, high-converting audiences.
3. Tailored for {brand_name}: Vetted talent ready for {pitch_hook}.

We are onboarding a select cohort of founding D2C brands this month and waiving 100% of platform agency fees for your first pilot campaign.

Would you be open to browsing our creator roster here: {roster_url} ?

Or if you have an upcoming launch brief ready, you can submit it in 2 minutes: https://abeycollab.com/brand/register .

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
    .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }}
    .header {{ margin-bottom: 24px; }}
    .badge {{ display: inline-block; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; }}
    h2 {{ color: #0f172a; margin-top: 12px; margin-bottom: 8px; font-size: 20px; }}
    p {{ margin: 14px 0; font-size: 15px; color: #334155; }}
    .perks {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 20px 0; }}
    .perk-item {{ margin: 12px 0; font-size: 14px; color: #1e293b; line-height: 1.5; }}
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
    
    <p>Huge fan of {brand_name}&rsquo;s recent releases and visual storytelling.</p>
    
    <p>I noticed you frequently collaborate with creators for visual campaigns. We recently launched <a href="https://abeycollab.com" style="color: #0f172a; font-weight: 700;">AbeyCollab</a>&mdash;a creator collaboration platform built specifically to eliminate creator ghosting, endless contract friction, and payment risks:</p>
    
    <div class="perks">
      <div class="perk-item">&#128737;&#65039; <strong>Milestone Escrow Protection:</strong> Your budget is securely locked in escrow. Funds are only disbursed when you review the 4K draft frame-by-frame and click &ldquo;Approve&rdquo;. If a creator flakes, 100% of your budget is automatically refunded.</div>
      <div class="perk-item">&#10024; <strong>Hand-Vetted Mid-Tier Creators (30K&ndash;100K):</strong> Authentic creators with real, high-converting audiences like {creators_html}.</div>
      <div class="perk-item">&#127919; <strong>Tailored for {brand_name}:</strong> Vetted creators specialized in <em>{pitch_hook}</em>.</div>
    </div>
    
    <p>We are onboarding a select cohort of founding D2C brands this month and <strong>waiving 100% of platform agency fees</strong> for your first pilot campaign.</p>
    
    <div class="cta-container">
      <a href="{roster_url}" class="btn">Explore Creator Roster &rarr;</a>
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

    return subject, text_content, html_content

def main():
    parser = argparse.ArgumentParser(description="AbeyCollab Brand Outreach Dispatcher")
    parser.add_argument("--preview", "--dry-run", dest="dry_run", action="store_true", help="Simulate without sending emails")
    parser.add_argument("--category", type=str, default="all", help="Filter by category (e.g. skin, fashion, fitness, all)")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of emails to process")
    args = parser.parse_args()

    app_password = os.environ.get("GMAIL_APP_PASSWORD", "").replace(" ", "").strip()

    if not args.dry_run and not app_password:
        print("[!] ERROR: GMAIL_APP_PASSWORD environment variable not set.")
        print("    To send emails, generate a 16-character Google App Password for abeycollab@gmail.com")
        print("    and run: GMAIL_APP_PASSWORD='your-16-char-password' python3 scripts/send_brand_outreach.py")
        print("    Or run with --preview to inspect drafts without sending.")
        sys.exit(1)

    with open(CSV_FILE_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        leads = list(reader)

    print(f"[*] Loaded {len(leads)} brand leads from {CSV_FILE_PATH}")
    print(f"[*] Sender: {SENDER_NAME} <{SENDER_EMAIL}>")
    print(f"[*] Category Filter: {args.category.upper()}")
    print(f"[*] Mode: {'PREVIEW / DRY RUN (No emails sent)' if args.dry_run else 'LIVE DISPATCH'}")
    print("=" * 65)

    server = None
    if not args.dry_run:
        print("[*] Connecting to Google SMTP (smtp.gmail.com:465)...")
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(SENDER_EMAIL, app_password)
        print("[+] Logged into Gmail SMTP successfully!")

    success_count = 0
    skipped_count = 0

    for idx, row in enumerate(leads, 1):
        if args.limit and success_count >= args.limit:
            break

        brand_name = row.get("Brand Name", "").strip()
        recipient_email = row.get("Email ID", "").strip()
        category = row.get("Category", "").strip()
        pitch_hook = row.get("Pitch Hook / Angle", "").strip()
        status = row.get("Status", "").strip()

        # Check status
        if status.lower().startswith("replied") or status.lower().startswith("skip") or status.lower().startswith("sent"):
            print(f"[-] [{idx}/{len(leads)}] Skipping {brand_name} (Status: {status})")
            skipped_count += 1
            continue

        # Check category filter
        niche_info = get_niche_creators(category)
        if args.category != "all":
            filter_cat = args.category.lower()
            if filter_cat not in category.lower() and filter_cat not in niche_info["niche_label"].lower():
                continue

        if not recipient_email or "@" not in recipient_email:
            print(f"[-] [{idx}/{len(leads)}] Skipping {brand_name} (Invalid email: '{recipient_email}')")
            skipped_count += 1
            continue

        subject, text_body, html_body = build_email_body(brand_name, category, pitch_hook)

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
        msg["To"] = recipient_email
        msg["Reply-To"] = SENDER_EMAIL

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        if args.dry_run:
            print(f"\n[{idx}/{len(leads)}] PREVIEW: To: {brand_name} <{recipient_email}>")
            print(f"    Category: {category}")
            print(f"    Subject:  {subject}")
            print(f"    Hook:     {pitch_hook}")
            success_count += 1
        else:
            try:
                server.sendmail(SENDER_EMAIL, [recipient_email], msg.as_string())
                print(f"[+] [{idx}/{len(leads)}] Sent to {brand_name} <{recipient_email}>")
                row["Status"] = f"Sent ({time.strftime('%Y-%m-%d %H:%M')})"
                success_count += 1
                
                # Persist status immediately to CSV
                with open(CSV_FILE_PATH, mode="w", encoding="utf-8", newline="") as f_out:
                    fieldnames = ["Brand Name", "Category", "Email ID", "Instagram Handle", "Website", "Pitch Hook / Angle", "Status"]
                    writer = csv.DictWriter(f_out, fieldnames=fieldnames)
                    writer.writeheader()
                    writer.writerows(leads)
                
                time.sleep(2)  # Pause between sends to adhere to rate limits
            except Exception as e:
                print(f"[!] Failed to send to {brand_name} ({recipient_email}): {e}")

    if server:
        server.quit()

    print("\n" + "=" * 65)
    print(f"[*] Finished! Processed {success_count} emails ({skipped_count} skipped/replied).")

if __name__ == "__main__":
    main()
