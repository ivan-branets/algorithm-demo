import React, { useState } from 'react';
import { Slider, List, ListItem, Typography } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import data from './data';
import './App.css';

const folders = data.objects.map(item => ({...item, size: +item.size}));
const defaultSize = 50;

function App() {
  const [foundFolders, setFoundFolders] = useState(findFolders(defaultSize))
  return (
    <div className="app">
      <Slider
        defaultValue={defaultSize}
        valueLabelDisplay="on"
        min={0}
        max={1000}
        onChange={(event, value) => {
          const found = findFolders(value);
          setFoundFolders(found);
        }}
      />
      <Typography variant="caption">
        {foundFolders.length} items of {numberWithCommas(folders.length)} total found
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            primary="Single-line item"
            secondary="5Mb"
          />
        </ListItem>
      </List>
    </div>
  );
}

function findFolders(size) {
  return folders.filter(item => item.size === size);
}

function numberWithCommas(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default App;
