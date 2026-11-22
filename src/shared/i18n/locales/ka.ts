// Georgian is the main language and the source of truth for translation keys.
export const ka = {
  common: {
    appName: 'Zano Outlet',
    back: 'უკან',
    close: 'დახურვა',
    or: 'ან',
    comingSoon: 'მალე დაემატება',
    genericError: 'რაღაც შეცდომა მოხდა. სცადეთ თავიდან.',
  },
  tabs: {
    home: 'მთავარი',
    catalog: 'კატალოგი',
    wishlist: 'სურვილები',
    cart: 'კალათა',
    profile: 'პროფილი',
  },
  home: {
    search: 'ძიება',
    gender: {
      women: 'ქალი',
      men: 'კაცი',
    },
    bannerCta: 'ნახვა',
    rails: {
      discounts: 'ყველაზე დიდი ფასდაკლება',
      newest: 'ახალი კოლექციები',
    },
    seeAll: 'ყველა',
    sortedBy: {
      discounts: 'დალაგებულია ფასდაკლებით',
      newest: 'დალაგებულია სიახლით',
    },
    wishlist: 'სურვილების სია',
    error: {
      title: 'ვერ ჩაიტვირთა',
      message: 'შეამოწმე ინტერნეტ კავშირი და სცადე თავიდან.',
      retry: 'თავიდან ცდა',
    },
    signInSheet: {
      title: 'შეინახე მოწონებული',
      message:
        'სურვილების სიაში დასამატებლად შედი ანგარიშში. პაროლი საჭირო არ არის.',
      signIn: 'შესვლა',
      notNow: 'ახლა არა',
    },
  },
  catalog: {
    title: 'კატალოგი',
    all: 'ყველა',
    filter: 'ფილტრი',
    sort: 'დალაგება',
    productCount_one: '{{count}} პროდუქტი',
    productCount_other: '{{count}} პროდუქტი',
    sorts: {
      newest: 'ახალი',
      discount: 'ყველაზე დიდი ფასდაკლება',
      priceAsc: 'ფასი: ზრდადობით',
      priceDesc: 'ფასი: კლებადობით',
    },
    sortsShort: {
      newest: 'ახალი',
      discount: 'ფასდაკლება',
      priceAsc: 'ფასი ↑',
      priceDesc: 'ფასი ↓',
    },
    filterSheet: {
      category: 'კატეგორია',
      brand: 'ბრენდი',
      clear: 'გასუფთავება',
      show: 'ჩვენება ({{count}})',
      showLoading: 'ჩვენება',
    },
    noResults: {
      title: 'ვერაფერი მოიძებნა',
      message: 'ამ ფილტრებით პროდუქტი არ არის. სცადე სხვა კატეგორია ან ბრენდი.',
      clear: 'ფილტრების გასუფთავება',
    },
  },
  product: {
    photo: 'ფოტო {{index}} / {{count}}',
    size: 'ზომა',
    chooseSize: 'აირჩიე ზომა',
    soldOut: '{{size}}, ამოიწურა',
    description: 'აღწერა',
    addToCart: 'კალათაში დამატება',
    addedSheet: {
      title: 'კალათაში დაემატა',
      viewCart: 'კალათის ნახვა ({{count}})',
      continue: 'შოპინგის გაგრძელება',
    },
    unavailable: {
      title: 'პროდუქტი აღარ არის',
      message: 'ეს პროდუქტი გაიყიდა ან აღარ იყიდება.',
      back: 'უკან დაბრუნება',
    },
  },
  wishlist: {
    title: 'სურვილები',
    itemCount_one: '{{count}} ნივთი',
    itemCount_other: '{{count}} ნივთი',
    empty: {
      title: 'სურვილების სია ცარიელია',
      message: 'შეინახე მოწონებული ნივთები გულზე დაჭერით და აქ იპოვი.',
      startShopping: 'დაიწყე შოპინგი',
    },
  },
  cart: {
    title: 'კალათა',
    itemCount_one: '{{count}} ნივთი',
    itemCount_other: '{{count}} ნივთი',
    size: 'ზომა: {{size}}',
    remove: 'წაშლა',
    quantity: 'რაოდენობა',
    decrease: 'შემცირება',
    increase: 'გაზრდა',
    soldOut: 'ეს ზომა მარაგში აღარ არის',
    soldOutNote: 'მარაგში არარსებული ნივთები ჯამში არ ითვლება.',
    summary: {
      title: 'შეკვეთის ჯამი',
      items: 'ნივთები ({{count}})',
      discount: 'ფასდაკლება',
      delivery: 'მიწოდება',
      deliveryLater: 'გაფორმებისას',
      total: 'სულ',
    },
    checkout: 'შეკვეთის გაფორმება',
    checkoutSoon: 'შეკვეთის გაფორმება მალე დაემატება.',
    empty: {
      title: 'კალათა ცარიელია',
      message: 'აირჩიე ზომა ნივთის გვერდზე და დაამატე კალათაში.',
      startShopping: 'დაიწყე შოპინგი',
      viewWishlist: 'სურვილების ნახვა',
    },
    signInSheet: {
      title: 'დაამატე კალათაში',
      message: 'კალათის გამოსაყენებლად შედით ანგარიშზე. პაროლი არ გჭირდება.',
    },
    addError: 'კალათაში დამატება ვერ მოხერხდა. სცადე ხელახლა.',
  },
  profile: {
    title: 'პროფილი',
    edit: 'პროფილის რედაქტირება',
    noName: 'სახელი არ არის მითითებული',
    soon: 'მალე',
    version: 'ვერსია {{version}}',
    groups: {
      account: 'ჩემი ანგარიში',
      settings: 'პარამეტრები',
      help: 'დახმარება',
    },
    rows: {
      orders: 'ჩემი შეკვეთები',
      addresses: 'მისამართები',
      wishlist: 'სურვილები',
      language: 'ენა',
      contact: 'დაგვიკავშირდით',
      legal: 'წესები და კონფიდენციალურობა',
    },
    languages: {
      ka: 'ქართული',
      en: 'English',
    },
    languageSheet: {
      title: 'ენა',
      done: 'მზადაა',
    },
    editForm: {
      firstName: 'სახელი',
      lastName: 'გვარი',
      phone: 'ტელეფონი',
      phonePlaceholder: '5XX XX XX XX',
      email: 'ელ-ფოსტა',
      emailHint: 'ელ-ფოსტით შედიხარ ანგარიშზე, ამიტომ მისი შეცვლა არ შეიძლება.',
      save: 'შენახვა',
      saved: 'შენახულია',
      invalidPhone: 'შეიყვანე სწორი ტელეფონის ნომერი',
    },
    signOutSheet: {
      title: 'გსურს გასვლა?',
      message:
        'შენი სურვილები ანგარიშზე რჩება. ნებისმიერ დროს შეგიძლია ისევ შეხვიდე.',
      confirm: 'გასვლა',
      cancel: 'გაუქმება',
    },
  },
  input: {
    showPassword: 'პაროლის ჩვენება',
    hidePassword: 'პაროლის დამალვა',
  },
  auth: {
    signOut: 'გასვლა',
    welcome: {
      title: 'კეთილი იყოს თქვენი მობრძანება Zano Outlet-ში',
      subtitle:
        'შედით ან შექმენით ანგარიში ერთი ნაბიჯით. პაროლი საჭირო არ არის.',
      continueWithApple: 'გაგრძელება Apple-ით',
      continueWithGoogle: 'გაგრძელება Google-ით',
      browseAsGuest: 'დათვალიერება შესვლის გარეშე',
      continueWithEmail: 'გაგრძელება ელფოსტით',
      legal:
        'გაგრძელებით ეთანხმებით ჩვენს <terms>წესებს</terms> და <privacy>კონფიდენციალურობის პოლიტიკას</privacy>.',
    },
    signInGate: {
      title: 'შედით ანგარიშზე',
      signIn: 'შესვლა',
      cart: 'კალათის გამოსაყენებლად შედით ანგარიშზე.',
      profile: 'შედით, რომ ნახოთ თქვენი პროფილი და შეკვეთები.',
      wishlist:
        'შედით, რომ შეინახოთ მოწონებული ნივთები და ნახოთ ისინი ნებისმიერ მოწყობილობაზე.',
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
