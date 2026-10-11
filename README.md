# FreshCart - Grocery Delivery App

A modern, cross-platform grocery delivery mobile app built with React Native and Expo.

## Features

✅ **Home Screen**
- Product browsing with categories
- Personalized greeting
- Promo cards and deals
- Location-based delivery

✅ **Shopping Cart**
- Add/remove items
- Quantity management
- Order summary with pricing
- Free delivery threshold

✅ **Deals & Offers**
- Hot deals showcase
- Special discounts
- Limited-time offers

✅ **User Profile**
- Account management
- Delivery preferences
- Order history
- Settings

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g eas-cli`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dkingoflagos/freshcart.git
cd freshcart
```

2. Install dependencies:
```bash
npm install
```

3. Start the dev server:
```bash
npm start
```

4. Run on device:
```bash
npm run android    # For Android
npm run ios        # For iOS
npm run web        # For Web
```

## Build & Deploy

### Build for iOS
```bash
npm run build:ios
```

### Build for Android
```bash
npm run build:android
```

### Build for Both
```bash
npm run build:all
```

### Submit to App Stores
```bash
npm run submit:ios
npm run submit:android
```

## Project Structure

```
freshcart/
├── App.js                 # Main app component
├── app.json              # Expo config
├── package.json          # Dependencies
├── eas.json              # EAS Build config
├── src/
│   ├── components/
│   │   └── ProductCard.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── CartScreen.js
│   │   └── ProfileScreen.js
│   ├── data/
│   │   └── mockData.js
│   ├── theme/
│   │   ├── colors.js
│   │   └── themes.js
│   └── context/
│       └── ThemeContext.js
└── assets/
    ├── icon.png
    ├── splash.png
    └── adaptive-icon.png
```

## Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Development and distribution platform
- **Zustand** - State management (optional)
- **React Navigation** - Navigation library

## Colors & Theming

The app uses a modern, accessible color palette:
- Primary: `#2F9E44` (Green)
- Accent: `#F7C948` (Gold)
- Background: `#F5F9F4` (Light)
- Text: `#1D2A21` (Dark)

## Next Steps

- [ ] Backend API integration
- [ ] Real authentication
- [ ] Payment gateway (Stripe, Paystack)
- [ ] Order tracking
- [ ] Real-time notifications
- [ ] Dark theme support
- [ ] Multiple language support

## License

MIT
