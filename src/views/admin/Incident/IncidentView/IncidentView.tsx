import { useState, useEffect } from 'react';
import './IncidentView.scoped.css';

import { useNavigate, useParams } from 'react-router-dom';
import { scaleLinear } from 'd3-scale';

import api from '@services/api';
import { toast } from 'react-toastify';

import {
  BaseButton,
  BaseModal,
  TextArea,
  BaseSelect,
  DropZone,
} from '@components';

import { FilePondFile, FilePondInitialFile } from 'filepond';

import { Urgency } from '@/types/urgency';
import { IncidentForm, Incident } from '@/types/incident';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function IncidentView(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { incidentId } = useParams<{ incidentId: string }>();
  const [incident, setIncident] = useState<Incident>();
  const [urgencyLevels, setUrgencyLevels] = useState<Urgency[]>([]);
  const [images, setImages] = useState<FilePondFile[]>([]);
  const [modals, setModals] = useState({
    ticketForm: false,
    submitTicket: false,
  });

  /* TODO: Modificar para TicketForm */
  const [formData, setFormData] = useState<IncidentForm>({
    title: '',
    description: '',
    location: '',
    urgencyId: 0,
  });

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
      setFormData({
        description: data.description,
        location: data.location,
        title: data.title,
        urgencyId: data.urgency.id,
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
    dispatch(setLoader(true));
    void handleLoadIncident();
    void handleLoadUrgencyLevels();
    dispatch(setLoader(false));
  }, []);

  const updateForm = (value: string | number, key: string): void => {
    setFormData(prev => {
      return { ...prev, [key]: value };
    });
  };

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
          <h1 className="fw-bolder text-muted fs-1">Incidente</h1>
          <BaseButton
            type="success"
            onClick={() => setModals({ ...modals, ticketForm: true })}
          >
            <i className="fas fa-ticket" /> Abrir Ticket
          </BaseButton>
        </div>
        <div className="col-12 mb-3">
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
          <h3 className="fw-bold m-0">Criado por</h3>
          <a href={`/admin/usuarios/${incident?.reporter.id}`}>
            <p className="fs-5">
              {`${incident?.reporter.firstName} ${incident?.reporter.lastName}`}
            </p>
          </a>
        </div>
        <div className="col-6">
          <h3 className="fw-bold m-0">Criado em</h3>
          <p className="fs-5">
            {new Date(incident?.createdAt || '').toLocaleString()}
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
        </div>
        <div className="row">
          <div className="col-12">
            <strong className="fs-5">Imagens do ocorrido</strong>
          </div>
          {incident?.images.map((image, index) => (
            <div className="d-flex col-6 flex-column" key={image}>
              <div className="d-flex flex-column">
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
            </div>
          ))}
        </div>
      </div>
      <BaseModal
        open={modals.ticketForm}
        size="xl"
        onClose={() =>
          setModals(prev => {
            return { ...prev, ticketForm: false };
          })
        }
      >
        <div className="modal-header">
          <span className="modal-title fw-bold">
            <i className="fas fa-ticket" /> Novo Ticket
          </span>
        </div>
        <div className="modal-body text-center align-middle p-4">
          <div className="row">
            <div className="col-12 mb-3">
              <TextArea
                name="title"
                placeholder="Título"
                value={formData.title}
                label="Título do Incidente"
                style={{ minHeight: '60px' }}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-12">
              <BaseSelect
                label="Urgência*"
                name="urgencyId"
                value={formData.urgencyId}
                onChange={e =>
                  updateForm(Number(e.target.value), e.target.name)
                }
              >
                {urgencyLevels.map(level => (
                  <option value={level.id} key={level.id}>
                    {level.name}
                  </option>
                ))}
              </BaseSelect>
            </div>
            <div className="col-12 mb-3">
              <TextArea
                name="location"
                placeholder="Descrição"
                label="Descrição da localização"
                value={formData.location}
                style={{ minHeight: '90px' }}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-12 mb-3">
              <TextArea
                name="description"
                placeholder="Descrição"
                label="Descrição do Incidente"
                value={formData.description}
                style={{ minHeight: '120px' }}
                onChange={e => updateForm(e.target.value, e.target.name)}
              />
            </div>
            <div className="col-12">
              <strong className="fs-5">Imagens do ocorrido</strong>
              <DropZone
                files={images as unknown as FilePondInitialFile[]}
                labelIdle='<div><strong><span class="filepond--label-action btn btn-secondary">Selecione imagens...</span></strong>'
                acceptedFileTypes={['image/*']}
                allowDrop
                allowMultiple
                allowImageEdit
                imagePreviewHeight={100}
                onChange={files => {
                  setImages(files);
                }}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer gap-2">
          <BaseButton
            type="secondary"
            onClick={() =>
              setModals(prev => {
                return { ...prev, ticketForm: false };
              })
            }
          >
            Cancelar
          </BaseButton>
          <BaseButton type="success" onClick={() => {}}>
            <i className="fas fa-save" /> Salvar
          </BaseButton>
        </div>
      </BaseModal>
    </div>
  );
}

export default IncidentView;
