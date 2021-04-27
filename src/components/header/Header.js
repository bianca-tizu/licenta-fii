import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Menu } from 'antd';
import { PlusCircleOutlined, UserOutlined} from '@ant-design/icons';

import SearchBar from './SearchBar';


const useStyles = makeStyles((theme) => ({
  backgroundHeader: {
    backgroundColor: '#fff'
  }
}))
const Header = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.backgroundHeader}>
                <Toolbar>
                  <Typography variant="h6"> FII Talks </Typography>
                  <SearchBar />
                  <Menu mode='horizontal'>
                    <Menu.Item key="newQuestion" icon={<PlusCircleOutlined />} />
                    <Menu.Item key="profile" icon={<UserOutlined />} />
                  </Menu>
              </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;