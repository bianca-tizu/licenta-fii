import React from 'react';
import { Card } from 'antd';

import LoginForm from './login';
import RegistrationForm from './register';
import {ReactComponent as AuthIllustration} from '../../assets/auth_image.svg';
import './auth.css';

const Auth = () => {
    const [isRegistered,setIsRegistered] = React.useState(false);
    return (
        <div className="auth-wrapper">
            <Card className="auth-card">
                <div className="auth registration">
                    <div className="row auth">
                        <div className="illustration-wrapper">
                            <AuthIllustration className="illustration"/>
                        </div>
                        {isRegistered ? <RegistrationForm /> :<LoginForm />}
                    </div>
                    {!isRegistered && <p>You don't have an account? Register <span className="registerNavigate" role="button" onClick={() => {setIsRegistered(true)}}>HERE</span>!</p>}
                </div>
            </Card>
        </div>
    );
}

export default Auth;