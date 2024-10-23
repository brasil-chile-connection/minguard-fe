import { useState, useEffect } from 'react';
import './UserForm.scoped.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

import api from '@services/api';
import { toast } from 'react-toastify';

import { BaseInput, BaseButton, BaseSelect } from '@components';
import { UserForm as UserFormType } from '@/types/user';
import { Gender } from '@/types/gender';
import { Role } from '@/types/role';

function UserForm(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [genders, setGenders] = useState<Gender[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [selectedRole, setSelectedRole] = useState(
    Number(searchParams.get('roleId')) || 0,
  );
  const [formData, setFormData] = useState<UserFormType>({
    email: '',
    acceptTc: true,
    firstName: '',
    genderId: -1,
    lastName: '',
    mobileNumber: '',
    mobilePrefix: '',
    password: '',
    passwordConfirm: '',
  });

  const handleLoadGenders = async (): Promise<void> => {
    try {
      const { data } = await api.get<Gender[]>('/gender');
      setGenders(data);
    } catch (e) {
      console.error(e);
      toast.error(
        'Erro ao carregar os dados da página. Tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  const handleLoadRoles = async (): Promise<void> => {
    try {
      const { data } = await api.get<Role[]>('/role');
      setRoles(data);
    } catch (e) {
      console.error(e);
      toast.error(
        'Erro ao carregar os dados da página. Tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  useEffect(() => {
    void handleLoadGenders();
    void handleLoadRoles();
  }, []);

  const handleSubmit = async (): Promise<void> => {
    try {
      const role = roles.find(r => r.id === selectedRole);
      await api.post(`user/${role!.name.toLowerCase()}/register`, formData);

      toast.success('Usuário criado com sucesso!.', {
        position: 'bottom-center',
      });

      navigate('/admin/equipe');
    } catch (e) {
      console.error(e);
      toast.error(
        'Erro ao criar novo usuário. Por favor tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  const updateForm = (value: string | number, key: string): void => {
    setFormData(prev => {
      return { ...prev, [key]: value };
    });
  };
  return (
    <div className="container-fluid p-4">
      <div className="container m-0" style={{ maxWidth: '800px' }}>
        <div className="row">
          <div className="col-12 py-2">
            <BaseButton
              type="secondary"
              onClick={() => navigate('/admin/equipe')}
            >
              <i className="fas fa-arrow-left" /> Voltar
            </BaseButton>
          </div>
          <div className="col-12 mb-3">
            <h1 className="fw-bolder text-muted">Novo Usuário</h1>
          </div>
        </div>
        <div className="card p-4 ps-3">
          <div className="row ">
            <div className="col-12">
              <BaseSelect
                label="Tipo*"
                value={selectedRole}
                onChange={e => setSelectedRole(Number(e.target.value))}
              >
                {roles.map(role => (
                  <option value={role.id} key={role.id}>
                    {role.name}
                  </option>
                ))}
              </BaseSelect>
            </div>
            <div className="col-12 mb-2">
              <h3>Informações Pessoais:</h3>
            </div>
            <div className="col-4">
              <BaseInput
                name="firstName"
                label="Nome*"
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4">
              <BaseInput
                name="lastName"
                label="Sobrenome*"
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4" />
            <div className="col-4">
              <BaseSelect
                name="genderId"
                label="Gênero*"
                onChange={e =>
                  updateForm(Number(e.target.value), e.target.name)
                }
              >
                {genders.map(gender => (
                  <option value={gender.id} key={gender.id}>
                    {gender.name}
                  </option>
                ))}
              </BaseSelect>
            </div>
            <hr className="my-4" />
            <div className="col-12 mb-2">
              <h3>Conta:</h3>
            </div>
            <div className="col-4">
              <BaseInput
                name="email"
                label="Email*"
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4" />
            <div className="col-4" />
            <div className="col-4">
              <BaseInput
                name="password"
                label="Senha*"
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4">
              <BaseInput
                name="passwordConfirm"
                label="Confirmar Senha*"
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4" />
            <div className="col-1">
              <BaseInput
                name="mobilePrefix"
                label="DDD*"
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-3">
              <BaseInput
                name="mobileNumber"
                label="Telefone*"
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="d-flex col-12 justify-content-end">
              <BaseButton type="success" onClick={handleSubmit}>
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
