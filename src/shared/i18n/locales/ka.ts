// Georgian is the main language and the source of truth for translation keys.
export const ka = {
  common: {
    appName: 'Zano Outlet',
    back: 'უკან',
    genericError: 'რაღაც შეცდომა მოხდა. სცადეთ თავიდან.',
  },
  input: {
    showPassword: 'პაროლის ჩვენება',
    hidePassword: 'პაროლის დამალვა',
  },
  auth: {
    welcome: {
      title: 'კეთილი იყოს თქვენი მობრძანება Zano Outlet-ში',
      subtitle:
        'შედით ან შექმენით ანგარიში ერთი ნაბიჯით. პაროლი საჭირო არ არის.',
      continueWithApple: 'გაგრძელება Apple-ით',
      continueWithGoogle: 'გაგრძელება Google-ით',
      continueWithEmail: 'გაგრძელება ელფოსტით',
      legal:
        'გაგრძელებით ეთანხმებით ჩვენს <terms>წესებს</terms> და <privacy>კონფიდენციალურობის პოლიტიკას</privacy>.',
    },
    email: {
      title: 'რა არის თქვენი ელფოსტა?',
      subtitle:
        'გამოგიგზავნით 6-ნიშნა კოდს. ახალი ხართ? ანგარიშს ავტომატურად შეგიქმნით.',
      label: 'ელფოსტა',
      placeholder: 'you@example.com',
      sendCode: 'კოდის გაგზავნა',
    },
    code: {
      title: 'შეამოწმეთ ელფოსტა',
      subtitle:
        'შეიყვანეთ 6-ნიშნა კოდი, რომელიც გამოგიგზავნეთ მისამართზე {{email}}.',
      label: '6-ნიშნა კოდი',
      noCode: 'არ მიგიღიათ?',
      resend: 'კოდის ხელახლა გაგზავნა',
      continue: 'გაგრძელება',
      codeResent: 'ახალი კოდი გამოგიგზავნეთ.',
    },
    errors: {
      invalidEmail: 'შეიყვანეთ სწორი ელფოსტის მისამართი',
      invalidCode: 'კოდი არასწორია ან ვადა გაუვიდა',
      rateLimited: 'ძალიან ბევრი მცდელობაა. ცოტა ხანში სცადეთ.',
      network: 'ინტერნეტთან კავშირი ვერ მოხერხდა. შეამოწმეთ კავშირი.',
      googleUnavailable: 'Google-ით შესვლა ამ მოწყობილობაზე მიუწვდომელია.',
      unknown: 'რაღაც შეცდომა მოხდა. სცადეთ თავიდან.',
    },
  },
} as const;

type Strings<T> = {
  [K in keyof T]: T[K] extends string ? string : Strings<T[K]>;
};

// Every other language must provide exactly the same keys as Georgian.
export type Translation = Strings<typeof ka>;
