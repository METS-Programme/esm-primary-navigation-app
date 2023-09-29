import React, { RefAttributes, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Search } from "@carbon/react";
import styles from "./app-search-bar.scss";
import MenuItems from "../../menu/menu.component";

interface AppSearchBarProps {
  buttonProps?: object;
  initialSearchTerm?: string;
  onChange?: (searchTerm) => void;
  onClear: () => void;
  onSubmit: (searchTerm) => void;
  small?: boolean;
}

const AppSearchBar = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<AppSearchBarProps>
>(
  (
    { buttonProps, initialSearchTerm, onChange, onClear, onSubmit, small },
    ref
  ) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const handleChange = useCallback(
      (val) => {
        if (typeof onChange === "function") {
          onChange(val);
        }
        setSearchTerm(val);
      },
      [onChange, setSearchTerm]
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
          <Button
            type="submit"
            kind="secondary"
            size={small ? "sm" : "lg"}
            onClick={handleSubmit}
            {...buttonProps}
          >
            {t("search", "Search")}
          </Button>
        </form>
        <div className={styles.searchItems}>
          <MenuItems />
        </div>
      </>
    );
  }
);

export default AppSearchBar;
