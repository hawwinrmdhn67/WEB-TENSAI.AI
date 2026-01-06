# 🤖 Tensai AI Web Chatbot AI

**Tensai AI** adalah aplikasi **web chatbot AI modern** yang dibangun menggunakan **React + Vite** di sisi frontend dan **Serverless API (Vercel)** di sisi backend.  
Aplikasi ini terintegrasi dengan **OpenRouter (Free AI Models)** untuk menghadirkan pengalaman chat AI yang cepat, aman, dan mirip ChatGPT.

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


## ✨ Fitur Utama

- Realtime AI Chat
- Streaming response (efek mengetik seperti GPT)
- Multiple AI Models (via OpenRouter)
- Markdown rendering lengkap (code block, syntax highlight, table, inline code)
- Responsive (Desktop & Mobile)
- Dark & Light Mode
- Typing Indicator (icon-based)
- Copy, Share & Retry AI Response
- Auto-scroll & smooth scrolling
- API key aman (tidak expose ke frontend)
- Siap deploy ke Vercel

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide Icons
- React Markdown

### Backend
- Vercel Serverless Functions
- Node.js
- OpenRouter API (Free Models)

---

## 🔑 Environment Variables

Buat file `.env.local`:

```env
OPENROUTER_API_KEY=sk-xxxxxxxxxxxxxxxx
```

---

## ⚙️ Development Mode

Project ini menggunakan **Vercel Serverless Functions** (`/api/chat`),  
oleh karena itu **disarankan menggunakan `vercel dev` saat development**.

### 🔹 Development (Recommended)

Menjalankan frontend + backend serverless sekaligus:

```bash
npm install
vercel dev
```
Akses: http://localhost:3000

Vercel dev akan:
- Menjalankan Vite frontend
- Menjalankan API di folder /api
- Membaca .env.local

---

## Frontend Only (UI Development)

Jika hanya ingin mengerjakan UI (tanpa API):

```bash
npm run dev
```
Akses: http://localhost:5173

Mode ini tidak akan menjalankan /api/chat.

## ☁️ Deploy ke Vercel

1. Push ke GitHub
2. Import ke Vercel
3. Set `OPENROUTER_API_KEY`
4. Deploy

---

## 🧠 Best Practice

```md
> Catatan!!!
> Project ini tidak disarankan menggunakan `npm run dev` untuk full feature,  
> karena API serverless hanya berjalan melalui `vercel dev` atau production environment Vercel.
```

---

## 🔌 API Endpoint

Saat development dengan vercel dev:

```bash
POST /api/chat
```

Saat production (Vercel):
```bash
https://your-domain.vercel.app/api/chat
```

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Tensai AI Created By hawwinrmdhn67
