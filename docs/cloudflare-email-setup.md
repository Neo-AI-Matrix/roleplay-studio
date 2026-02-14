# Cloudflare Email Routing Setup
## Route roleplaystudio.ai emails to Gmail (Free)

Cloudflare Email Routing lets you create email addresses like `contact@roleplaystudio.ai` that forward to your personal Gmail — completely free.

---

## Your Setup

- **Domain registrar:** GoDaddy (keep it here)
- **Website hosting:** Vercel (keep it here)
- **Email routing:** Cloudflare (free)

You do NOT need to move DNS to Cloudflare. Just add the MX and TXT records in GoDaddy.

---

## Step 1: Create Cloudflare Account & Add Domain

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and create a free account (if you don't have one)
2. Click **Add a Site**
3. Enter `roleplaystudio.ai`
4. Select the **Free** plan
5. When Cloudflare asks you to change nameservers, **SKIP THIS** — click through or ignore it
6. Your domain will show as "Pending" in Cloudflare — that's fine for email routing

---

## Step 2: Enable Email Routing in Cloudflare

1. In Cloudflare dashboard, select your domain (`roleplaystudio.ai`)
2. In the left sidebar, click **Email** → **Email Routing**
3. Click **Get Started** or **Enable Email Routing**
4. Cloudflare will show you the DNS records you need — **copy these** but don't expect Cloudflare to add them (your DNS is at GoDaddy)

The records you need are:

**MX Records:**
| Type | Name | Mail Server | Priority |
|------|------|-------------|----------|
| MX | @ | `route1.mx.cloudflare.net` | 69 |
| MX | @ | `route2.mx.cloudflare.net` | 4 |
| MX | @ | `route3.mx.cloudflare.net` | 42 |

**TXT Record (SPF):**
| Type | Name | Value |
|------|------|-------|
| TXT | @ | `v=spf1 include:_spf.mx.cloudflare.net ~all` |

---

## Step 3: Add DNS Records in GoDaddy

1. Log into [GoDaddy](https://godaddy.com) → **My Products** → **DNS** for roleplaystudio.ai
2. Scroll to **MX Records** section

### Delete existing MX records (if any)
If there are existing MX records (like GoDaddy's default email), delete them first.

### Add Cloudflare MX Records

Click **Add** for each:

**Record 1:**
- Type: MX
- Host: @
- Points to: `route1.mx.cloudflare.net`
- Priority: 69
- TTL: 1 Hour

**Record 2:**
- Type: MX
- Host: @
- Points to: `route2.mx.cloudflare.net`
- Priority: 4
- TTL: 1 Hour

**Record 3:**
- Type: MX
- Host: @
- Points to: `route3.mx.cloudflare.net`
- Priority: 42
- TTL: 1 Hour

### Add SPF TXT Record

1. Scroll to **TXT Records** section
2. Look for existing SPF record (starts with `v=spf1`)
3. If exists, **edit it** to include Cloudflare. If not, **add new**:

- Type: TXT
- Host: @
- TXT Value: `v=spf1 include:_spf.mx.cloudflare.net ~all`
- TTL: 1 Hour

4. Click **Save**

---

## Step 4: Verify in Cloudflare

1. Go back to Cloudflare → Email → Email Routing
2. Cloudflare should detect the MX records within a few minutes
3. Status should change to **Active**

If it still shows pending, wait 15-30 minutes for DNS propagation.

---

## Step 5: Verify Your Destination Email

1. In Cloudflare Email Routing, go to **Destination addresses**
2. Click **Add destination address**
3. Enter your Gmail address
4. Click **Save**
5. Check your Gmail for a verification email from Cloudflare
6. Click the verification link

---

## Step 6: Create Email Addresses (Routing Rules)

Now create the addresses you want to use:

### Create `contact@roleplaystudio.ai`

1. In Email Routing, go to **Routing rules**
2. Click **Create address**
3. **Custom address:** `contact`
4. **Action:** Send to an email
5. **Destination:** Select your verified Gmail
6. Click **Save**

### Create `support@roleplaystudio.ai`

1. Click **Create address**
2. **Custom address:** `support`
3. **Action:** Send to an email
4. **Destination:** Your Gmail
5. Click **Save**

### Create `hello@roleplaystudio.ai`

1. Click **Create address**
2. **Custom address:** `hello`
3. **Action:** Send to an email
4. **Destination:** Your Gmail
5. Click **Save**

### (Optional) Catch-All Rule

To receive ALL emails sent to your domain (any address):

1. Scroll down to **Catch-all address**
2. Enable it
3. Set action to **Send to an email**
4. Select your Gmail
5. Click **Save**

**⚠️ Warning:** Catch-all can attract spam. Consider leaving it disabled and only creating specific addresses you need.

---

## Step 7: Send FROM Your Custom Address (Optional but Recommended)

By default, you can receive email at `contact@roleplaystudio.ai`, but replies will come from your Gmail address. To send AS your custom address:

### In Gmail:

1. Open Gmail → **Settings** (gear icon) → **See all settings**
2. Go to **Accounts and Import** tab
3. In "Send mail as" section, click **Add another email address**
4. Enter:
   - **Name:** Roleplay Studio (or your name)
   - **Email:** contact@roleplaystudio.ai
   - Uncheck "Treat as an alias"
5. Click **Next Step**
6. For SMTP server, you have two options:

#### Option A: Use Gmail's SMTP (Easiest)
- **SMTP Server:** smtp.gmail.com
- **Port:** 587
- **Username:** Your full Gmail address
- **Password:** Your Gmail App Password (not regular password)
  - Generate at: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
  - Requires 2FA enabled on your Google account
- Check **TLS**

#### Option B: Use a Transactional Email Service
For better deliverability, use a service like:
- **Resend** (free tier: 3,000 emails/month)
- **Mailgun** (free tier: 5,000 emails/month)
- **SendGrid** (free tier: 100 emails/day)

These provide SMTP credentials that often have better deliverability than Gmail.

7. Click **Add Account**
8. Gmail will send a verification email to your custom address
9. Since it forwards to your Gmail, you'll receive it
10. Click the confirmation link or enter the code
11. Done! When composing emails, you can now select `contact@roleplaystudio.ai` as the "From" address

---

## Recommended Email Addresses for Roleplay Studio

| Address | Purpose |
|---------|---------|
| `contact@roleplaystudio.ai` | General inquiries, contact form |
| `support@roleplaystudio.ai` | Customer support |
| `hello@roleplaystudio.ai` | Friendly alternative to contact |
| `sales@roleplaystudio.ai` | Enterprise inquiries |
| `privacy@roleplaystudio.ai` | Privacy/GDPR requests (required by privacy policy) |

---

## Updating the Website

After setting up email, update these files:

### 1. Contact Page (`src/app/contact/page.tsx`)
Update the displayed email address to `contact@roleplaystudio.ai`

### 2. Footer (`src/components/Footer.tsx`)
Add email link if not present

### 3. Privacy Policy (`src/app/privacy/page.tsx`)
Update contact email for privacy inquiries to `privacy@roleplaystudio.ai`

### 4. Terms of Service (`src/app/terms/page.tsx`)
Update contact information

---

## Testing

1. Send a test email to `contact@roleplaystudio.ai` from a different email account
2. Verify it arrives in your Gmail
3. Reply to test that sending from the custom address works
4. Check that the reply shows `contact@roleplaystudio.ai` as the sender

---

## Troubleshooting

### Emails not arriving?
- Check Cloudflare Email Routing is enabled (green status)
- Verify MX records are set correctly (Cloudflare does this automatically)
- Check your Gmail spam folder
- Ensure destination address is verified

### Can't send from custom address?
- Verify you completed all steps in Gmail's "Send mail as" setup
- Make sure you're using an App Password, not your regular Gmail password
- Check that 2FA is enabled on your Google account

### DNS propagation
- After changing nameservers, wait up to 24 hours
- Use [dnschecker.org](https://dnschecker.org) to verify MX records

---

## Cost

**$0** — Cloudflare Email Routing is completely free, with no limits on:
- Number of custom addresses
- Number of emails received
- Number of forwarding destinations

---

*Setup time: ~15 minutes (plus DNS propagation if changing nameservers)*
