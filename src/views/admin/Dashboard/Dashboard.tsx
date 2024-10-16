import './Dashboard.scoped.css';

import { BaseTable } from '@components';

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
  return (
    <div className="container-fluid h-100 p-3 p-md-4">
      <div className="row h-100 gap-4 gap-md-0">
        <div className="d-flex col-md-6 h-md-100 flex-column gap-4">
          <div className="table-container p-4">
            <h2>Novos Incidentes</h2>
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
