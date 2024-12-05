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
import { Incident } from '@/types/incident';
import { TicketForm } from '@/types/ticket';

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
  const [formData, setFormData] = useState<TicketForm>({
    title: '',
    description: '',
    location: '',
    urgencyId: 0,
    responsibleId: 1,
    incidentId: Number(incidentId) || 0,
    statusId: 1,
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
        ...formData,
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

  const handleLoadIncidentImages = async (): Promise<void> => {
    if (!incident) return;

    const newImages = await Promise.all(
      incident.images.map(async (imageUrl, index) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new File([blob], `image-${index}.jpg`, { type: blob.type });
      }),
    );
    setImages(newImages as unknown as FilePondFile[]);
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      dispatch(setLoader(true));
      await handleLoadIncident();
      await handleLoadUrgencyLevels();
      dispatch(setLoader(false));
    };

    void loadData();
  }, []);

  const handleSubmit = async (): Promise<void> => {
    dispatch(setLoader(true));
    try {
      const data = new FormData();
      const json = JSON.stringify(formData);
      const blob = new Blob([json], {
        type: 'application/json',
      });
      data.append('request', blob);

      const files: File[] = images.map(filePondFile => {
        const { file } = filePondFile;
        return new File([file], filePondFile.filename, {
          type: file.type,
          lastModified: file.lastModified,
        });
      });

      files.forEach(image => {
        if (image instanceof File) {
          data.append('images', image);
        } else {
          console.error('Imagem inválida:', image);
        }
      });

      const { data: postResponse } = await api.post<{ id: number }>(
        `ticket`,
        data,
      );

      toast.success('Ticket registrado com sucesso!.', {
        position: 'bottom-center',
      });

      navigate(`/admin/tickets/${postResponse.id}`);
    } catch (e) {
      console.error(e);
      toast.error(
        'Erro ao registrar novo ticket. Por favor tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
    dispatch(setLoader(false));
  };

  useEffect(() => {
    if (incident && incident.images.length) {
      void handleLoadIncidentImages();
    }
  }, [incident]);

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
          <BaseButton
            type="success"
            onClick={() => {
              setModals(prev => {
                return { ...prev, submitTicket: true };
              });
            }}
          >
            <i className="fas fa-save" /> Salvar
          </BaseButton>
        </div>
      </BaseModal>
      <BaseModal
        open={modals.submitTicket}
        size="sm"
        onClose={() =>
          setModals(prev => {
            return { ...prev, submitTicket: false };
          })
        }
      >
        <div className="modal-header">
          <span className="modal-title fw-bold">
            <i className="fas fa-ticket" /> Novo Ticket
          </span>
        </div>
        <div className="modal-body text-center align-middle p-4">
          <i className="fas fa-save fa-4x text-success" />
          <h4>Você confirma a criação do ticket?</h4>
        </div>
        <div className="modal-footer gap-2">
          <BaseButton
            type="secondary"
            onClick={() =>
              setModals(prev => {
                return { ...prev, submitTicket: false };
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

export default IncidentView;
