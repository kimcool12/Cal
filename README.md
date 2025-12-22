# News Feed Application

A premium, responsive news feed application built with **React** and **Vite**, featuring a polished Vanilla CSS design system.

## Features
- **Top Headlines**: Fetches latest news from NewsAPI.
- **Mock Fallback**: Automatic fallback to premium mock data if no API key is present.
- **Search & Filter**: Real-time search and category filtering (Business, Tech, Sports, etc.).
- **Responsive Design**: Mobile-first grid layout that scales to desktop.
- **Premium UI**: Glassmorphism effects, rich gradients, and smooth interactions.

## Setup & Running

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd news-feed-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment** (Optional)
   Create a `.env` file in the root directory:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```
   *Note: Without a key, the app runs in Mock Mode.*

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist` folder.

## Technologies
- React 18
- Vite
- Vanilla CSS (Variables, Flexbox, Grid)
- date-fns
