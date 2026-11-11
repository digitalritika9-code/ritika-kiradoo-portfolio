# Ritika Kiradoo — Strategic Editorial Career Portfolio

A modern, editorial-style personal career portfolio built for Ritika Kiradoo (MBA Candidate at IILM University, Greater Noida) using HTML5, CSS3, and modern Vanilla JavaScript.

---

## 🎨 Visual Identity & Brand System
- **Charcoal Black** (`#121316`): Premium editorial dark foundation
- **Warm Cream** (`#F8F6F0`): Clean magazine-style surface
- **Electric Lime** (`#D4FF32`): High-energy kinetic accent & status indicators
- **Sunset Coral** (`#FF5C47`): Primary conversion CTAs & action buttons
- **Typography**: *Syne* (Bold modern display headings), *Instrument Serif* (Italic editorial accents), and *Plus Jakarta Sans* (Legible body copy)

---

## 📂 Project Architecture

```
ritika-portfolio/
│
├── index.html                 # Master single-page portfolio with all 9 sections
├── README.md                  # Quick start & customization guide
│
├── css/
│   └── style.css              # Custom editorial stylesheet, animations & print media query
│
├── js/
│   └── main.js                # Dynamic filtering, interactive modals, scrollspy, and form handler
│
└── assets/
    ├── images/
    │   ├── portrait-placeholder.svg # Profile portrait placeholder
    │   ├── lalit-sip.svg            # The LaLiT New Delhi SIP illustration
    │   ├── project-1.svg            # Digital strategy vector graphic
    │   ├── project-2.svg            # Social media architecture graphic
    │   ├── project-3.svg            # Client relationship playbook graphic
    │   └── cert-placeholder.svg     # Certificate verification badge
    └── documents/
        └── (Place Ritika_Kiradoo_Resume.pdf here)
```

---

## 🚀 How to Run and Preview the Website Locally

You have multiple easy options to preview this website on your Windows machine:

### Option 1: Direct File Preview (Instant & No Installation)
1. Navigate to the folder:
   ```
   C:\Users\Ritik\.gemini\antigravity\scratch\ritika-portfolio
   ```
2. Double-click on `index.html`. It will instantly open in your default browser (Google Chrome, Microsoft Edge, etc.).

### Option 2: Using Python's Built-in Local Web Server (Recommended)
If you have Python installed, open PowerShell or Command Prompt, and run:
```powershell
cd C:\Users\Ritik\.gemini\antigravity\scratch\ritika-portfolio
python -m http.server 3000
```
Then open your browser and navigate to:
```
http://localhost:3000
```

### Option 3: Using VS Code Live Server or Node `npx serve`
If you use Visual Studio Code, right-click `index.html` and click **"Open with Live Server"**, or in terminal:
```powershell
npx serve C:\Users\Ritik\.gemini\antigravity\scratch\ritika-portfolio
```

---

## 📸 Personalizing Your Assets

1. **Your Profile Photo**:
   - Place your professional headshot into `assets/images/` (e.g. `assets/images/ritika.jpg`).
   - In `index.html`, replace `src="assets/images/portrait-placeholder.svg"` with `src="assets/images/ritika.jpg"`.

2. **Your PDF Resume**:
   - Place your resume PDF at `assets/documents/Ritika_Kiradoo_Resume.pdf`.
   - In `index.html`, update the Download button in the Resume section with `href="assets/documents/Ritika_Kiradoo_Resume.pdf"` and `download`.

3. **Printing / Saving to PDF**:
   - The portfolio includes an `@media print` stylesheet! Click **"Print Resume"** on the website or press `Ctrl + P` to instantly generate an ATS-ready 2-page executive resume.

4. **Certificates & Contact Email**:
   - Update `ritika.kiradoo@email.com` and LinkedIn URLs in Section 9 with your active contact links.

---

## 💼 Included Sections (100% Authentic to Your MBA Journey)
1. **Home**: Editorial hero masthead, value proposition, and kinetic marquee.
2. **About Me**: Narrative bio, 4 strategic pillars, and IILM University Greater Noida foundation.
3. **Professional Experience & SIP**: Deep dive into **The LaLiT New Delhi** Banquet Sales & Client Handling Operations, plus digital marketing project leadership.
4. **Projects**: Interactive filterable project cards (Digital, Social Media, CRM, Market Research).
5. **Case Studies**: 4-phase structured consulting frameworks.
6. **Beyond the Classroom**: Campus leadership, marketing conclaves, and cohort management at IILM University.
7. **Certifications**: Verified digital marketing, social media, and client relationship credentials.
8. **Resume**: Executive, printable, and downloadable curriculum vitae.
9. **Career & Contact**: Direct messaging form and verified contact channels.
