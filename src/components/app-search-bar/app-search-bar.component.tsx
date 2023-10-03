import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "@carbon/react";
import styles from "./app-search-bar.scss";
import MenuItems from "../../menu/menu.component";
import {
  Analytics,
  DocumentAdd,
  DocumentImport,
  Events,
  VolumeFileStorage,
  HospitalBed,
  Medication,
  User,
  Report,
  UserActivity,
} from "@carbon/react/icons";

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

  // items
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();

  const initialItems = useMemo(() => {
    const items = [
      {
        app: "Data Visualiser",
        link: `${openmrsSpaBase}data-visualiser`,
        icon: <Analytics size={24} />,
      },
      {
        app: "Dispensing ",
        link: `${openmrsSpaBase}dispensing`,
        icon: <Medication size={24} />,
      },
      {
        app: "Stock Management ",
        link: `${openmrsSpaBase}stock-management`,
        icon: <Report size={24} />,
      },
      {
        app: "Bed Management ",
        link: `${openmrsSpaBase}bed-management`,
        icon: <HospitalBed size={24} />,
      },
      {
        app: "Form Builder ",
        link: `${openmrsSpaBase}form-builder`,
        icon: <DocumentAdd size={24} />,
      },
      {
        app: "Form Render Test ",
        link: `${openmrsSpaBase}form-render-test`,
        icon: <DocumentImport size={24} />,
      },
      {
        app: "Legacy Admin ",
        link: `/openmrs/admin/index.htm`,
        icon: <User size={24} />,
      },
      {
        app: "Cohort Builder ",
        link: `${openmrsSpaBase}cohort-builder`,
        icon: <Events size={24} />,
      },
      {
        app: "Theatre ",
        link: `${openmrsSpaBase}theatre`,
        icon: <UserActivity size={24} />,
      },
      {
        app: "System Info ",
        link: `${openmrsSpaBase}about`,
        icon: <VolumeFileStorage size={24} />,
      },
    ];

    return items;
  }, [openmrsSpaBase]);

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(initialItems);

  const handleChange = useCallback(
    (val) => {
      if (typeof onChange === "function") {
        onChange(val);
      }
      setSearchTerm(val);
      const filteredItems = initialItems.filter((item) =>
        item.app.toLowerCase().includes(val)
      );
      setItems(filteredItems);
    },
    [initialItems, onChange]
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchTerm);
  };

  return (
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
            "Search for a application or module by name"
          )}
          size={small ? "sm" : "lg"}
          value={searchTerm}
          ref={ref}
          data-testid="appSearchBar"
        />
      </form>
      <div className={styles.searchItems}>
        <MenuItems items={items} />
      </div>
    </>
  );
});

export default AppSearchBar;
