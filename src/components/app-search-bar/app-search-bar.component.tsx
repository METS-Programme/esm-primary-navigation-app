import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "@carbon/react";
import styles from "./app-search-bar.scss";
import MenuItems from "../../menu/menu.component";
import {
  Analytics,
  AnalyticsCustom,
  Db2DataSharingGroup,
  DocumentAdd,
  DocumentImport,
  Events,
  VolumeFileStorage,
  HospitalBed,
  Medication,
  User,
  Report,
  UserActivity,
  Grid,
} from "@carbon/react/icons";
import {
  AssignedExtension,
  ExtensionSlot,
  attach,
  detachAll,
  useConnectedExtensions,
} from "@openmrs/esm-framework";

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

  // State for item extensions
  const [derivedSlots, setDerivedSlots] = useState<
    { slot: string; extension: string; name: string }[]
  >([]);

  // State for search term and filtered items
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(derivedSlots);

  // Fetch item extensions
  const menuItemExtensions = useConnectedExtensions(
    appMenuItemSlot
  ) as AssignedExtension[];

  // UseEffect for processing item extensions and attaching/detaching slots
  useEffect(() => {
    // Filter and process extensions
    const filteredExtensions = menuItemExtensions
      .filter((extension) => Object.keys(extension).length > 0)
      .map((extension, index) => ({
        slot: `${appMenuItemSlot}-${index}`,
        extension: extension.name,
        name: extension.meta.name,
      }));
    setDerivedSlots(filteredExtensions);

    // Attach/detach slots
    filteredExtensions.forEach(({ slot, extension }) => {
      attach(slot, extension);
    });

    return () => {
      filteredExtensions.forEach(({ slot }) => {
        detachAll(slot);
      });
    };
  }, [menuItemExtensions]);

  // UseEffect for updating items based on derivedSlots
  useEffect(() => {
    setItems(derivedSlots);
  }, [derivedSlots]);

  // UseMemo for rendering ExtensionSlots
  const extraPanels = useMemo(() => {
    return items.map(({ slot }) => <ExtensionSlot key={slot} name={slot} />);
  }, [items]);

  // Callback for handling search term changes
  const handleChange = useCallback(
    (val) => {
      if (typeof onChange === "function") {
        onChange(val);
      }
      setSearchTerm(val);

      // Filter items based on the search term
      const filteredItems = derivedSlots.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      );
      setItems(filteredItems);
    },
    [derivedSlots, onChange]
  );

  // Handle form submission
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchTerm);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchArea}>
        {/* Search component */}
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
      {/* Render ExtensionSlots */}
      <div className={styles.searchItems}>{extraPanels}</div>
    </>
  );
});

export default AppSearchBar;
