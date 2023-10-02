import React from "react";
import Item from "./item/item.component";
import { Grid, Column } from "@carbon/react";

const MenuItems = ({ items }) => {
  return (
    <Grid style={{ gap: "2px" }}>
      {items.map((item) => (
        <Column lg={5} md={5} sm={5} style={{ margin: "2px" }}>
          <Item item={item} />
        </Column>
      ))}
    </Grid>
  );
};

export default MenuItems;
