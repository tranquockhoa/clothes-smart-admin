import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profile.store";
import allUserReducer from "./features/manage-user/manage-user.store";
import userPorfileReducer from "./features/user-profile/user-profile.store";
import allBannerReducer from "./features/all-banner/all-banner.store";
import infoBannerReducer from "./features/info-banner/info-banner.store";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    allUser: allUserReducer,
    userProfile: userPorfileReducer,
    allBanner: allBannerReducer,
    infoBanner: infoBannerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
