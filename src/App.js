import React from 'react';
import { Slider, List, ListItem, Typography } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import data from './data';
import './App.css';

function App() {
  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];

  return (
    <div className="app">
      <Slider
        defaultValue={30}
        valueLabelDisplay="on"
        min={0}
        max={1000}

      />
      <Typography variant="caption">
        5 items of {numberWithCommas(data.objects.length)} total found
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
