import { ClickableTile } from "@carbon/react";
import React from "react";
import { Report } from "@carbon/react/icons";
import styles from "./item.scss";

const Item = ({ item }) => {
  return (
    <ClickableTile
      className={styles.customTile}
      id="menu-item"
      href={item.link}
    >
      <Report size={20} />
      <br />
      <span className={styles.customTileTitle}> {item?.app}</span>
    </ClickableTile>
  );
};
export default Item;
