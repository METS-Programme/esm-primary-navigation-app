import React from "react";
import Item from "./item/item.component";
import { Grid, Column } from "@carbon/react";
import {
  Analytics,
  DocumentAdd,
  DocumentImport,
  Hotel,
  Medication,
  Report,
} from "@carbon/react/icons";

const MenuItems = () => {
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();

  const items = [
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
      icon: <Hotel />,
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
  ];

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
