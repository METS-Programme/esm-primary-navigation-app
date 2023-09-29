import React from "react";
import Item from "./item/item.component";
import { Grid, Row, Column } from "@carbon/react";

const MenuItems = () => {
  const items = [
    {
      app: "Data Visualiser",
      link: "openmrs/spa/data-visualizer",
      icon: "Report",
    },
    {
      app: "Patient Queue",
      link: "openmrs/spa/patient-queues",
      icon: "People",
    },
    {
      app: "Data Visualiser",
      link: "openmrs/spa/data-visualizer",
      icon: "Report",
    },
    {
      app: "Patient Queue",
      link: "openmrs/spa/patient-queues",
      icon: "People",
    },
  ];

  return (
    <Grid>
      <Row>
        {items.map((item, index) => (
          <Row key={index} sm={2} md={2} lg={2}>
            <Item item={item} />
          </Row>
        ))}
      </Row>
    </Grid>
  );
};

export default MenuItems;
