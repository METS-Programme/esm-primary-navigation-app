import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderPanel } from "@carbon/react";
import MenuItems from "../../menu/menu.component";
import { useOnClickOutside, useConfig } from "@openmrs/esm-framework";
import styles from "./app-menu-panel.scss";
import AppSearchBar from "../app-search-bar/app-search-bar.component";
import AppSearchLaunch from "../app-search-icon/app-search-icon.component";

interface AppMenuProps {
  expanded: boolean;
  hidePanel: () => void;
}

const AppMenuPanel: React.FC<AppMenuProps> = ({ expanded, hidePanel }) => {
  const appMenuRef = useOnClickOutside<HTMLDivElement>(hidePanel, expanded);

  return (
    <HeaderPanel
      ref={appMenuRef as any}
      className={styles.headerPanel}
      aria-label="App Menu Panel"
      expanded={expanded}
      onClick={() => hidePanel()}
    >
      <MenuItems />
    </HeaderPanel>
  );
};

export default AppMenuPanel;
