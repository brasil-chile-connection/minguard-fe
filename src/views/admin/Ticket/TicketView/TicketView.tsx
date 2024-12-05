import { useState, useEffect } from 'react';
import './TicketView.scoped.css';

import { useNavigate, useParams } from 'react-router-dom';

import api from '@services/api';
import { toast } from 'react-toastify';

import { Ticket, getTicketStatusColor } from '@/types/ticket';

import { BaseButton } from '@components';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function TicketView(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<Ticket>();

  const handleLoadTicket = async (): Promise<void> => {
    try {
      const { data } = await api.get<Ticket>(`ticket/${ticketId}`);
      setTicket(data);
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
      await handleLoadTicket();
      dispatch(setLoader(false));
    };

    void loadData();
  }, []);

  return (
    <div className="container-fluid p-2 px-4">
      <div className="row">
        <div className="col-12 py-2">
          <BaseButton
            type="secondary"
            onClick={() => navigate('/admin/dashboard')}
          >
            <i className="fas fa-arrow-left" /> Voltar
          </BaseButton>
        </div>
        <div className="d-flex col-12 mb-3 justify-content-between">
          <h1 className="fw-bolder text-muted fs-1">Ticket</h1>
        </div>
        <div className="col-6 mb-3">
          <h3 className="fw-bold m-0">Status</h3>
          <span className="d-flex gap-1 align-items-center">
            <span
              className="d-block status-badge"
              style={{
                backgroundColor: getTicketStatusColor(ticket?.status?.id || 0),
              }}
            />
            <p className="fs-5 m-0">{ticket?.status.name}</p>
          </span>
        </div>

        <div className="col-6">
          <h3 className="fw-bold m-0">Criado em</h3>
          <p className="fs-5">
            {new Date(ticket?.createdAt || '').toLocaleString()}
          </p>
        </div>
      </div>
      <div className="card p-4 ps-3">
        <div className="row">
          <div className="col-12 mb-3">
            <span>
              <h3>Título</h3>
              <p className="fs-5">{ticket?.title}</p>
            </span>
          </div>
          <div className="col-12 mb-3">
            <span>
              <h3>Link </h3>
              <span className="d-flex gap-2 align-items-center">
                <BaseButton
                  size="sm"
                  type="info"
                  onClick={async () => {
                    await navigator.clipboard
                      .writeText(`https://minguard.netlify.app/third-party-access/tickets/
                  ${ticket?.identifier}`);

                    toast.info('Link copiado par a área de transferência!', {
                      position: 'bottom-center',
                    });
                  }}
                >
                  <i className="fas fa-copy" />
                </BaseButton>
                <a href={`/third-party-access/tickets/${ticket?.identifier}`}>
                  <p className="fs-5 m-0">
                    https://minguard.netlify.app/third-party-access/tickets/
                    {ticket?.identifier}
                  </p>
                </a>
              </span>
            </span>
          </div>
          <div className="col-12 mb-3">
            <h2>Localização</h2>
            <p className="fs-5">{ticket?.location}</p>
          </div>
          <div className="col-12 mb-3">
            <h2>Descrição</h2>
            <p>{ticket?.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <strong className="fs-5">Imagens do ocorrido</strong>
          </div>
          {ticket?.images.map((image, index) => (
            <div className="d-flex col-6 flex-column" key={image}>
              <div className="d-flex flex-column">
                <span className="fw-bold">Imagem {index + 1}</span>
                <a href={image} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image}
                    width="100%"
                    style={{ maxWidth: '450px' }}
                    aria-label={`Imagem ${index + 1} do ticket`}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TicketView;
