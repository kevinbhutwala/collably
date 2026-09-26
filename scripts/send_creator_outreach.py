#!/usr/bin/env python3
"""
AbeyCollab - Creator Outreach Email Dispatcher
Sends personalized, human outreach emails to verified Indian creators
introducing AbeyCollab platform opportunities.
"""

import os
import sys
import csv
import smtplib
import argparse
import time
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

CSV_PATH = os.path.join(os.path.dirname(__file__), "../data/creator_outreach_leads.csv")
LOG_PATH = os.path.join(os.path.dirname(__file__), "../data/creator_outreach_log.csv")

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465
SENDER_EMAIL = "abeycollab@gmail.com"
SENDER_NAME = "Kevin Bhutwala | AbeyCollab"
DEFAULT_PASSWORD = "nazy iopv xjac xgsx"


def get_first_name(full_name: str) -> str:
    name = full_name.split("(")[0].strip()
    return name.split()[0].capitalize()


def build_email_content(row: dict) -> tuple[str, str, str]:
    creator_name = row["Creator Name"].strip()
    first_name = get_first_name(creator_name)
    category = row["Category"].strip()
    handle = row["Instagram Handle"].strip()
    reason = row["Personalization Reason"].strip()

    subject = f"Hey {first_name} — brand collabs on AbeyCollab? ({handle})"

    plain_text = f"""Hey {first_name},

Hope you're having a productive week!

I came across your work over on {handle} — really love how you approach {category.lower()} content. {reason}

I'm Kevin, founder of AbeyCollab (https://abeycollab.com). We're an India-first platform connecting high-quality creators directly with fast-growing D2C and lifestyle brands.

We built AbeyCollab because dealing with brand collabs today is frankly broken:
• Chasing endless Instagram DMs and random agencies
• Payment delays and unclear campaign deliverables
• Having to pitch dozens of brands without hearing back

On AbeyCollab:
1. Brands post verified campaign briefs directly in your niche ({category}).
2. Milestone Escrow Protection ensures your agreed payout is locked before you shoot a single frame and released promptly upon delivery approval.
3. Zero fees for creators — 100% of your commercial rate goes to you.

We are currently onboarding a curated cohort of 30 creators for our upcoming festive & Q4 brand campaigns with D2C labels across beauty, fashion, fitness, and lifestyle.

Would love to send you an early access invite to browse open brand briefs. If you're open to exploring, simply reply to this email or drop a quick "interested" and I'll share your direct invite link!

Best regards,

Kevin Bhutwala
Founder, AbeyCollab
https://abeycollab.com
abeycollab@gmail.com
"""

    html_text = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; margin: 0; padding: 20px; background-color: #f7f9fc; }}
  .container {{ max-width: 580px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 12px; border: 1px solid #e5e9f2; }}
  .badge {{ display: inline-block; background: #ede9fe; color: #6d28d9; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }}
  h2 {{ color: #0f172a; margin-top: 0; font-size: 20px; }}
  p {{ margin: 0 0 16px; font-size: 15px; color: #334155; }}
  .quote-box {{ background: #f8fafc; border-left: 3px solid #6366f1; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 14px; color: #475569; }}
  .benefit-card {{ background: #fdfdfd; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; }}
  .benefit-title {{ font-weight: 600; color: #1e293b; font-size: 14px; margin-bottom: 4px; }}
  .benefit-desc {{ font-size: 13px; color: #64748b; margin: 0; }}
  .btn {{ display: inline-block; background: #4f46e5; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 16px 0; }}
  .footer {{ font-size: 12px; color: #94a3b8; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; }}
</style>
</head>
<body>
<div class="container">
  <div class="badge">Creator Invitation</div>
  <h2>Hey {first_name},</h2>
  
  <p>Hope you're having a great week!</p>
  
  <p>I came across your content over on <strong>{handle}</strong> — really love how you approach your craft. <br>
  <div class="quote-box">✨ <em>{reason}</em></div>
  </p>

  <p>I'm Kevin, founder of <a href="https://abeycollab.com" style="color:#4f46e5;text-decoration:none;font-weight:600;">AbeyCollab</a>. We're an India-first platform connecting genuine creators directly with fast-growing D2C and lifestyle startups.</p>

  <p>We built AbeyCollab because creator brand partnerships today are painful — endless unanswered Instagram DMs, payment delays, and middlemen taking huge cuts.</p>

  <p><strong>How AbeyCollab works for you:</strong></p>
  
  <div class="benefit-card">
    <div class="benefit-title">🎯 Relevant Brand Matches</div>
    <div class="benefit-desc">D2C brands post active campaigns directly in your niche ({category}). No random or misaligned pitches.</div>
  </div>

  <div class="benefit-card">
    <div class="benefit-title">🛡️ Escrow Milestone Protection</div>
    <div class="benefit-desc">The brand deposits funds into milestone escrow before you produce content. Once approved, payout is guaranteed immediately.</div>
  </div>

  <div class="benefit-card">
    <div class="benefit-title">💰 0% Agency Fee for Creators</div>
    <div class="benefit-desc">100% of your agreed commercial fee goes directly to your bank account. No commissions deducted.</div>
  </div>

  <p>We are currently onboarding a select cohort of 30 creators for our upcoming brand campaigns with emerging Indian D2C labels.</p>

  <p>Would love to welcome you onboard. Simply reply directly to this email or drop a quick <em>"interested"</em> and I'll send over your direct invite access!</p>

  <p style="margin-top:20px;">
    Best regards,<br>
    <strong>Kevin Bhutwala</strong><br>
    <span style="font-size:13px;color:#64748b;">Founder, AbeyCollab<br>
    <a href="https://abeycollab.com" style="color:#6366f1;">abeycollab.com</a> | abeycollab@gmail.com</span>
  </p>
  
  <div class="footer">
    You received this email because your contact was publicly listed for business/collaboration inquiries on your social profile. If you do not wish to hear from us, simply reply with "unsubscribe".
  </div>
</div>
</body>
</html>
"""
    return subject, plain_text, html_text


def log_send(creator_name: str, email_addr: str, subject: str, status: str):
    file_exists = os.path.exists(LOG_PATH)
    with open(LOG_PATH, mode="a", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(["Timestamp", "Creator Name", "Email", "Subject", "Status"])
        writer.writerow([datetime.now().strftime("%Y-%m-%d %H:%M:%S"), creator_name, email_addr, subject, status])


def update_lead_status(email_addr: str, new_status: str, rows: list, fieldnames: list):
    for r in rows:
        if r["Public Business Email"].strip().lower() == email_addr.strip().lower():
            r["Status"] = new_status
            break
    with open(CSV_PATH, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description="Send outreach emails to creators for AbeyCollab")
    parser.add_argument("--preview", action="store_true", help="Print preview of emails without sending")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of emails to send")
    parser.add_argument("--creator", type=str, default=None, help="Send only to a specific creator by name or handle")
    args = parser.parse_args()

    if not os.path.exists(CSV_PATH):
        print(f"[!] Error: CSV file not found at {CSV_PATH}")
        sys.exit(1)

    with open(CSV_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    print(f"[*] Loaded {len(rows)} creator leads from {CSV_PATH}")
    print(f"[*] Mode: {'PREVIEW / DRY RUN' if args.preview else 'LIVE DISPATCH'}")

    password = os.environ.get("GMAIL_APP_PASSWORD", DEFAULT_PASSWORD).replace(" ", "")

    server = None
    if not args.preview:
        print("[*] Connecting to Google SMTP (smtp.gmail.com:465)...")
        try:
            server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT)
            server.login(SENDER_EMAIL, password)
            print("[+] Logged into Gmail SMTP successfully!")
        except Exception as e:
            print(f"[!] SMTP connection failed: {e}")
            sys.exit(1)

    sent_count = 0
    skipped_count = 0

    for idx, row in enumerate(rows, 1):
        creator_name = row["Creator Name"].strip()
        handle = row["Instagram Handle"].strip()
        email_addr = row["Public Business Email"].strip()
        status = row.get("Status", "Ready").strip()

        if args.creator and (args.creator.lower() not in creator_name.lower() and args.creator.lower() not in handle.lower()):
            continue

        if status.startswith("Sent") or status.startswith("Replied") or status.lower() == "skip":
            print(f"[-] [{idx}/{len(rows)}] Skipping {creator_name} ({handle}) — Status: {status}")
            skipped_count += 1
            continue

        if not email_addr or "@" not in email_addr:
            print(f"[!] [{idx}/{len(rows)}] Skipping {creator_name} — Invalid email: '{email_addr}'")
            continue

        subject, plain_body, html_body = build_email_content(row)

        if args.preview:
            print(f"\n[{idx}/{len(rows)}] PREVIEW: To: {creator_name} <{email_addr}>")
            print(f"    Handle:   {handle} ({row['Approx Followers']})")
            print(f"    Subject:  {subject}")
            print(f"    Category: {row['Category']}")
            print(f"    Reason:   {row['Personalization Reason']}")
            sent_count += 1
        else:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
            msg["To"] = f"{creator_name} <{email_addr}>"
            msg["Reply-To"] = SENDER_EMAIL
            msg.attach(MIMEText(plain_body, "plain"))
            msg.attach(MIMEText(html_body, "html"))

            try:
                server.sendmail(SENDER_EMAIL, [email_addr], msg.as_string())
                now_str = datetime.now().strftime("%Y-%m-%d %H:%M")
                update_lead_status(email_addr, f"Sent ({now_str})", rows, fieldnames)
                log_send(creator_name, email_addr, subject, "Success")
                print(f"[+] [{idx}/{len(rows)}] Sent to {creator_name} <{email_addr}>")
                sent_count += 1
                time.sleep(2.5)  # Safe rate-limiting
            except Exception as e:
                err_str = str(e)
                print(f"[!] Failed to send to {creator_name} ({email_addr}): {err_str}")
                log_send(creator_name, email_addr, subject, f"Failed: {err_str}")
                if '550' in err_str and 'limit' in err_str.lower():
                    print("
[!] Gmail daily sending limit reached for today (550). Halting further dispatches to protect account reputation.")
                    break
                elif 'closed' in err_str.lower() or 'connect' in err_str.lower():
                    print("
[!] SMTP connection terminated by host. Halting dispatch.")
                    break

        if args.limit and sent_count >= args.limit:
            print(f"[*] Reached limit of {args.limit} sends.")
            break

    if server:
        try:
            server.quit()
        except:
            pass

    print("\n" + "=" * 65)
    print(f"[*] Finished! Processed {sent_count} emails ({skipped_count} skipped/replied).")


if __name__ == "__main__":
    main()
