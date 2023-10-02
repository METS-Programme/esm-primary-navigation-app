import React from "react";
import { HeaderPanel } from "@carbon/react";
import { useOnClickOutside } from "@openmrs/esm-framework";
import styles from "./app-menu-panel.scss";

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
    ></HeaderPanel>
  );
};

export default AppMenuPanel;
