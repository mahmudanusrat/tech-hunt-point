import React from 'react';
import SideItem from './SideItem';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { FaUsers, FaTicket  } from "react-icons/fa6";

const AdminSideItem = () => {
    return (
        <div>
            <SideItem
                icon={BsFillHouseAddFill}
                label='Statistics'
                address='statistic'
              />
              <SideItem icon={FaUsers} label='Manage Users' address='manage-users' />
              <SideItem icon={FaTicket} label='Manage Coupons' address='manage-coupons' />
        </div>
    );
};

export default AdminSideItem;