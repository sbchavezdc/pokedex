
"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(20),
    width: '75%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '100px', 
  [theme.breakpoints.up('sm')]: {
    minHeight: '100px', 
  },
}));

export default function SearchAppBar() {
  const [pokemonData, setPokemonData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchError, setSearchError] = React.useState(false);

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (searchValue.trim() === '') {
          setPokemonData([]);
          setSearchError(false);
          return;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`);
        setPokemonData([response.data]);
        setSearchError(false);
      } catch (error) {
        console.error('Error al buscar Pokémon:', error);
        setPokemonData([]);
        setSearchError(true);
      }
    };

    fetchPokemonData();
  }, [searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: '1px' }}>
        <CustomToolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar Pokémon "
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search>
        </CustomToolbar>
      </AppBar>
      {searchError && ( 
        <Typography variant="body1" color="error">
        No se encontraron pokemones. Por favor, intenta con otro nombre o tipo.
        </Typography>
      )}
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id}>
          <Typography variant="h6">{pokemon.name}</Typography>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ))}
    </Box>
  );
}
