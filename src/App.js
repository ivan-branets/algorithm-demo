import React, { useState } from 'react';
import { Slider, List, ListItem, Typography } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import data from './data';
import './App.css';

function App() {
  const [count, setCount] = useState(50)
  return (
    <div className="app">
      <Slider
        value={count}
        valueLabelDisplay="on"
        min={0}
        max={1000}
        onChange={(event, value) => setCount(value)}
      />
      <Typography variant="caption">
        {count} items of {numberWithCommas(data.objects.length)} total found
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

function numberWithCommas(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default App;
