import { ClickableTile } from "@carbon/react";
import React from "react";
import styles from "./item.scss";

const Item = ({ item }) => {
  return (
    <ClickableTile
      className={styles.customTile}
      id="menu-item"
      href={item.meta.link}
    >
      {item.meta.icon && (
        <div className="customTileTitle">{item.meta.icon}</div>
      )}
      {item.meta.app && <div>{item.app}</div>}
    </ClickableTile>
  );
};
export default Item;
