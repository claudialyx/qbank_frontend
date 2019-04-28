import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const MenuBar = () => {
    return (
        <Menu tabular className="Menu">
            <Menu.Item name='upload' ><NavLink to="/upload">Upload</NavLink></Menu.Item>
            <Menu.Item name='search' ><NavLink to="/search">Search</NavLink></Menu.Item>
        </Menu>
    )
}

export default MenuBar