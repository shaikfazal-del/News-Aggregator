# News Aggregator Web Application

A modern, responsive news aggregator built with React, TypeScript, and Redux Toolkit. Features real-time news from multiple categories, search functionality, favorites management, and dark mode support.

## 🌟 Features

### Core Functionality
- **Real-time News Dashboard**: Browse top headlines from Technology, Business, Sports, and General categories
- **Advanced Search**: Search articles by keywords with real-time results
- **Article Details**: View full article details in an elegant modal interface
- **Favorites System**: Save articles to favorites with localStorage persistence
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Efficient state management with modern Redux patterns
- **Custom Hooks**: Reusable logic for API calls and favorites management
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Skeleton loaders and smooth transitions
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- NewsAPI.org API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-aggregator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **API Configuration (Optional)**
   - **REQUIRED**: You MUST configure a NewsAPI key to use the application
   - The app now uses the official NewsAPI npm package for better reliability
   - To configure the API:
     - Visit [NewsAPI.org](https://newsapi.org) and create a free account
     - Get your API key from the dashboard
     - Open `src/services/newsService.ts`
     - Replace `'YOUR_NEWS_API_KEY'` with your actual API key (keep the quotes)
     - Example: Change `const API_KEY = 'YOUR_NEWS_API_KEY';` to `const API_KEY = 'abc123def456';`
     - Example: Change `const API_KEY = 'YOUR_NEWS_API_KEY';` to `const API_KEY = 'abc123def456';`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Layout/         # Layout components (Header, SearchBar, etc.)
│   ├── News/           # News-related components
│   └── UI/             # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── __tests__/          # Test files
```

### Key Components

- **Layout**: Main app layout with header and navigation
- **ArticleCard**: News article display component
- **ArticleDetail**: Full article view modal
- **SearchBar**: Real-time search functionality
- **CategoryTabs**: Category navigation
- **LoadingSkeleton**: Loading state component
- **ErrorMessage**: Error handling component

### State Management

The application uses Redux Toolkit with three main slices:
- **newsSlice**: Manages articles, loading states, and search
- **favoritesSlice**: Handles favorite articles with localStorage
- **themeSlice**: Controls dark/light mode

## 🧪 Testing

Run tests with:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

The test suite includes:
- Component rendering tests
- User interaction tests
- Custom hook tests
- API response handling tests

## 🎨 Design Features

### Color System
- **Primary**: Blue (#2563eb)
- **Secondary**: Slate grays
- **Accent**: Contextual colors for success, warning, error states
- **Dark Mode**: Comprehensive dark theme support

### Typography
- Clean, readable fonts with proper hierarchy
- Responsive text sizing
- Optimal line spacing (150% for body, 120% for headings)

### Interactions
- Smooth hover effects and transitions
- Loading skeletons for better UX
- Micro-interactions for user feedback

## 🔧 Configuration

### Environment Variables
To use real NewsAPI:
1. Get an API key from [NewsAPI.org](https://newsapi.org)
2. Update the `API_KEY` constant in `src/services/newsService.ts`

### API Configuration
The app is configured to work with NewsAPI.org free tier:
- Uses `/everything` endpoint (available for free users)
- Category filtering through search queries
- Limited to articles from the last 7-30 days
- 1,000 requests per day limit

To use your own API key:
1. Get a free API key from [NewsAPI.org](https://newsapi.org)
2. Replace the `API_KEY` constant in `src/services/newsService.ts`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist` directory.

## 🔍 API Integration

The app uses the official NewsAPI npm package and integrates with NewsAPI.org providing:
- Top headlines by category
- Everything search endpoint
- Real-time news updates
- Multiple country/language support
- Better error handling and reliability

### Rate Limits
- **NewsAPI Free tier**: 1,000 requests/day
- **NewsAPI Development**: 500 requests/day for localhost

## 🎯 Performance Optimizations

- **Lazy Loading**: Images load on demand
- **Memoization**: Optimized re-renders
- **Code Splitting**: Efficient bundle sizes
- **Caching**: localStorage for favorites and theme

## 🐛 Error Handling

The app handles various error scenarios:
- Network failures
- API rate limits
- Invalid search queries
- Missing images
- Malformed API responses

## 🔄 Future Enhancements

- **Pagination**: Load more articles
- **Categories**: Additional news categories
- **Filters**: Sort by date, source, relevance
- **Social Sharing**: Share articles on social media
- **Push Notifications**: Real-time news alerts
- **Bookmarks**: Advanced bookmark organization

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using React, TypeScript, and Redux Toolkit