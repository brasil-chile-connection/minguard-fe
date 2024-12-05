import { useState, useEffect } from 'react';
import './TicketReview.scoped.css';

import { useNavigate, useParams } from 'react-router-dom';

import api from '@services/api';
import { toast } from 'react-toastify';

import { scaleLinear } from 'd3-scale';

import { Ticket, getTicketStatusColor } from '@/types/ticket';
import { Urgency } from '@/types/urgency';

import { BaseButton, BaseModal, TextArea } from '@components';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function TicketReview(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketUUID } = useParams<{ ticketUUID: string }>();
  const [ticket, setTicket] = useState<Ticket>();
  const [urgencyLevels, setUrgencyLevels] = useState<Urgency[]>([]);
  const [modals, setModals] = useState({
    completeTicket: false,
  });
  const [closureComment, setClosureComment] = useState('');

  const colorScale = scaleLinear([0, 1, 2], ['green', 'yellow', 'red']);

  const handleLoadTicket = async (): Promise<void> => {
    try {
      const { data } = await api.get<Ticket>(
        `/third-party/ticket/${ticketUUID}`,
      );

      setTicket(data);
    } catch (e) {
      console.error(e);
      toast.error(
        'Não foi possível carregar o ticket. Tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  const handleLoadUrgencyLevels = async (): Promise<void> => {
    try {
      const { data } = await api.get<Urgency[]>('/urgency');
      setUrgencyLevels(data);
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
    const loadData = async (): Promise<void> => {
      dispatch(setLoader(true));
      await handleLoadTicket();
      await handleLoadUrgencyLevels();
      dispatch(setLoader(false));
    };

    void loadData();
  }, []);

  const handleSubmit = async (): Promise<void> => {
    try {
      await api.patch(`/third-party/ticket/${ticketUUID}/complete`, {
        closureComment,
      });

      toast.success('Ticket finalizado com sucesso!', {
        position: 'bottom-center',
      });

      navigate('/');
    } catch (e) {
      console.error(e);
      toast.error(
        'Não foi possível finalizar o ticket. Tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
  };

  return (
    <div className="d-flex container-fluid p-4 justify-content-center">
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <div className="row">
          <div className="d-flex col-12 mb-3 align-items-center flex-column">
            <h1 className="fw-bolder text-muted fs-1">Ticket</h1>
            <h3 className="fw-bolder text-muted fs-3">{ticketUUID}</h3>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h3 className="fw-bold m-0">Status</h3>
            <span className="d-flex gap-1 align-items-center">
              <span
                className="d-block status-badge"
                style={{
                  backgroundColor: getTicketStatusColor(
                    ticket?.status?.id || 0,
                  ),
                }}
              />
              <p className="fs-5 m-0">{ticket?.status?.name}</p>
            </span>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h3 className="fw-bold m-0">Urgência</h3>
            <span className="d-flex gap-1 align-items-center">
              <span
                className="urgency-badge d-block"
                style={{
                  backgroundColor: colorScale(
                    urgencyLevels.findIndex(
                      urg => urg.id === ticket?.urgency?.id,
                    ),
                  ),
                }}
              />
              <p className="fs-5 m-0">{ticket?.urgency?.name}</p>
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
            {ticket?.images?.map((image, index) => (
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
        <div className="row py-2">
          <div className="d-flex col-12 justify-content-center">
            <BaseButton
              type="success"
              size="lg"
              onClick={() => {
                setModals(prev => {
                  return { ...prev, completeTicket: true };
                });
              }}
            >
              <i className="fas fa-check" /> Finalizar Ticket
            </BaseButton>
          </div>
        </div>
      </div>
      <BaseModal
        open={modals.completeTicket}
        size="sm"
        onClose={() =>
          setModals(prev => {
            return { ...prev, completeTicket: false };
          })
        }
      >
        <div className="modal-header">
          <span className="modal-title fw-bold">
            <i className="fas fa-ticket" /> Finalizar Ticket
          </span>
        </div>
        <div className="modal-body text-center align-middle p-4">
          <i className="fas fa-check fa-4x text-success" />
          <h4>Você confirma a finalização do ticket?</h4>
          <TextArea
            name="closureComment"
            label="Comentários sobre o serviço (opcional)"
            value={closureComment}
            style={{ minHeight: '120px' }}
            onChange={e => setClosureComment(e.target.value)}
          />
        </div>
        <div className="modal-footer gap-2">
          <BaseButton
            type="secondary"
            onClick={() =>
              setModals(prev => {
                return { ...prev, completeTicket: false };
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

export default TicketReview;
