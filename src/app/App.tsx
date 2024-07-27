import React, {useCallback, useEffect} from 'react';
import {TaskType} from '../api/todolists-api';
import './App.css';
import {Menu} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from '@mui/material';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Outlet} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from "../features/Login/auth-reducer";


export type TasksStateType = {
  [key: string]: Array<TaskType>
};

type AppPropsType = {
  demo?: boolean
};

const App = ({demo = false}: AppPropsType) => {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC())
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])


  if (!isInitialized) {
    return (
      <div style={{
        position: 'fixed', top: '30%',
        textAlign: 'center', width: '100%'
      }}>
        <CircularProgress/>
      </div>
    )
  }

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
          {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
        </Toolbar>
        {
          status === 'loading' && <LinearProgress/>
        }
      </AppBar>
      <Container fixed>
        {/*<TodolistsList todolists={[]} demo={demo}/>*/}
        <Outlet/>
      </Container>
    </div>
  )
}

export default App;