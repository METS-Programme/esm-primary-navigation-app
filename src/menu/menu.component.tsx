import React from "react";
import Item from "./item/item.component";
import { Grid, Column } from "@carbon/react";

const MenuItems = ({ items }) => {
  return (
    <Grid style={{ gap: "2px" }}>
      {items
        .filter((extension) => Object.keys(extension.meta).length > 0)
        .map((extension, index) => {
          <Column lg={5} md={5} sm={5} style={{ margin: "2px" }}>
            <Item key={index} item={extension} />
          </Column>;
        })}
    </Grid>
  );
};

export default MenuItems;
