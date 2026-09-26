#!/usr/bin/env python3
"""
Reply directly to hello@plumgoodness.com (Ananya / Plum Support).
"""

import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SENDER_EMAIL = "abeycollab@gmail.com"
SENDER_NAME = "Kevin Bhutwala | AbeyCollab"
RECIPIENT_EMAIL = "hello@plumgoodness.com"
SUBJECT = "Re: Quick idea for Plum Goodness × creator collaborations"

text_body = """Hi Ananya,

Thank you so much for the warm response and encouraging words on AbeyCollab!

I’ve filled out the marketing team's collaboration form with our creator roster details and pilot campaign specs.

In the meantime, your marketing leads can directly explore our vetted creator directory here: https://abeycollab.com/creators

Or if your team has an active brief ready to test with our founding cohort, you can onboard it directly in 2 minutes: https://abeycollab.com/brand/register .

Looking forward to collaborating with the Plum team!

Warm regards,
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
    h2 { color: #0f172a; margin-top: 0; font-size: 19px; }
    p { margin: 14px 0; font-size: 15px; color: #334155; }
    .btn { display: inline-block; background: #ffd21f; color: #0a0a0e; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin-right: 12px; margin-top: 10px; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Re: Plum Goodness &times; AbeyCollab Collaborations</h2>
    <p>Hi Ananya,</p>
    <p>Thank you so much for the warm response and encouraging words on AbeyCollab!</p>
    <p>I’ve filled out the marketing team's collaboration form with our creator roster details and pilot campaign specs.</p>
    <p>In the meantime, your marketing leads can directly explore our vetted creator directory here:</p>
    <p><a href="https://abeycollab.com/creators" class="btn">Explore Creator Directory &rarr;</a></p>
    <p>Or if your team has an active brief ready to test with our founding cohort, you can post it directly: <a href="https://abeycollab.com/brand/register" style="color: #0f172a; font-weight: 600;">Post a Brief (2 mins)</a>.</p>
    <div class="footer">
      <strong>Kevin Bhutwala</strong><br>
      Founder, <a href="https://abeycollab.com" style="color: #0f172a;">AbeyCollab</a><br>
      <a href="mailto:abeycollab@gmail.com" style="color: #64748b;">abeycollab@gmail.com</a> | Mumbai &bull; Global
    </div>
  </div>
</body>
</html>"""

def main():
    app_password = os.environ.get("GMAIL_APP_PASSWORD", "").replace(" ", "").strip()
    if not app_password:
        print("[!] ERROR: GMAIL_APP_PASSWORD not set")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = SUBJECT
    msg["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
    msg["To"] = RECIPIENT_EMAIL
    msg["Reply-To"] = SENDER_EMAIL

    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    print(f"[*] Connecting to Gmail SMTP to reply to {RECIPIENT_EMAIL}...")
    server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    server.login(SENDER_EMAIL, app_password)
    server.sendmail(SENDER_EMAIL, [RECIPIENT_EMAIL], msg.as_string())
    server.quit()
    print(f"[+] Reply sent successfully to {RECIPIENT_EMAIL}!")

if __name__ == "__main__":
    main()
