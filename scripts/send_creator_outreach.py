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
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "abeycollabisha@gmail.com")
REPLY_TO_EMAIL = "abeycollab@gmail.com"
SENDER_NAME = "Isha | AbeyCollab"
DEFAULT_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "syrm cpid dwrj uqcw")


def get_first_name(full_name: str) -> str:
    name = full_name.split("(")[0].strip()
    return name.split()[0].capitalize()


def build_email_content(row: dict) -> tuple[str, str, str]:
    creator_name = row["Creator Name"].strip()
    first_name = get_first_name(creator_name)
    category = row["Category"].strip()
    handle = row["Instagram Handle"].strip()
    reason = row["Personalization Reason"].strip()

    subject = f"collab question for {handle}"

    plain_text = f"""Hey {first_name},

Hope you're having a good week.

Came across your profile on {handle} — really love how you approach your content. {reason}

I'm Isha, reaching out from the partnerships team at AbeyCollab (https://abeycollab.com). We're an Indian platform connecting digital creators directly with emerging D2C and lifestyle brands for paid collaborations and product campaigns.

We built AbeyCollab to make brand collabs simple and transparent:
- Direct campaign briefs tailored to your specific niche ({category})
- Milestone escrow protection so your payment is locked in advance and released on time
- 0% platform fee for creators (you keep 100% of your commercial rate)

We are currently onboarding a curated group of creators for upcoming campaigns across fashion, lifestyle, and tech.

Are you currently taking on brand collaborations? If you're open to exploring, simply reply to this email and I'd be happy to share some of the active brand briefs with you.

Best,
Isha
AbeyCollab Partnerships
https://abeycollab.com
abeycollab@gmail.com
"""

    return subject, plain_text, None


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
            msg = MIMEText(plain_body, "plain", "utf-8")
            msg["Subject"] = subject
            msg["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
            msg["To"] = f"{creator_name} <{email_addr}>"

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
                    print("\n[!] Gmail daily sending limit reached for today (550). Halting further dispatches to protect account reputation.")
                    break
                elif 'closed' in err_str.lower() or 'connect' in err_str.lower():
                    print("\n[!] SMTP connection terminated by host. Halting dispatch.")
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
