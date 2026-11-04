import type { Translation } from './ka';

export const en: Translation = {
  common: {
    appName: 'Zano Select',
    back: 'Back',
    genericError: 'Something went wrong. Please try again.',
  },
  input: {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
  },
  auth: {
    welcome: {
      title: 'Welcome to Zano Select',
      subtitle: 'Sign in or create an account in one step. No password needed.',
      continueWithApple: 'Continue with Apple',
      continueWithGoogle: 'Continue with Google',
      continueWithEmail: 'Continue with email',
      legal:
        'By continuing you agree to our <terms>Terms</terms> and <privacy>Privacy Policy</privacy>.',
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
      unknown: 'Something went wrong. Please try again.',
    },
  },
};
