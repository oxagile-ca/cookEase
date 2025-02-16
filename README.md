<h1 align="center">
  <img src='assets/images/logo.png' width='200'>
  <br>
  CookEase
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="CookEase is released under the MIT license." />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
</p>

<p align="center">
  Connect with Professional Chefs for Private Dining Experiences
</p>

## 🎯 Features

- 👨‍🍳 Browse and book professional chefs
- 🗓️ Real-time availability scheduling
- 💬 Direct messaging with chefs
- ⭐ Ratings and reviews system
- 🍽️ Customizable dining experiences
- 📍 Location-based chef search
- 💳 Secure payment processing
- 🌙 Dark/Light theme support

## 🚀 Tech Stack

- 📱 React Native with Expo
- 🎨 Tailwind CSS for styling
- 🔄 Supabase for backend
- 📦 Expo Router for navigation
- 🔒 Secure authentication
- 🌐 Cross-platform (iOS, Android, Web)

## 🗒️ Requirements

- [Node.js 20.x](https://nodejs.org/en)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- [Supabase Account](https://supabase.com)

## ⚡️ Quick Start

1. Clone the repository:
```bash
git clone https://github.com/oxagile-ca/cookEase.git
```

2. Install dependencies:
```bash
cd cookEase
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Update `.env` with your Supabase credentials

4. Start the development server:
```bash
npm run dev
```

## 📱 App Structure

```
src/
├── app/              # Expo Router pages
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── services/        # API and external services
├── theme/           # Theme configuration
└── utils/           # Helper functions
```

## 🔑 Environment Variables

Required environment variables:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run ios` - Start iOS simulator
- `npm run android` - Start Android emulator
- `npm run web` - Start web development
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Product Owner: [Name]
- Tech Lead: [Name]
- Developers: [Names]
- Designers: [Names]