import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Button, Menu } from 'antd';
import { PlusCircleOutlined, UserOutlined, RadiusSettingOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';

import SearchBar from './SearchBar';
import AddQuestion from './add-question';


const useStyles = makeStyles(() => ({
  backgroundHeader: {
    backgroundColor: '#fff'
  }
}))
const Header = () => {
    const classes = useStyles();
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);
    const [draft, setDraft] = useState('');

    const handleDraft = (values: any) => {
      console.log("Draft triggered", values);
      setIsQuestionVisible(false);
    }

    const handlePost = (values: any) => {
    //   const response = await createQuestion({variables: {sid: values.sid, email: values.email, password: values.password}});
    
    // if (response.data?.register.errors) {
    //   setError(response.data?.register.errors.map(err => err.message)[0]);
    // }
    
    // if(response.data?.register.user) {
    //   setError({});
    //   setIsRegistered(false);
    // }
    }

    return (
        <div>
            {/* <AppBar className={classes.backgroundHeader}> */}
                <Toolbar>
                  <Typography variant="h6"> FII Talks </Typography>
                  <SearchBar />
                  <Menu mode='horizontal'>
                    <Menu.Item key="newQuestion" icon={<PlusCircleOutlined />} onClick={() => setIsQuestionVisible(true)}/>
                    <Modal 
                      title="Add a question" 
                      visible={isQuestionVisible} 
                      keyboard
                      maskClosable
                      onCancel = {() => setIsQuestionVisible(false)}
                      footer={[
                        <Button key="post" type="primary" onClick={handlePost}>Post</Button>,
                        <Button key="draft" type="dashed" onClick={handleDraft}>Save draft</Button>
                      ]}>
                      <AddQuestion />
                    </Modal>
                      <Menu.Item key="drafts" icon={<RadiusSettingOutlined />} />
                      <Menu.Item key="profile" icon={<UserOutlined />} />
                  </Menu>
              </Toolbar>
            {/* </AppBar> */}
        </div>
    )
}

export default Header;