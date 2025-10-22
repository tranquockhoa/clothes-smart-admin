import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("login", "./routes/pages/auth/login/index.tsx"),
  layout("./routes/main-layout.tsx", [
    index("./routes/manage-user/index.tsx"),
    route("manage-banner", "./routes/manage-banner/index.tsx"),
    route("manage-categories", "./routes/manage-categories/index.tsx"),
    route("manage-products", "./routes/manage-products/index.tsx"),

    // route("manage-user", "./routes/manage-user/index.tsx"),

    route("profile", "./routes/profile/index.tsx"),
  ]),
  route("dev", "./routes/dev/dev.tsx"),
] satisfies RouteConfig;
