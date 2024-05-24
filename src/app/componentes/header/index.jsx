"use client";

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchPokemonCategories } from '../../api';
import {  } from "./index.css";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pokemonCategories, setPokemonCategories] = useState([]);

  useEffect(() => {
    const getPokemonCategories = async () => {
      try {
        const categories = await fetchPokemonCategories();
        console.log('Fetched categories:', categories); // Agrega este log para verificar los datos
        setPokemonCategories(categories);
      } catch (error) {
        console.error('Error fetching pokemon categories:', error);
      }
    };

    getPokemonCategories();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" className="header-appbar">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            className="header-iconbutton"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          {pokemonCategories.map((category, index) => (
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
