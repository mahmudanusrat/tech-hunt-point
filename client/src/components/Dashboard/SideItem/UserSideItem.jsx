import React from "react";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import SideItem from "./SideItem";

const UserSideItem = () => {
  return (
    <div>
      <SideItem
        icon={BsFillHouseAddFill}
        label="Add Products"
        address="add-product"
      />
      <SideItem
        icon={MdOutlineManageHistory}
        label="My Products"
        address="my-products"
      />
      <SideItem icon={MdHomeWork} label="My Profile" address="my-Profile" />
    </div>
  );
};

export default UserSideItem;
