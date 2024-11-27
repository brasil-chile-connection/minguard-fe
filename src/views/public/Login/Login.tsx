import { useState } from 'react';
import './Login.scoped.css';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '@services/api';
import Auth from '@services/auth';
import { BaseInput, BaseButton } from '@components';

import { LoginResponse } from '@/types/auth';
import { User } from '@/types/user';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (): Promise<void> => {
    dispatch(setLoader(true));
    try {
      Auth.clearToken();
      const { data } = await api.post<LoginResponse>('auth/login', {
        email,
        password,
      });
      Auth.signIn(data.token, [0], data.id);

      const { data: user } = await api.get<User>(`user/me`);
      Auth.storeUserInfo(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.role.name,
      );

      toast.success('Login realizado com sucesso!', {
        position: 'bottom-center',
      });

      navigate(`/${user.role.name.toLowerCase()}/dashboard`);
    } catch (e) {
      console.error(e);
      toast.error('Credenciais inválidas. Tente novamente.', {
        position: 'bottom-center',
      });
    }
    dispatch(setLoader(false));
  };

  return (
    <div className="d-flex container-fluid h-100 p-4">
      <div
        className="container my-auto mx-auto"
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <div className="d-flex flex-column align-items-center gap-3">
          <span className="text-center">
            <h1>Bem Vindo</h1>
            <h2>Minguard Manager</h2>
          </span>
          <div className="login-input-container bg-darkgrey text-center gap-3">
            <h3>Login</h3>
            <div>
              <BaseInput
                icon="fas fa-envelope"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <BaseInput
                icon="fas fa-lock"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <BaseButton disabled={!password || !email} onClick={handleLogin}>
              <i className="fas fa-right-to-bracket" /> Entrar
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
