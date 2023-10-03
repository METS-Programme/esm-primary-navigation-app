import { ClickableTile } from "@carbon/react";
import React from "react";
import styles from "./item.scss";

const Item = ({ item }) => {
  return (
    <ClickableTile
      className={styles.customTile}
      id="menu-item"
      href={item.link}
    >
      {item.icon && <div className="customTileTitle">{item.icon}</div>}
      {item.app && <div>{item.app}</div>}
    </ClickableTile>
  );
};
export default Item;
