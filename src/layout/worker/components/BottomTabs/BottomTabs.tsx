import './BottomTabs.css';

import { useNavigate } from 'react-router-dom';

function BottomTabs(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="bottom-tabs bg-dark px-4 fixed-bottom">
      <div className="d-flex container-fluid justify-content-center align-items-center h-100">
        <button
          className="new-incident-btn"
          type="button"
          aria-label="Reportar novo incidente"
          onClick={() => navigate('/worker/incidentes/novo')}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
  );
}

export default BottomTabs;
