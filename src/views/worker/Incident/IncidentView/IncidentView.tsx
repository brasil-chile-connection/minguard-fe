import { useState, useEffect } from 'react';
import './IncidentView.scoped.css';

import { useNavigate, useParams } from 'react-router-dom';
import { scaleLinear } from 'd3-scale';

import api from '@services/api';
import { toast } from 'react-toastify';

import { BaseButton } from '@components';

import { Urgency } from '@/types/urgency';
import { Incident } from '@/types/incident';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function IncidentView(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { incidentId } = useParams<{ incidentId: string }>();
  const [incident, setIncident] = useState<Incident>();
  const [urgencyLevels, setUrgencyLevels] = useState<Urgency[]>([]);

  const colorScale = scaleLinear([0, 1, 2], ['green', 'yellow', 'red']);

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

  const handleLoadIncident = async (): Promise<void> => {
    try {
      const { data } = await api.get<Incident>(`incident/${incidentId}`);
      setIncident(data);
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
    void handleLoadIncident();
    void handleLoadUrgencyLevels();
    dispatch(setLoader(false));
  }, []);

  return (
    <div className="container-fluid p-2 px-4">
      <div className="row">
        <div className="col-12 py-2">
          <BaseButton
            type="secondary"
            onClick={() => navigate('/worker/dashboard')}
          >
            <i className="fas fa-arrow-left" /> Voltar
          </BaseButton>
        </div>
        <div className="col-12 mb-3">
          <h1 className="fw-bolder text-muted fs-1">Incidente</h1>
        </div>
        <div className="col-6">
          <h3 className="fw-bold m-0">Urgência</h3>
          <span className="d-flex gap-1 align-items-center">
            <span
              className="urgency-badge d-block"
              style={{
                backgroundColor: colorScale(
                  urgencyLevels.findIndex(
                    urg => urg.id === incident?.urgency.id,
                  ),
                ),
              }}
            />
            <p className="fs-5 m-0">{incident?.urgency.name}</p>
          </span>
        </div>
        <div className="col-6">
          <h3 className="fw-bold m-0">Criado em</h3>
          <p className="fs-5">
            {new Date(incident?.createdAt || '').toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="card p-4 ps-3">
        <div className="row">
          <div className="col-12 mb-3">
            <span>
              <h3>Título</h3>
              <p className="fs-5">{incident?.title}</p>
            </span>
          </div>
          <div className="col-12 mb-3">
            <h2>Localização</h2>
            <p className="fs-5">{incident?.location}</p>
          </div>
          <div className="col-12 mb-3">
            <h2>Descrição</h2>
            <p>{incident?.description}</p>
          </div>
          <div className="d-flex col-12 flex-column gap-4">
            <strong className="fs-5">Imagens do ocorrido</strong>
            {incident?.images.map((image, index) => (
              <div key={image}>
                <span className="fw-bold">Imagem {index + 1}</span>
                <a href={image} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image}
                    width="100%"
                    style={{ maxWidth: '450px' }}
                    aria-label={`Imagem ${index + 1} do incidente`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentView;
