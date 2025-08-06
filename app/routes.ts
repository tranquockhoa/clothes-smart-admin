import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/main-layout.tsx", [
    index("./routes/manage-account/index.tsx"),
    route("manage-banner", "./routes/manage-banner/index.tsx"),
  ]),
] satisfies RouteConfig;
