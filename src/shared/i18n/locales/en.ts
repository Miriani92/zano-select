import type { Translation } from './ka';

export const en: Translation = {
  common: {
    appName: 'Zano Outlet',
    back: 'Back',
    close: 'Close',
    or: 'or',
    comingSoon: 'Coming soon',
    genericError: 'Something went wrong. Please try again.',
  },
  tabs: {
    home: 'Home',
    catalog: 'Catalog',
    cart: 'Cart',
    profile: 'Profile',
  },
  home: {
    search: 'Search',
    gender: {
      women: 'Women',
      men: 'Men',
    },
    bannerCta: 'Shop now',
    rails: {
      discounts: 'Biggest discounts',
      newest: 'New collections',
    },
    seeAll: 'See all',
    sortedBy: {
      discounts: 'Sorted by discount',
      newest: 'Sorted by newest',
    },
    wishlist: 'Wishlist',
    error: {
      title: "Couldn't load",
      message: 'Check your internet connection and try again.',
      retry: 'Try again',
    },
    signInSheet: {
      title: 'Save what you love',
      message: 'Sign in to add to your wishlist. No password needed.',
      signIn: 'Sign in',
      notNow: 'Not now',
    },
  },
  cart: {
    empty: 'Your cart is empty',
  },
  input: {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
  },
  auth: {
    signOut: 'Log out',
    welcome: {
      title: 'Welcome to Zano Outlet',
      subtitle: 'Sign in or create an account in one step. No password needed.',
      continueWithApple: 'Continue with Apple',
      continueWithGoogle: 'Continue with Google',
      browseAsGuest: 'Browse without signing in',
      continueWithEmail: 'Continue with email',
      legal:
        'By continuing you agree to our <terms>Terms</terms> and <privacy>Privacy Policy</privacy>.',
    },
    signInGate: {
      title: 'Sign in to your account',
      signIn: 'Sign in',
      cart: 'Sign in to use your cart.',
      profile: 'Sign in to see your profile and orders.',
    },
    email: {
      title: "What's your email?",
      subtitle:
        "We'll send you a 6-digit code. New here? We'll create your account automatically.",
      label: 'Email',
      placeholder: 'you@example.com',
      sendCode: 'Send code',
    },
    code: {
      title: 'Check your email',
      subtitle: 'Enter the 6-digit code we sent to {{email}}.',
      label: '6-digit code',
      noCode: "Didn't get it?",
      resend: 'Resend code',
      continue: 'Continue',
      codeResent: 'We sent you a new code.',
    },
    errors: {
      invalidEmail: 'Enter a valid email address',
      invalidCode: 'The code is wrong or has expired',
      rateLimited: 'Too many attempts. Please try again in a moment.',
      network: 'Could not connect. Check your internet connection.',
      googleUnavailable: 'Google sign-in is not available on this device.',
      unknown: 'Something went wrong. Please try again.',
    },
  },
};
