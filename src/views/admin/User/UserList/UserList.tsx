import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.scoped.css';

import { toast } from 'react-toastify';
import api from '@services/api';

import { BaseTable, BaseButton, BaseModal } from '@components';
import { User } from '@/types/user';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function UserList(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [modals, setModals] = useState({
    deleteUser: {
      userId: 0,
      userRole: '',
      open: false,
    },
  });

  const loadUsers = async (): Promise<void> => {
    try {
      const { data } = await api.get<User[]>('user');
      setUsers(data);
    } catch (e) {
      console.error(e);
      toast.error(
        'Não foi possível carregar a lista de usuários. Tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    void loadUsers();
    dispatch(setLoader(false));
  }, []);

  const handleDeleteUser = async (): Promise<void> => {
    dispatch(setLoader(true));
    try {
      await api.delete(`/user/${modals.deleteUser.userId}`);
      setUsers(users.filter(user => user.id !== modals.deleteUser.userId));

      setModals({
        ...modals,
        deleteUser: { ...modals.deleteUser, open: false },
      });
      toast.success('Usuário deletado com sucesso!', {
        position: 'bottom-center',
      });
    } catch (e) {
      console.error(e);
      toast.error(
        'Erro ao deletar usuário. Por favor tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
    dispatch(setLoader(true));
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
    <div className="container-fluid h-100 p-3 p-md-4">
      <div className="row h-100">
        <div className="d-flex col-md-6 h-md-100 flex-column">
          <div className="table-container p-4">
            <div className="d-flex w-100 justify-content-between">
              <h3>Administradores</h3>
              <BaseButton
                type="success"
                onClick={() => navigate('/admin/usuarios/novo?roleId=2')}
              >
                <i className="fas fa-plus" />
                {'  '}Novo Admin
              </BaseButton>
            </div>
            <hr />
            <BaseTable
              className="table-bordered table-hover"
              style={{ maxHeight: '80%', overflowY: 'auto' }}
            >
              <thead>
                <tr className="table-light">
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col">Nome</th>
                  <th scope="col">Sobrenome</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(user => user.role.id === 2)
                  .map((user, index) => (
                    <tr key={user.id}>
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{`(${user.mobilePrefix} ${user.mobileNumber})`}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <BaseButton
                            aria-label="Visualizar Usuário"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/usuarios/${user.id}`)
                            }
                          >
                            <i className="fas fa-eye" />
                          </BaseButton>
                          <BaseButton
                            aria-label="Editar Usuário"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/usuarios/${user.id}/editar`)
                            }
                          >
                            <i className="fas fa-edit text-info" />
                          </BaseButton>
                          <BaseButton
                            aria-label="Excluir Usuário"
                            size="sm"
                            onClick={() => {
                              setModals({
                                ...modals,
                                deleteUser: {
                                  userId: user.id,
                                  userRole: user.role.name,
                                  open: true,
                                },
                              });
                            }}
                          >
                            <i className="fas fa-trash text-danger" />
                          </BaseButton>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </BaseTable>
          </div>
        </div>
        <div className="d-flex col-md-6 h-md-100 flex-column">
          <div className="table-container p-4">
            <div className="d-flex w-100 justify-content-between">
              <h3>Mineradores</h3>
              <BaseButton
                type="success"
                onClick={() => navigate('/admin/usuarios/novo?roleId=1')}
              >
                <i className="fas fa-plus" />
                {'  '}Novo Minerador
              </BaseButton>
            </div>
            <hr />
            <BaseTable
              className="table-bordered table-hover"
              style={{ maxHeight: '80%', overflowY: 'auto' }}
            >
              <thead>
                <tr className="table-light">
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col">Nome</th>
                  <th scope="col">Sobrenome</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(user => user.role.id === 1)
                  .map((user, index) => (
                    <tr key={user.id}>
                      <th
                        scope="row"
                        className="text-center vertical-align-middle"
                      >
                        {index + 1}
                      </th>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{`(${user.mobilePrefix} ${user.mobileNumber})`}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <BaseButton
                            aria-label="Visualizar Usuário"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/usuarios/${user.id}`)
                            }
                          >
                            <i className="fas fa-eye" />
                          </BaseButton>
                          <BaseButton
                            aria-label="Editar Usuário"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/usuarios/${user.id}/editar`)
                            }
                          >
                            <i className="fas fa-edit text-info" />
                          </BaseButton>
                          <BaseButton
                            aria-label="Excluir Usuário"
                            size="sm"
                            onClick={() => {
                              setModals({
                                ...modals,
                                deleteUser: {
                                  userId: user.id,
                                  userRole: user.role.name,
                                  open: true,
                                },
                              });
                            }}
                          >
                            <i className="fas fa-trash text-danger" />
                          </BaseButton>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </BaseTable>
          </div>
        </div>
      </div>
      <BaseModal
        open={modals.deleteUser.open}
        size="sm"
        onClose={() =>
          setModals(prev => {
            return {
              ...prev,
              deleteUser: {
                ...prev.deleteUser,
                open: false,
              },
            };
          })
        }
      >
        <div className="modal-header">
          <span className="modal-title fw-bold">
            <i className="fas fa-user" /> Excluir{' '}
            {translateRole(modals.deleteUser.userRole)}
          </span>
        </div>
        <div className="modal-body text-center align-middle p-4">
          <i className="fas fa-trash fa-4x text-danger" />
          <h4>Você confirma a exclusão deste usuário?</h4>
        </div>
        <div className="modal-footer gap-2">
          <BaseButton
            type="secondary"
            onClick={() =>
              setModals(prev => {
                return {
                  ...prev,
                  deleteUser: {
                    ...prev.deleteUser,
                    open: false,
                  },
                };
              })
            }
          >
            Cancelar
          </BaseButton>
          <BaseButton type="success" onClick={handleDeleteUser}>
            <i className="fas fa-check" /> Confirmar
          </BaseButton>
        </div>
      </BaseModal>
    </div>
  );
}

export default UserList;
