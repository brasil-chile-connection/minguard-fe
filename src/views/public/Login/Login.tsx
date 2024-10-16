import './Login.scoped.css';

import { useNavigate } from 'react-router-dom';

import { BaseInput, BaseButton } from '@components';

function Login(): JSX.Element {
  const navigate = useNavigate();
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
              <BaseInput icon="fas fa-envelope" placeholder="Email" />
              <BaseInput icon="fas fa-lock" placeholder="Senha" />
            </div>
            <BaseButton onClick={() => navigate('/admin/dashboard')}>
              <i className="fas fa-right-to-bracket" /> Entrar
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
