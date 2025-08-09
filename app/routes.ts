import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("login", "./routes/pages/auth/login/index.tsx"),
  layout("./routes/main-layout.tsx", [
    index("./routes/manage-account/index.tsx"),
    route("manage-banner", "./routes/manage-banner/index.tsx"),
  ]),
  route("dev", "./routes/dev/dev.tsx"),
] satisfies RouteConfig;
