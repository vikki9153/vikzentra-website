# 🚀 Vikzentra - Web Development Studio

A modern, high-converting agency landing website and lead-generation platform built for your web development startup.

---

## 🌟 Features Included in this Website (वेबसाइट की विशेषताएं)

1. **Modern Hero Section**:
   - Compelling value proposition headline & dynamic stats.
   - Interactive live performance mockup card (99 PageSpeed, 99.8% Uptime).
   - Instant action buttons: *"Calculate Website Cost"* & *"Chat on WhatsApp"*.

2. **Interactive 30-Second Cost Calculator (कैलकुलेटर)**:
   - Select Website Type (Landing Page, Corporate Business, E-Commerce, Custom SaaS).
   - Real-time page slider (1 to 20 pages).
   - Add-on checkboxes (Payment Gateway, CMS Admin Panel, SEO, WhatsApp Bot, Multi-language, Speed Booster).
   - Live price calculation in both **₹ INR** and **$ USD** with currency switcher.
   - **"Claim This Quote"** button that automatically scrolls to the contact form and fills in the selected estimate details.

3. **Filterable Portfolio Showcase (प्रोजेक्ट शोकेस)**:
   - Categories: All, E-Commerce, SaaS & Web Apps, Corporate & Business, Hospitality.
   - Click any project to open an **Interactive Case Study Modal** with live screenshots, client details, impact metrics, tech stack tags, and a *"Build a Site Like This"* CTA.

4. **Transparent Pricing Packages (प्राइसिंग प्लान्स)**:
   - Starter Launch (`₹7,999` / `$119`)
   - Business Pro (`₹17,999` / `$249`) - *Most Popular*
   - E-Commerce & SaaS (`₹39,999` / `$520`)
   - 1-click package selection that pre-populates the inquiry form.

5. **Agency vs Freelancer Comparison Table**:
   - Highlights why clients should choose your agency over slow traditional agencies or unreliable freelancers.

6. **Interactive FAQ Accordion**:
   - Clear answers in Hinglish & English addressing delivery timeline, 100% source code ownership, milestone payments, free SSL, and post-launch support.

7. **Lead Capture & WhatsApp Integration**:
   - Validated contact form with project type and budget selector.
   - Instant WhatsApp launcher that pre-formats client details into a ready-to-send WhatsApp message.
   - Floating WhatsApp button with animated chat notification badge at the bottom-right corner.

8. **Responsive Navigation**:
   - Sticky desktop header with a keyboard-accessible mobile menu and direct quote links.

---

## 💻 How to Run & Preview Locally (लोकल कंप्यूटर पर कैसे चलाएं)

### Method 1: Using Node.js Local Server (Recommended)
Open your terminal in this project folder and run:
```bash
node server.js
```
Then open your browser at:
👉 **`http://localhost:3000`**

### Method 2: Direct Browser Open (Zero Install)
You can directly double-click the **`index.html`** file in your file explorer to open it in Chrome, Edge, Brave, or Firefox.

## 📁 Project Structure

```text
.
├── index.html
├── server.js
├── package.json
├── README.md
└── assets/
    ├── css/
    ├── icons/
    ├── images/
    └── js/
```

---

## 🛠️ How to Customize for Your Business (अपनी जानकारी कैसे बदलें)

### 1. Update Your Phone Number & WhatsApp Number:
Open [`assets/js/contact.js`](./assets/js/contact.js) to update the contact configuration:
```javascript
const AGENCY_CONFIG = {
  agencyName: 'Vikzentra',
  whatsappNumber: '918409539175', // 91 country code + 10-digit phone number
  contactEmail: 'vk9993537@gmail.com',
  supportHours: 'Mon - Sat: 9:00 AM - 9:00 PM IST'
};
```
The visible contact links and pre-filled WhatsApp links are in [`index.html`](./index.html).

### 2. Update Pricing & Base Costs:
Open [`assets/js/calculator.js`](./assets/js/calculator.js) and customize the `CONFIG.types` object to adjust your base pricing for landing pages, business websites, or e-commerce stores.

### 3. Add or Edit Portfolio Projects:
Open [`assets/js/portfolio.js`](./assets/js/portfolio.js) to add your own client work or edit existing projects inside the `PROJECTS` array.

---

## 🌐 How to Host & Publish Your Website for FREE (लाइव इंटरनेट पर कैसे डालें)

### Option A: Vercel (Fastest & Free)
1. Create a free account at [vercel.com](https://vercel.com).
2. Install Vercel CLI or connect your GitHub repository.
3. Simply run `npx vercel` in this folder, and your website will be live in 60 seconds with a free `.vercel.app` domain and free SSL!

### Option B: Netlify (Drag and Drop)
1. Go to [netlify.com](https://netlify.com) and log in.
2. Go to **"Sites"** and drag this whole `builde our startup` folder into the Netlify dropzone.
3. Your website is immediately published online for free.

### Option C: GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to repository **Settings** -> **Pages** -> Select `main` branch -> Click Save.
3. Your site will be live at `https://your-username.github.io/repo-name/`.

---

## 🎯 Pro Tips to Get Your First 5 Web Development Clients (ग्राहक कैसे लाएं)

1. **Google My Business Outreach**: Search for local gyms, clinics, salons, cafes, and architects in your city that do not have a modern website or have slow websites. Message them on WhatsApp showing this live demo!
2. **Cold WhatsApp / Instagram Outreach**: Send a friendly 30-second screen recording showing how their website could look with your modern design.
3. **Offer a Risk-Free Guarantee**: Tell them: *"Hum aapko pehle 2 dino me homepage design bana kar dikhayenge. Agar aapko pasand aaye tabhi aap aage continue karein!"* (Zero risk for the client).
4. **Referral Incentive**: Offer existing clients a 10% referral commission for every business owner they introduce to you.

