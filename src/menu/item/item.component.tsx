import { Link, Tile } from "@carbon/react";
import React from "react";
import { Report } from "@carbon/react/icons";

const Item = ({ item }) => {
  return (
    <Tile id="menu-item">
      {item?.app}
      <br />
      <Report size={20} />
      <br />
      <Link href={item?.link}>Link</Link>
    </Tile>
  );
};
export default Item;
