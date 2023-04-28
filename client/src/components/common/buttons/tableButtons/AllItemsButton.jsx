import React from 'react';
import { NavLink } from 'react-router-dom';

const AllItemsButton = ({selectedStatus, onClearFilter, link, text}) => {
    return ( 
        <NavLink to={link}>
        <button
          className={"btn btn-danger " + (selectedStatus ? " white" : "")}
          onClick={onClearFilter}
        >
          {text}
        </button>
      </NavLink>
     );
}
 
export default AllItemsButton;