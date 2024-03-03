import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "@carbon/react";
import styles from "./app-search-bar.scss";

import {
  AssignedExtension,
  ExtensionSlot,
  attach,
  detachAll,
  Extension,
  useConnectedExtensions,
} from "@openmrs/esm-framework";
import { ComponentContext } from "@openmrs/esm-framework/src/internal";

const appMenuItemSlot = "app-menu-item-slot";

interface AppSearchBarProps {
  onChange?: (searchTerm) => void;
  onClear: () => void;
  onSubmit: (searchTerm) => void;
  small?: boolean;
}

const AppSearchBar = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<AppSearchBarProps>
>(({ onChange, onClear, onSubmit, small }, ref) => {
  const { t } = useTranslation();

  const [derivedSlots, setDerivedSlots] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const menuItemExtensions = useConnectedExtensions(
    appMenuItemSlot
  ) as AssignedExtension[];

  useEffect(() => {
    const filteredExtensions = menuItemExtensions
      .filter((extension) => Object.keys(extension).length > 0)
      .map((extension) => (
        <ComponentContext.Provider
          key={extension.id}
          value={{
            moduleName: extension.moduleName,
            extension: {
              extensionId: extension.id,
              extensionSlotName: appMenuItemSlot,
              extensionSlotModuleName: extension.moduleName,
            },
          }}
        >
          <Extension />
        </ComponentContext.Provider>
      ));
    setDerivedSlots(filteredExtensions);
  }, [menuItemExtensions]);

  const handleChange = useCallback(
    (val) => {
      if (typeof onChange === "function") {
        onChange(val);
      }
      setSearchTerm(val);

      const filteredItems = derivedSlots.filter((item) =>
        item?.name?.toLowerCase().includes(val?.toLowerCase())
      );
      setDerivedSlots(filteredItems);
    },
    [derivedSlots, onChange]
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchTerm);
  };

  return (
    <>
      {derivedSlots.length > 0 ? (
        <>
          <form onSubmit={handleSubmit} className={styles.searchArea}>
            <Search
              autoFocus
              className={styles.appSearchInput}
              closeButtonLabelText={t("clearSearch", "Clear")}
              labelText=""
              onChange={(event) => handleChange(event.target.value)}
              onClear={onClear}
              placeholder={t(
                "searchForApp",
                "Search for an application or module by name"
              )}
              size={small ? "sm" : "lg"}
              value={searchTerm}
              ref={ref}
              data-testid="appSearchBar"
            />
          </form>
          <div className={styles.searchItems}>{derivedSlots}</div>
        </>
      ) : (
        <div className={styles.searchItems}>Loading modules...</div>
      )}
    </>
  );
});

export default AppSearchBar;
