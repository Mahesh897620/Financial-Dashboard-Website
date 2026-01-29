# Financial Dashboard Website

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive financial management tools including expense tracking, budget management, investment monitoring, and financial analytics.

## 🚀 Features

- **Dashboard Overview**: Real-time financial metrics and insights
- **Expense Tracking**: Categorize and monitor your expenses
- **Budget Management**: Set and track budgets across different categories
- **Investment Portfolio**: Monitor your investment performance
- **Financial Reports**: Generate detailed financial reports
- **Currency Converter**: Real-time currency conversion
- **Bill Reminders**: Never miss a payment with smart reminders
- **Savings Goals**: Track progress towards your financial goals
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mahesh897620/Financial-Dashboard-Website.git
   cd Financial-Dashboard-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🧪 Testing

Run the test suite:

```bash
npm run test
# or
yarn test
```

For watch mode during development:

```bash
npm run test:watch
# or
yarn test:watch
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components
│   ├── notifications/  # Notification components
│   ├── search/         # Search functionality
│   ├── shared/         # Shared utility components
│   ├── ui/            # Base UI components (shadcn/ui)
│   └── widgets/       # Dashboard widgets
├── data/              # Mock data and constants
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── test/              # Test files and setup
```

## 🎨 Customization

### Theme Configuration

The application supports both light and dark themes. You can customize the theme colors in:
- `tailwind.config.ts` - Tailwind CSS configuration
- `src/index.css` - CSS custom properties for themes

### Adding New Components

1. Create your component in the appropriate directory under `src/components/`
2. Export it from the component's index file
3. Import and use it in your pages or other components

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Recharts](https://recharts.org/) for the charting library
- [Lucide](https://lucide.dev/) for the icon set

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainer: [Mahesh897620](https://github.com/Mahesh897620)

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Repository**: https://github.com/Mahesh897620/Financial-Dashboard-Website
- **Issues**: https://github.com/Mahesh897620/Financial-Dashboard-Website/issues

---

Made with ❤️ by [Mahesh897620](https://github.com/Mahesh897620)