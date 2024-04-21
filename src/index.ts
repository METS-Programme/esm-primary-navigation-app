import {
  defineConfigSchema,
  defineExtensionConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
  setupOfflineSync,
} from "@openmrs/esm-framework";
import { Application, navigateToUrl } from "single-spa";
import { configSchema } from "./config-schema";
import { moduleName, userPropertyChange } from "./constants";
import { syncUserLanguagePreference } from "./offline";
import userPanelComponent from "./components/user-panel-switcher-item/user-panel-switcher.component";
import changeLanguageLinkComponent from "./components/choose-locale/change-locale.component";
import genericLinkComponent, {
  genericLinkConfigSchema,
} from "./components/generic-link/generic-link.component";
import primaryNavRootComponent from "./root.component";
import offlineBannerComponent from "./components/offline-banner/offline-banner.component";

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

const options = {
  featureName: "primary navigation",
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
  defineExtensionConfigSchema("link", genericLinkConfigSchema);

  setupOfflineSync(userPropertyChange, [], syncUserLanguagePreference);
}

export const root = getSyncLifecycle(primaryNavRootComponent, options);

export const redirect: Application = async () => ({
  bootstrap: async () =>
    await navigateToUrl(window.getOpenmrsSpaBase() + "home"),
  mount: async () => undefined,
  unmount: async () => undefined,
});

export const userPanel = getSyncLifecycle(userPanelComponent, options);

export const localeChanger = getSyncLifecycle(
  changeLanguageLinkComponent,
  options
);

export const linkComponent = getSyncLifecycle(genericLinkComponent, options);

export const offlineBanner = getSyncLifecycle(offlineBannerComponent, options);
