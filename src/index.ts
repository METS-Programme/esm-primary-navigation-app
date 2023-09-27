import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

const moduleName = "@ugandaemr/esm-menu-app";

const options = {
  featureName: "root",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export const menuItems = getAsyncLifecycle(
  () => import("./menu/menu.component"),
  options
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
