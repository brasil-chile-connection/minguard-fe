import { useEffect, useState } from 'react';
import './TicketList.scoped.css';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import api from '@services/api';

import { BaseTable, BaseButton } from '@components';

import { Ticket, getTicketStatusColor } from '@/types/ticket';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function TicketList(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const handleLoadTickets = async (): Promise<void> => {
    try {
      const { data } = await api.get<Ticket[]>(`ticket`);
      setTickets(data);
    } catch (e) {
      console.error(e);
      toast.error(
        'Não foi possível carregar a lista de tickets. Tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      dispatch(setLoader(true));
      await handleLoadTickets();
      dispatch(setLoader(false));
    };

    void loadData();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="row h-100">
        <div className="col-12 h-md-100">
          <div className="table-container p-4">
            <h2>Histórico de Tickets</h2>
            <hr />
            <BaseTable
              className="table-bordered table-hover"
              style={{ maxHeight: '70%', overflowY: 'auto' }}
            >
              <thead>
                <tr className="table-light">
                  <th scope="col">#</th>
                  <th scope="col">Criado em</th>
                  <th scope="col" style={{ width: '82%' }}>
                    Title
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {new Date(ticket?.createdAt || '').toLocaleDateString()}
                    </td>
                    <td>{ticket.title}</td>
                    <td>
                      <div className="d-flex justify-content-center mt-1">
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor: getTicketStatusColor(
                              ticket?.status?.id || 0,
                            ),
                          }}
                        />{' '}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <BaseButton
                          aria-label="Visualizar Ticket"
                          size="sm"
                          type="primary"
                          onClick={() =>
                            navigate(`/admin/tickets/${ticket.id}`)
                          }
                        >
                          <i className="fas fa-eye" />
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
    </div>
  );
}

export default TicketList;
