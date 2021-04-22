import React from 'react';
import { Card } from 'antd';

import LoginForm from './LoginForm';
import {ReactComponent as AuthIllustration} from '../../../assets/auth_image.svg'
import "./login.css";

const Login = () => {
    return (
        <div className="login-wrapper">
            <Card className="login-card">
                <div className="login registration">
                    <div className="row login">
                        <div className="illustration-wrapper">
                            <AuthIllustration className="illustration"/>
                        </div>
                        <LoginForm />
                    </div>
                    <p>You don't have an account? Register <a href="#">HERE</a>!</p>
                </div>
            </Card>
        </div>
    );
}

export default Login;