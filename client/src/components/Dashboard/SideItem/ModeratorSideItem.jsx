import React from 'react';
import SideItem from './SideItem';

const ModeratorSideItem = () => {
    return (
        <div>
            <SideItem label='Product Review' address='product-review' />
            <SideItem label='Reported Contents' address='reported-contents' />
                
        </div>
    );
};

export default ModeratorSideItem;