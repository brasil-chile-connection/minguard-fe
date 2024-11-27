import { useState, useEffect } from 'react';
import './IncidentForm.scoped.css';

import { useNavigate } from 'react-router-dom';
import { FilePondFile, FilePondInitialFile } from 'filepond';

import api from '@services/api';
import { toast } from 'react-toastify';

import {
  BaseButton,
  TextArea,
  BaseSelect,
  DropZone,
  BaseModal,
} from '@components';

import { Urgency } from '@/types/urgency';
import { IncidentForm as IncidentFormType } from '@/types/incident';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function IncidentForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [urgencyLevels, setUrgencyLevels] = useState<Urgency[]>([]);
  const [images, setImages] = useState<FilePondFile[]>([]);
  const [modals, setModals] = useState({
    submit: false,
  });

  const [formData, setFormData] = useState<IncidentFormType>({
    title: '',
    description: '',
    location: '',
    urgencyId: 0,
  });

  const handleLoadUrgencyLevels = async (): Promise<void> => {
    try {
      const { data } = await api.get<Urgency[]>('/urgency');
      setUrgencyLevels(data);
      setFormData(prev => {
        return { ...prev, urgencyId: data[0].id };
      });
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
    dispatch(setLoader(true));
    void handleLoadUrgencyLevels();
    dispatch(setLoader(false));
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

      await api.post(`incident/register`, data);

      toast.success('Incidente registrado com sucesso!.', {
        position: 'bottom-center',
      });

      navigate('/worker/dashboard');
    } catch (e) {
      console.error(e);
      toast.error(
        'Erro ao registrar novo incidente. Por favor tente novamente mais tarde.',
        {
          position: 'bottom-center',
        },
      );
    }
    dispatch(setLoader(false));
  };

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
            onClick={() => navigate('/worker/dashboard')}
          >
            <i className="fas fa-arrow-left" /> Voltar
          </BaseButton>
        </div>
        <div className="col-12 mb-3">
          <h1 className="fw-bolder text-muted fs-1">Reportar Incidente</h1>
        </div>
      </div>
      <div className="card p-4 ps-3">
        <div className="row">
          <div className="col-12 mb-3">
            <TextArea
              name="title"
              placeholder="Título"
              label="Título do Incidente"
              style={{ minHeight: '60px' }}
              onChange={e => updateForm(e.target.value, e.target.name)}
            />
          </div>
          <div className="col-12">
            <BaseSelect
              label="Urgência*"
              name="urgencyId"
              onChange={e => updateForm(Number(e.target.value), e.target.name)}
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
              style={{ minHeight: '90px' }}
              onChange={e => updateForm(e.target.value, e.target.name)}
            />
          </div>
          <div className="col-12 mb-3">
            <TextArea
              name="description"
              placeholder="Descrição"
              label="Descrição do Incidente"
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
              onChange={files => {
                setImages(files);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="d-flex col-12 justify-content-center my-3">
            <BaseButton
              type="success"
              size="lg"
              onClick={() =>
                setModals(prev => {
                  return { ...prev, submit: true };
                })
              }
            >
              <i className="fas fa-save" /> Registrar Incidente
            </BaseButton>
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
            <i className="fas fa-user" /> Registrar Incidente
          </span>
        </div>
        <div className="modal-body text-center align-middle p-4">
          <i className="fas fa-save fa-4x text-info" />
          <h4>Você confirma o registro de um novo incidente?</h4>
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

export default IncidentForm;
