import { useState, useEffect } from 'react';
import './Dashboard.scoped.css';

import { useNavigate } from 'react-router-dom';
import { scaleLinear } from 'd3-scale';

import { toast } from 'react-toastify';
import api from '@services/api';
import Auth from '@/services/auth';

import { BaseTable, BaseButton } from '@components';

import { Urgency } from '@/types/urgency';
import { Incident } from '@/types/incident';

import { useDispatch } from 'react-redux';
import { setLoader } from '@/store';

function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colorScale = scaleLinear([0, 1, 2], ['green', 'yellow', 'red']);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [urgencyLevels, setUrgencyLevels] = useState<Urgency[]>([]);

  const handleLoadIncidents = async (): Promise<void> => {
    try {
      const { data } = await api.get<Incident[]>(
        `incident/reporter/${Auth.getUserId()}`,
      );
      setIncidents(data);
    } catch (e) {
      console.error(e);
      toast.error(
        'Não foi possível carregar a lista de incidentes. Tente novamente mais tarde.',
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
      await handleLoadIncidents();
      await handleLoadUrgencyLevels();
      dispatch(setLoader(false));
    };

    void loadData();
  }, []);

  return (
    <div className="container-fluid p-2 px-3">
      <div className="row h-100">
        <div className="col-12">
          <div className="table-container p-3">
            <h2>Incidente Registrados</h2>
            <hr />
            <BaseTable
              className="table-bordered table-hover"
              style={{ maxHeight: '80%', overflowY: 'auto' }}
            >
              <thead>
                <tr className="table-light">
                  <th scope="col">#</th>
                  <th scope="col" style={{ width: '90%' }}>
                    Title
                  </th>
                  <th scope="col">Urgência</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident, index) => (
                  <tr key={incident.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{incident.title}</td>
                    <td>
                      <div className="d-flex justify-content-center mt-1">
                        <span
                          className="urgency-badge"
                          style={{
                            backgroundColor: colorScale(
                              urgencyLevels.findIndex(
                                urg => urg.id === incident?.urgency.id,
                              ),
                            ),
                          }}
                        />{' '}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <BaseButton
                          aria-label="Visualizar Incidente"
                          size="sm"
                          type="primary"
                          onClick={() =>
                            navigate(`/worker/incidentes/${incident.id}`)
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

export default Dashboard;
