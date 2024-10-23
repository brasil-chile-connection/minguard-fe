import './UserForm.scoped.css';
import { useNavigate } from 'react-router-dom';
import { BaseInput, BaseButton } from '@/components';

function UserForm(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-4">
      <div className="container m-0" style={{ maxWidth: '800px' }}>
        <div className="row">
          <div className="col-12 py-2">
            <BaseButton
              type="secondary"
              onClick={() => navigate('/admin/dashboard')}
            >
              <i className="fas fa-arrow-left" /> Voltar
            </BaseButton>
          </div>
          <div className="col-12 mb-4">
            <h1 className="fw-bolder text-muted">Novo Usuário</h1>
          </div>
        </div>
        <div className="card p-4 ps-3">
          <div className="row ">
            <div className="col-12 mb-2">
              <h3>Informações Pessoais:</h3>
            </div>
            <div className="col-4">
              <BaseInput label="Nome*" />
            </div>
            <div className="col-4">
              <BaseInput label="Sobrenome*" />
            </div>
            <div className="col-4" />
            <hr className="my-4" />
            <div className="col-12 mb-2">
              <h3>Conta:</h3>
            </div>
            <div className="col-4">
              <BaseInput label="Email*" />
            </div>
            <div className="col-4" />
            <div className="col-4" />
            <div className="col-4">
              <BaseInput label="Senha*" />
            </div>
            <div className="col-4">
              <BaseInput label="Confirmar Senha*" />
            </div>
            <div className="col-4" />
            <div className="col-1">
              <BaseInput label="DDD*" />
            </div>
            <div className="col-3">
              <BaseInput label="Telefone*" />
            </div>
          </div>
          <div className="row pt-3">
            <div className="d-flex col-12 justify-content-end">
              <BaseButton type="success">
                <i className="fas fa-save" /> Finalizar Cadastro
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
