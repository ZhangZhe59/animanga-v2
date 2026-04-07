import React, { useEffect } from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { supabase } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN') {
                    navigate('/');
                }
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, [navigate]);

    return (
        <div className='login_container'>
            <div className='form'>
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#09bbad',
                                    brandAccent: '#057b76',
                                    defaultButtonBackground: '#8E05C2',
                                    defaultButtonBorder: 'black',
                                    dividerBackground: 'black',
                                },
                            },
                        },
                    }}
                    theme='dark'
                    socialLayout='horizontal'
                    socialButtonSize='tiny'
                    providers={['google', 'discord', 'github']}
                    redirectTo={window.location.origin}
                    magicLink={true}
                />
            </div>
        </div>
    );
}

export default Login;
