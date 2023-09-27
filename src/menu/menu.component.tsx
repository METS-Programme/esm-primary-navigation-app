import React from "react";
import Item from "./item/item.component";

const MenuItems = () => {
  // const [items, setItems] = useState([]);

  const items = [
    { app: "Data Visualiser", link: "/data-visualizer", icon: "Report" },
    { app: "Patient Queue", link: "/patient-queues", icon: "People" },
  ];

  return items.map((item) => {
    return <Item item={item} />;
  });
};

export default MenuItems;
