import React from 'react';
import {TaskType} from '../api/todolists-api';
import './App.css';
import {Menu} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  IconButton, LinearProgress,
  Toolbar,
  Typography
} from '@mui/material';
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

type AppPropsType = {
  demo?: boolean
}

const App = ({demo = false}: AppPropsType) => {

  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

  return (
    <div className="App">
      <ErrorSnackbar/>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Todolist
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {
          status === 'loading' && <LinearProgress />
        }
      </AppBar>
      <Container fixed>
        <TodolistsList todolists={[]} demo={demo}/>
      </Container>
    </div>
  )
}

export default App;