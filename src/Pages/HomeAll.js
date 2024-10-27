import React from "react";
import AddProductHome from "./AddProductHome";
import ElectricalHero from "./ElectricalHome/ElectricalHero";
import ElectricalAllProducts from "./ElectricalHome/ElectricalAllProducts";


const HomeAll = () => {
  return (
    <div>
        <ElectricalHero></ElectricalHero>
        <ElectricalAllProducts></ElectricalAllProducts>
    </div>
  );
};

export default HomeAll;
