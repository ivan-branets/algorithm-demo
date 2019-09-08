import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import FPSStats from 'react-fps-stats';
import { Slider, ListItem, Typography } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import data from './data';
import './App.css';

const folders = data.objects.map(item => ({ ...item, size: +item.size }));
const defaultSize = 50;
const initialState = findFoldersSlow(defaultSize);

function App() {
  const [foundFolders, setFoundFolders] = useState(initialState)
  return (
    <div className="app">
      <FPSStats />
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
  const { name, size, sameNameFolders } = data[index];

  return <ListItem style={style} key={index}>
    <ListItemIcon>
      <FolderIcon />
    </ListItemIcon>
    <ListItemText
      primary={name}
      secondary={`${size}Mb | Same Name: ${sameNameFolders && sameNameFolders.length}`}
    />
  </ListItem>
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function findFoldersSlow(size) {
  return folders.filter(folder => folder.size === size)
    .map(folder => ({
      ...folder,
      sameNameFolders: folders.filter(item => item.name === folder.name)
    }));
}

const mapBySize = folders.reduce((result, folder) => {
  if (result[folder.size] === undefined) {
    result[folder.size] = [];
  }

  result[folder.size].push(folder);
  return result;
}, {});

const mapByName = folders.reduce((result, folder) => {
  if (result[folder.name] === undefined) {
    result[folder.name] = [];
  }

  result[folder.name].push(folder);
  return result;
}, {});

function findFoldersFast(size) {
  return (mapBySize[size] || [])
    .map(folder => ({
      ...folder,
      sameNameFolders: mapByName[folder.name]
    }));
}

function numberWithCommas(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default App;
