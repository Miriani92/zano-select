import {
  getGoogleIdToken,
  signOutOfGoogle,
} from '@/features/auth/data/api/google-sign-in';
import { createAsyncStorageGuestModeRepository } from '@/features/auth/data/repositories/async-storage-guest-mode-repository';
import { createSupabaseAuthRepository } from '@/features/auth/data/repositories/supabase-auth-repository';
import { makeBrowseAsGuest } from '@/features/auth/domain/useCases/browse-as-guest';
import { makeObserveAuthState } from '@/features/auth/domain/useCases/observe-auth-state';
import { makeObserveGuestMode } from '@/features/auth/domain/useCases/observe-guest-mode';
import { makeSendEmailCode } from '@/features/auth/domain/useCases/send-email-code';
import { makeSignInWithGoogle } from '@/features/auth/domain/useCases/sign-in-with-google';
import { makeSignOut } from '@/features/auth/domain/useCases/sign-out';
import { makeVerifyEmailCode } from '@/features/auth/domain/useCases/verify-email-code';
import { createAsyncStorageGenderPreferenceRepository } from '@/features/catalog/data/repositories/async-storage-gender-preference-repository';
import { createSupabaseCatalogRepository } from '@/features/catalog/data/repositories/supabase-catalog-repository';
import {
  makeGetGenderPreference,
  makeSetGenderPreference,
} from '@/features/catalog/domain/useCases/gender-preference';
import {
  makeCountCatalogProducts,
  makeGetCatalogFilterOptions,
  makeGetCatalogProducts,
} from '@/features/catalog/domain/useCases/get-catalog-products';
import { makeGetHomeFeed } from '@/features/catalog/domain/useCases/get-home-feed';
import { makeGetProductDetail } from '@/features/catalog/domain/useCases/get-product-detail';
import { makeGetRailProducts } from '@/features/catalog/domain/useCases/get-rail-products';
import { createSupabaseWishlistRepository } from '@/features/wishlist/data/repositories/supabase-wishlist-repository';
import { makeObserveWishlist } from '@/features/wishlist/domain/useCases/observe-wishlist';
import { makeToggleWishlist } from '@/features/wishlist/domain/useCases/toggle-wishlist';
import { supabase } from '@/infrastructure/supabase/client';

// Composition root: the only place that knows which implementation backs each repository.
const authRepository = createSupabaseAuthRepository(supabase, {
  getIdToken: getGoogleIdToken,
  signOut: signOutOfGoogle,
});

const guestModeRepository = createAsyncStorageGuestModeRepository();

export const authUseCases = {
  auth: {
    sendEmailCode: makeSendEmailCode(authRepository),
    verifyEmailCode: makeVerifyEmailCode(authRepository),
    signInWithGoogle: makeSignInWithGoogle(authRepository),
    signOut: makeSignOut(authRepository, guestModeRepository),
    observeAuthState: makeObserveAuthState(authRepository),
    browseAsGuest: makeBrowseAsGuest(guestModeRepository),
    observeGuestMode: makeObserveGuestMode(guestModeRepository),
  },
};

const catalogRepository = createSupabaseCatalogRepository(supabase);
const genderPreferenceRepository =
  createAsyncStorageGenderPreferenceRepository();

export const catalogUseCases = {
  getHomeFeed: makeGetHomeFeed(catalogRepository),
  getRailProducts: makeGetRailProducts(catalogRepository),
  getCatalogProducts: makeGetCatalogProducts(catalogRepository),
  countCatalogProducts: makeCountCatalogProducts(catalogRepository),
  getCatalogFilterOptions: makeGetCatalogFilterOptions(catalogRepository),
  getProductDetail: makeGetProductDetail(catalogRepository),
  getGenderPreference: makeGetGenderPreference(genderPreferenceRepository),
  setGenderPreference: makeSetGenderPreference(genderPreferenceRepository),
};

const wishlistRepository = createSupabaseWishlistRepository(supabase);

export const wishlistUseCases = {
  observeWishlist: makeObserveWishlist(wishlistRepository),
  toggleWishlist: makeToggleWishlist(wishlistRepository),
};
