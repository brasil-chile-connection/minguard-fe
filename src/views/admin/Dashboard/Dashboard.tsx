import { useEffect, useState } from 'react';
import './Dashboard.scoped.css';

import { useNavigate } from 'react-router-dom';
import { scaleLinear } from 'd3-scale';

import { toast } from 'react-toastify';
import api from '@services/api';

import { BaseTable, BaseButton } from '@components';

import { Urgency } from '@/types/urgency';
import { Incident } from '@/types/incident';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from 'recharts';

import { chart1Data, chart2Data, chart3Data } from './data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const colorScale = scaleLinear([0, 1, 2], ['green', 'yellow', 'red']);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [urgencyLevels, setUrgencyLevels] = useState<Urgency[]>([]);

  const handleLoadIncidents = async (): Promise<void> => {
    try {
      const { data } = await api.get<Incident[]>(`incident`);
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
    void handleLoadIncidents();
    void handleLoadUrgencyLevels();
  }, []);
  return (
    <div className="container-fluid dashboard h-100 p-3 p-md-4">
      <div className="row h-100 gap-4 gap-md-0">
        <div className="d-flex col-md-6 h-md-100 flex-column gap-4">
          <div className="table-container p-4">
            <h2>Novos Incidentes</h2>
            <hr />
            <BaseTable
              className="table-bordered table-hover"
              style={{ maxHeight: '70%', overflowY: 'auto' }}
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
                            navigate(`/admin/incidentes/${incident.id}`)
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
          <div className="table-container p-4">
            <h2>Últimos Tickets</h2>
            <hr />
            <BaseTable
              className="table-bordered table-hover"
              style={{ maxHeight: '80%', overflowY: 'auto' }}
            >
              <thead>
                <tr className="table-light">
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pedro</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pedro</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pedro</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pedro</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pedro</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pedro</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Pedro</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </BaseTable>
          </div>
        </div>
        <div className="d-flex col-md-6 h-md-100 flex-column">
          <div className="d-flex table-container p-3 flex-column">
            <h2>Histórico de Incidentes</h2>
            <hr />
            <div className="row px-2 pb-2 gap-4 gap-md-0" style={{ flex: 1 }}>
              <div className="col-md-6">
                <div className="chart-card bg-light rounded p-3">
                  <h3 className="text-center">Gráfico de Linha</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={chart1Data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        strokeWidth={4}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="#82ca9d"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-6">
                <div className="chart-card bg-light rounded p-3">
                  <h3 className="text-center">Gráfico de Pizza</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={chart2Data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        fill="#8884d8"
                        label
                      >
                        {chart2Data.map((entry, index) => (
                          <Cell
                            key={`cell-${entry.name}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="row px-2 pt-3 gap-4 gap-md-0" style={{ flex: 1 }}>
              <div className="col-md-6">
                <div className="chart-card bg-light rounded p-3">
                  <h3 className="text-center">Gráfico de Linha</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={chart1Data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        strokeWidth={4}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="#82ca9d"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-6">
                <div className="chart-card bg-light rounded p-3">
                  <h3 className="text-center">Gráfico de Barras</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={chart3Data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="pv"
                        fill="#8884d8"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                      />
                      <Bar
                        dataKey="uv"
                        fill="#82ca9d"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
