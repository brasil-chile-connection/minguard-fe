import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.scoped.css';

import { toast } from 'react-toastify';
import api from '@services/api';

import { BaseTable, BaseButton } from '@components';
import { User } from '@/types/user';

function UserList(): JSX.Element {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

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
    void loadUsers();
  }, []);
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
                      <td className="d-flex gap-2">
                        <BaseButton aria-label="Visualizar Usuário" size="sm">
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
                        <BaseButton aria-label="Excluir Usuário" size="sm">
                          <i className="fas fa-trash text-danger" />
                        </BaseButton>
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
                      <td className="d-flex gap-2">
                        <BaseButton aria-label="Visualizar Usuário" size="sm">
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
                        <BaseButton aria-label="Excluir Usuário" size="sm">
                          <i className="fas fa-trash text-danger" />
                        </BaseButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </BaseTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
