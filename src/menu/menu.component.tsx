import React from "react";
import Item from "./item/item.component";
import { Grid, Row, Column } from "@carbon/react";

const MenuItems = () => {
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();

  const items = [
    {
      app: "Data Visualiser",
      link: `${openmrsSpaBase}data-visualiser`,
      icon: "Report",
    },
    {
      app: "Patient Queue",
      link: `${openmrsSpaBase}patient-queues`,
      icon: "People",
    },
    {
      app: "Dispensing ",
      link: `${openmrsSpaBase}dispensing`,
      icon: "People",
    },
    {
      app: "Stock Management ",
      link: `${openmrsSpaBase}stock-management`,
      icon: "People",
    },
    {
      app: "Bed Management ",
      link: `${openmrsSpaBase}bed-management`,
      icon: "People",
    },
    {
      app: "Form Builder ",
      link: `${openmrsSpaBase}form-builder`,
      icon: "People",
    },
    {
      app: "Form Render Test ",
      link: `${openmrsSpaBase}form-render-test`,
      icon: "People",
    },
  ];

  return (
    <Grid>
      <Row>
        {items.map((item) => (
          <Column>
            <Item item={item} />
          </Column>
        ))}
      </Row>
    </Grid>
  );
};

export default MenuItems;
