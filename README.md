
````markdown
# 🚀 Proxy Server for GB Police Certificate Verification

This project is a **Node.js + Express proxy server** that automates the verification of **GB Police Clearance Certificates**.  
Normally, the official police website requires manual CNIC entry, but this proxy automatically sends the required form data and directly returns the verification page.  

---

## ✨ Features
- 🌐 Lightweight Express.js server
- 🔒 Secure `.env` configuration (no secrets in code)
- 📡 Proxy layer between frontend & official server
- ⚙️ Deployable on free hosting (Render, Vercel, Railway, etc.)
- 🛡️ Hides sensitive certificate code from users

---

## 📂 Project Setup

### 1. Clone Repo
Example:
```bash
git clone https://github.com/sarfarazullahkoyani/ProxyServerForGbPoliceDirectVerificationDataOfClaranceCertificate.git
cd ProxyServerForGbPoliceDirectVerificationDataOfClaranceCertificate
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
PORT=3000
POLICE_URL=https://pkm.gbp.gov.pk/qr/publish/certificate/...
POLICE_CODE=your_certificate_code_here
POLICE_TYPE=certificate
```

⚠️ Do **NOT** commit `.env` to GitHub. Instead, add it to `.gitignore`.

---

## ▶️ Run Locally

```bash
npm start
```

Visit:

```
http://localhost:3000/proxy?cnic=71504-0398416-3
```

---

## 🌍 Deploy on Render

1. Login to [Render](https://render.com)
2. Create new **Web Service** → Connect this GitHub repo
3. Set:

   * **Build Command** → `npm install`
   * **Start Command** → `node server.js` (or `node server.cjs` if using CommonJS)
4. Add environment variables from `.env` in Render dashboard
5. Deploy 🚀

Your app will be live at:

```
https://<your-app-name>.onrender.com/proxy?cnic=71504-0398416-3
```

---

## 🔎 How the Police Website Works (Technical Explanation)

When you scan a Police Clearance Certificate QR code, you are redirected to a URL like:

```
https://pkm.gbp.gov.pk/qr/publish/certificate/bzI5NXdZL2xteThlNkxYRWY3V3E3UT09
```

Now, let’s break down how the **backend expects data**:

### 1. Query String Parameter

When you use the proxy, you pass:
Example:
```
?cnic=71504-0398416-3
```

So the URL becomes:
Example:
```
http://localhost:3000/proxy?cnic=71504-0398416-3
```

---

### 2. Form Data Sent to Police Server

When the browser normally submits the form, it sends this payload:
Example:
```
type=certificate
code=bzI5NXdZL2xteThlNkxYRWY3V3E3UT09
cnic=71504-0398416-3
```

* **type** → Always `"certificate"` (tells backend what kind of data to verify)
* **code** → Extracted from the QR URL (last part after `/certificate/`)
* **cnic** → Provided by the user (National ID)

---

### 3. Why This Proxy is Needed

* The police site **forces manual CNIC entry** every time
* Our proxy automatically prepares the `type`, `code`, and `cnic` values and submits them directly
* Result: users get the verification info instantly without filling any form

---

## 📌 Example `.env.example`
Example:
```env
PORT=3000
POLICE_URL=https://pkm.gbp.gov.pk/qr/publish/certificate/...
POLICE_CODE=bzI5NXdZL2xteThlNkxYRWY3V3E3UT09
POLICE_TYPE=certificate
```

Commit this file so others know what variables to set.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 📜 License

MIT License – free to use and modify.


