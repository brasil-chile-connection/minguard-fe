import { useState, useEffect } from 'react';
import './UserEdit.scoped.css';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@services/api';
import { toast } from 'react-toastify';

import { BaseInput, BaseButton, BaseSelect, BaseModal } from '@components';
import { UserEdit as UserEditType, User } from '@/types/user';
import { Gender } from '@/types/gender';

function UserEdit(): JSX.Element {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [genders, setGenders] = useState<Gender[]>([]);
  const [modals, setModals] = useState({
    submit: false,
  });

  const [user, setUser] = useState<User>();
  const [formData, setFormData] = useState<UserEditType>({
    acceptTc: true,
    firstName: '',
    genderId: 1,
    lastName: '',
    mobileNumber: '',
    mobilePrefix: '',
    password: undefined,
    passwordConfirm: undefined,
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

  const handleLoadUser = async (): Promise<void> => {
    try {
      const { data } = await api.get<User>(`user/${userId}`);
      setUser(data);
      setFormData({
        ...formData,
        ...{
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNumber: data.mobileNumber,
          mobilePrefix: data.mobilePrefix,
          genderId: data.gender.id,
        },
      });
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
    void handleLoadUser();
    void handleLoadGenders();
  }, []);

  const clearFormData = (): UserEditType => {
    const cpy = { ...formData };
    const keys = Object.keys(cpy) as (keyof typeof cpy)[];
    keys.forEach(key => {
      if (cpy[key] === '') {
        cpy[key] = undefined;
      }
    });
    setFormData(cpy);
    return cpy;
  };

  const checkPasswordFields = (): boolean => {
    if (formData.password && !formData.passwordConfirm) {
      toast.error('Você precisa confirmar a nova senha!', {
        position: 'bottom-center',
      });
      setModals({ ...modals, submit: false });
      return false;
    }

    if (!formData.password && formData.passwordConfirm) {
      toast.error('Você precisa digitar a nova senha!', {
        position: 'bottom-center',
      });
      setModals({ ...modals, submit: false });
      return false;
    }

    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!checkPasswordFields()) return;
    try {
      const data = clearFormData();
      await api.put(`user/${user?.id}`, data);

      toast.success('Usuário salvo com sucesso!.', {
        position: 'bottom-center',
      });

      navigate('/admin/equipe');
    } catch (e) {
      console.error(e);
      toast.error('Erro ao alterar usuário. Por favor tente novamente', {
        position: 'bottom-center',
      });
    }
  };

  const updateForm = (value: string | number, key: string): void => {
    setFormData(prev => {
      return { ...prev, [key]: value };
    });
  };

  const translateRole = (roleName?: string): string => {
    return (
      {
        WORKER: 'Minerador',
        ADMIN: 'Administrador',
      }[roleName || ''] || 'Usuário'
    );
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
            <h1 className="fw-bolder text-muted">
              Editar {translateRole(user?.role.name)}
            </h1>
          </div>
        </div>
        <div className="card p-4 ps-3">
          <div className="row ">
            <div className="col-12 mb-2">
              <h3>Informações Pessoais:</h3>
            </div>
            <div className="col-4">
              <BaseInput
                name="firstName"
                label="Nome*"
                value={formData.firstName}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4">
              <BaseInput
                name="lastName"
                label="Sobrenome*"
                value={formData.lastName}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4" />
            <div className="col-4">
              <BaseSelect
                name="genderId"
                label="Gênero*"
                value={formData.genderId}
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
                value={user?.email || ''}
                disabled
              />
            </div>
            <div className="col-4" />
            <div className="col-4" />
            <div className="col-4">
              <BaseInput
                name="password"
                label="Senha*"
                type="password"
                value={formData.password}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4">
              <BaseInput
                name="passwordConfirm"
                label="Confirmar Senha*"
                type="password"
                value={formData.passwordConfirm}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-4" />
            <div className="col-1">
              <BaseInput
                name="mobilePrefix"
                label="DDD*"
                value={formData.mobilePrefix}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-3">
              <BaseInput
                name="mobileNumber"
                label="Telefone*"
                value={formData.mobileNumber}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="d-flex col-12 justify-content-end">
              <BaseButton
                type="success"
                onClick={() => setModals({ ...modals, submit: true })}
              >
                <i className="fas fa-save" /> Salvar
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <BaseModal
        open={modals.submit}
        size="sm"
        onClose={() =>
          setModals(prev => {
            return { ...prev, submit: false };
          })
        }
      >
        <div className="modal-header">
          <span className="modal-title fw-bold">
            <i className="fas fa-user" /> Editar{' '}
            {translateRole(user?.role.name)}
          </span>
        </div>
        <div className="modal-body text-center align-middle p-4">
          <i className="fas fa-save fa-4x text-info" />
          <h4>Você confirma as alterações?</h4>
        </div>
        <div className="modal-footer gap-2">
          <BaseButton
            type="secondary"
            onClick={() =>
              setModals(prev => {
                return { ...prev, submit: false };
              })
            }
          >
            Cancelar
          </BaseButton>
          <BaseButton type="success" onClick={handleSubmit}>
            <i className="fas fa-check" /> Confirmar
          </BaseButton>
        </div>
      </BaseModal>
    </div>
  );
}

export default UserEdit;
