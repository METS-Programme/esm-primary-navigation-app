import React, { useCallback, useState } from "react";
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

  const initialItems = [
    {
      app: "Data Visualiser",
      link: `${openmrsSpaBase}data-visualiser`,
      icon: <Analytics />,
    },
    {
      app: "Dispensing ",
      link: `${openmrsSpaBase}dispensing`,
      icon: <Medication />,
    },
    {
      app: "Stock Management ",
      link: `${openmrsSpaBase}stock-management`,
      icon: <Report />,
    },
    {
      app: "Bed Management ",
      link: `${openmrsSpaBase}bed-management`,
      icon: <HospitalBed />,
    },
    {
      app: "Form Builder ",
      link: `${openmrsSpaBase}form-builder`,
      icon: <DocumentAdd />,
    },
    {
      app: "Form Render Test ",
      link: `${openmrsSpaBase}form-render-test`,
      icon: <DocumentImport />,
    },
    {
      app: "Legacy Admin ",
      link: `/openmrs/admin/index.htm`,
      icon: <User />,
    },
    {
      app: "Cohort Builder ",
      link: `${openmrsSpaBase}cohort-builder`,
      icon: <Events />,
    },
    {
      app: "Theatre ",
      link: `${openmrsSpaBase}theatre`,
      icon: <Events />,
    },
    {
      app: "System Info ",
      link: `${openmrsSpaBase}about`,
      icon: <VolumeFileStorage />,
    },
  ];

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
