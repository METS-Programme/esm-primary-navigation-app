import { Link, Tile } from "@carbon/react";
import React from "react";
import { Report } from "@carbon/react/icons";
import styles from "./item.scss";

const Item = ({ item }) => {
  return (
    <Tile className={styles.customTile} id="menu-item">
      <span className={styles.customTileTitle}> {item?.app}</span>
      <br />
      <Report size={20} />
      <br />
      <Link href={item?.link}>Link</Link>
    </Tile>
  );
};
export default Item;
