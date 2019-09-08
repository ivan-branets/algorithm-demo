import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import { Slider, ListItem, Typography } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import data from './data';
import './App.css';

const folders = data.objects.map(item => ({ ...item, size: +item.size }));
const defaultSize = 50;

function App() {
  const [foundFolders, setFoundFolders] = useState(findFoldersSlow(defaultSize))
  return (
    <div className="app">
      <Slider
        className="slider-slow"
        defaultValue={defaultSize}
        valueLabelDisplay="on"
        min={0}
        max={1000}
        onChange={(event, value) => {
          const found = findFoldersSlow(value);
          setFoundFolders(found);
        }}
      />
      <Slider
        className="slider-fast"
        defaultValue={defaultSize}
        valueLabelDisplay="on"
        min={0}
        max={1000}
        onChange={(event, value) => {
          const found = findFoldersFast(value);
          setFoundFolders(found);
        }}
      />
      <Typography variant="caption">
        {foundFolders.length} items of {numberWithCommas(folders.length)} total found
      </Typography>
      <FixedSizeList itemData={foundFolders} height={200} width={360} itemSize={50} itemCount={foundFolders.length}>
        {Row}
      </FixedSizeList>
    </div>
  );
}

function Row(props) {
  const { data, index, style } = props;
  const { name, size } = data[index];

  return <ListItem style={style} key={index}>
    <ListItemIcon>
      <FolderIcon />
    </ListItemIcon>
    <ListItemText
      primary={name}
      secondary={`${size}Mb`}
    />
  </ListItem>
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function findFoldersSlow(size) {
  return folders.filter(folder => folder.size === size);
}

const map = folders.reduce((result, folder) => {
  if (result[folder.size] === undefined) {
    result[folder.size] = [];
  }

  result[folder.size].push(folder);
  return result;
}, {});

function findFoldersFast(size) {
  return map[size] || [];
}

function numberWithCommas(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default App;
