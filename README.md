[README.md](https://github.com/user-attachments/files/25744250/README.md)
# 🎓 Scholara — AI Study Platform

An AI-powered study platform for college students built with React. Khan Academy-inspired design with blue/white editorial aesthetic.

## Features
- **AI Tutor** — Confusion-adaptive chat that adjusts explanation depth in real time
- **Worksheet Generator** — Generate practice worksheets from a topic or your own notes, tagged by Bloom's taxonomy
- **Quiz Engine** — AI-generated MCQs with instant feedback per answer
- **Exam Calendar** — Add exam dates, auto-generates a 7-day smart prep plan
- **Mastery Tracking** — Subject-level mastery bars that update as you study

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/geraldnibomb25/Ktutor.com.git
cd Ktutor.com
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure
```
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx       # React entry point
    └── App.jsx        # Main app (rename studyapp.jsx → App.jsx)
```

> **Note:** Rename `studyapp.jsx` to `src/App.jsx` after cloning.

## Tech Stack
- React 18
- Vite
- Anthropic Claude API (claude-sonnet-4-20250514)
- Google Fonts — Literata + DM Sans

## Design
Khan Academy DNA × editorial studio refinement. Blue `#1865F2`, white canvas, mastery green `#1b8a4c`, Literata serif display font.
