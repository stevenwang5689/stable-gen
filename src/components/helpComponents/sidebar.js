import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import "./styles.css";

//used https://github.com/jsmanifest/modern-sidebar/blob/master/src/Sidebar.js and trimmed it down

function SidebarItem({ item, curPadding = 0, ...rest }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const { label, items, onClick: onClickProperty } = item;

  function onClick(e) {
    if (Array.isArray(items)) {
      setCollapsed(!collapsed);
    }
    if (onClickProperty) {
      onClickProperty(e, item);
    }
  }

  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon className="sidebar-arrow" />
    ) : (
      <ExpandMoreIcon className="sidebar-arrow" />
    );
  }

  return (
    <>
      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button
        dense
        {...rest}
      >
        <div
          style={{ paddingLeft: curPadding }}
          className="sidebar-item-content"
        >
          <div className="sidebar-item-text">{label}</div>
        </div>
        {expandIcon}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={subItem.name}>
                <SidebarItem item={subItem} curPadding={20} />
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
}

function Sidebar({ items, depthStep, depth }) {
  return (
    <div className="sidebar">
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <Fragment key={sidebarItem.name}>
            <SidebarItem item={sidebarItem} />
            <Divider light style={{ margin: "3px" }} />
          </Fragment>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;
