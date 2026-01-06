# 🤖 Tensai AI — Web Chatbot AI

**Tensai AI** adalah aplikasi **web chatbot AI modern** yang dibangun menggunakan **React + Vite** di sisi frontend dan **Serverless API (Vercel)** di sisi backend.  
Aplikasi ini terintegrasi dengan **OpenRouter (Free AI Models)** untuk menghadirkan pengalaman chat AI yang cepat, aman, dan mirip ChatGPT.

---

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

## 🚀 Menjalankan Project

```bash
npm install
npm run dev
```

Akses: http://localhost:5173

---

## ☁️ Deploy ke Vercel

1. Push ke GitHub
2. Import ke Vercel
3. Set `OPENROUTER_API_KEY`
4. Deploy

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Tensai AI
