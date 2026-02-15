# 🤖 Tensai AI

> Modern Fullstack Web Chatbot powered by Gemini & Groq

**Tensai AI** adalah aplikasi web chatbot AI modern yang dibangun menggunakan **React + Vite (Frontend)** dan **Node.js + Express (Backend)**.
Aplikasi ini terintegrasi dengan **Groq API (LLaMA, Qwen dan lain lain)** untuk menghadirkan pengalaman AI yang cepat, responsif, dan aman seperti ChatGPT.

---

## ✨ Features

* 🚀 Realtime AI Chat
* ⚡ Streaming Response (Typing Effect like GPT)
* 🧠 Multi AI Provider Support:

  * Google Gemini
  * Groq (LLaMA 3, Qwen, dll)
* 🔄 Dynamic Model Selection
* 📝 Full Markdown Rendering:

  * Code blocks + Syntax Highlight
  * Tables
  * Inline code
* 🌙 Dark & Light Mode
* 📱 Fully Responsive (Desktop & Mobile)
* ⌨️ Typing Indicator
* 📋 Copy / Retry AI Response
* 🔐 Secure API (API keys stored in backend)
* 🖥️ VPS Ready Deployment

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* TypeScript
* Tailwind CSS v4
* React Markdown
* Lucide Icons

### Backend

* Node.js (ES Module)
* Express 5
* Gemini API
* Groq API
* dotenv

---

## 🏗️ Architecture

```
Frontend (React + Vite)
        ↓
Express Backend (API Layer)
        ↓
Groq API
```

Semua request AI diproses melalui backend untuk menjaga keamanan API key dan fleksibilitas multi-provider.

---

## 📂 Project Structure

```
tensai-ai/
│
├── server/
│   ├── index.ts
│   └── lib/tensai.ts
│
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── vite.config.ts
└── package.json
```

---

## 🔑 Environment Variables

Buat file `.env` di root atau folder server:

```env
GROQ_API_KEY=your_groq_api_key
PORT=3000
```

> ⚠️ Jangan commit file `.env` ke repository.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Development Mode (Frontend + Backend)

```bash
npm run start
```

Frontend:

```
http://localhost:5173
```

Backend API:

```
http://localhost:3000
```

---

## 🏭 Build for Production

```bash
npm run build
```

Lalu jalankan backend production:

```bash
node dist/server/index.js
```

---

## 🌐 Deployment

Tensai AI siap untuk:

* VPS Deployment (PM2 + Nginx)
* Docker Container
* Reverse Proxy Setup
* Cloud Deployment

---

## 📸 Screenshoot 

### Tampilan dark mode
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/5dcc6d1d-cb30-481b-9ce6-e898166b4925" />

### Tampilan light mode
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/63317ccc-9498-4cb0-b0c4-6bc815763e0b" />

### Tampilan Text chat dark mode
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/17534cf0-9418-4b5b-8f3f-234e3770902e" />
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/39ef7fda-a5e4-4beb-8e97-90a0e6b7cee8" />
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/86f9ad96-36d8-4c5f-8578-54bc2eae79b5" />

### Tampilan text chat light mode
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/d9065952-53a0-45c7-af80-e0cd4e57c33e" />
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/44f1b4a9-1195-4979-8f45-660c5fdaf059" />
<img width="1440" height="814" alt="image" src="https://github.com/user-attachments/assets/0d5821f0-dc4a-4744-bc81-cb435b3d2eb2" />

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Created by hawwinrmdhn67
