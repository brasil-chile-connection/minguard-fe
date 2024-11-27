import { useState, useEffect } from 'react';
import './UserView.scoped.css';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@services/api';
import { toast } from 'react-toastify';

import { BaseInput, BaseButton, BaseSelect } from '@components';
import { User } from '@/types/user';
import { Gender } from '@/types/gender';
import { Role } from '@/types/role';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function UserView(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId: string }>();
  const [genders, setGenders] = useState<Gender[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [user, setUser] = useState<User>();

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

  const handleLoadUser = async (): Promise<void> => {
    try {
      const { data } = await api.get<User>(`user/${userId}`);
      setUser(data);
    } catch (e) {
      console.error(e);
      toast.error(
        'Erro ao carregar os dados do usuário. Tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    void handleLoadGenders();
    void handleLoadRoles();
    void handleLoadUser();
    dispatch(setLoader(false));
  }, []);

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
            <h1 className="fw-bolder text-muted">{`${user?.firstName || ''} ${user?.lastName || ''}`}</h1>
          </div>
        </div>
        <div className="card p-4 ps-3">
          <div className="row ">
            <div className="col-12">
              <BaseSelect label="Tipo*" value={user?.role.id || 0} disabled>
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
                value={user?.firstName}
                disabled
              />
            </div>
            <div className="col-4">
              <BaseInput
                name="lastName"
                label="Sobrenome*"
                value={user?.lastName}
                disabled
              />
            </div>
            <div className="col-4" />
            <div className="col-4">
              <BaseSelect
                name="genderId"
                label="Gênero*"
                value={user?.gender.id}
                disabled
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
                value={user?.email}
                disabled
              />
            </div>

            <div className="col-2">
              <BaseInput
                name="mobilePrefix"
                label="DDD*"
                value={user?.mobilePrefix}
                disabled
              />
            </div>
            <div className="col-3">
              <BaseInput
                name="mobileNumber"
                label="Telefone*"
                value={user?.mobileNumber}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
