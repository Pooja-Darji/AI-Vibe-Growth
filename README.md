# AI Vibe Growth - Marketing Intelligence Dashboard

A modern, accessible marketing intelligence dashboard built with Next.js, React, and TypeScript. This application demonstrates data-driven UI development, state management, and natural language prompt processing for campaign analytics.

## 🚀 Features

### Marketing Dashboard
- **Campaign Data Display**: View ad campaigns in table or card format
- **Performance Metrics**: Track impressions, clicks, CTR, and conversions
- **Interactive Charts**: Visualize performance trends using Recharts
- **Advanced Filtering**: Filter campaigns by status, date range, and search query
- **Responsive Design**: Fully responsive layout for desktop and mobile devices

### Prompt Playground
- **Natural Language Processing**: Type prompts like "Show top campaigns by CTR" or "List paused campaigns"
- **Intent Parser**: Lightweight keyword-based intent detection
- **Dynamic Filtering**: Automatically filter, sort, and highlight campaigns based on prompts
- **Example Prompts**: Quick access to common queries

### Quality Features
- ✅ **Accessibility**: WCAG AA compliant with keyboard navigation, skip links, and ARIA labels
- ✅ **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- ✅ **Performance**: Optimized for Core Web Vitals (LCP, CLS, INP)
- ✅ **Error Handling**: Graceful error states and loading indicators
- ✅ **Dark Mode**: Full dark mode support
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` preference

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page with tab navigation
│   ├── globals.css         # Global styles with accessibility
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   └── Skeleton.tsx
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── MarketingDashboard.tsx
│   │   ├── CampaignTable.tsx
│   │   ├── CampaignCard.tsx
│   │   ├── PerformanceChart.tsx
│   │   └── CampaignFilters.tsx
│   ├── playground/         # Prompt playground components
│   │   └── PromptPlayground.tsx
│   └── layout/             # Layout components
│       ├── TabNavigation.tsx
│       └── SkipLink.tsx
├── stores/
│   └── campaignStore.ts    # Zustand state management
├── types/
│   └── index.ts            # TypeScript type definitions
├── data/
│   └── mockCampaigns.ts    # Mock campaign data
├── lib/
│   └── promptParser.ts     # Natural language prompt parser
└── public/
    └── robots.txt          # SEO robots file
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Charts**: Recharts
- **Utilities**: clsx

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Vibe-Growth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### State Management
The application uses Zustand for state management. The `campaignStore` manages:
- Campaign data
- Filter state
- Sorting and highlighting
- Loading and error states

### Component Architecture
- **UI Components**: Reusable, accessible components in `components/ui/`
- **Feature Components**: Domain-specific components in `components/dashboard/` and `components/playground/`
- **Layout Components**: Navigation and layout components in `components/layout/`

### Prompt Parsing
The prompt parser (`lib/promptParser.ts`) uses keyword matching to detect user intent:
- Status filters: "paused", "active"
- Sorting: "top", "best", "highest", "lowest"
- Metrics: "CTR", "conversions", "clicks", "impressions"
- Actions: "show", "list", "highlight", "filter"

### Code Splitting
- Components are split by feature domain
- Lazy loading for chart components
- Dynamic imports for better performance

## 🎨 Design Principles

1. **Accessibility First**: All components follow WCAG AA guidelines
2. **Mobile Responsive**: Mobile-first design approach
3. **Performance**: Optimized bundle size and lazy loading
4. **Type Safety**: Full TypeScript coverage
5. **Reusability**: Modular, composable components

## 🧪 Testing & Quality

### Lighthouse Scores (Target)
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 95

### Core Web Vitals (Target)
- LCP: ≤ 2.5s
- CLS: ≤ 0.05
- INP: ≤ 200ms

## 📝 Usage Examples

### Prompt Playground Examples
- "Show top campaigns by CTR"
- "List paused campaigns"
- "Highlight best performing campaign"
- "Show campaigns with highest conversions"
- "Filter active campaigns"

### Filtering
- Use the search box to find campaigns by name
- Select status filter to show Active or Paused campaigns
- Click "Reset" to clear all filters

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically on push

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 📄 License

This project is created for the AI Vibe Growth assignment.

## 👤 Author

Built for AI Vibe Growth Front-End Developer Assignment

---

**Note**: This is a demonstration project showcasing modern React development practices, accessibility, and SEO optimization.
