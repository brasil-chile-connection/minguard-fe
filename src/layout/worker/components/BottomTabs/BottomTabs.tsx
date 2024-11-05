import './BottomTabs.css';

function BottomTabs(): JSX.Element {
  return (
    <div className="bottom-tabs bg-dark px-4 fixed-bottom">
      <div className="d-flex container-fluid justify-content-center align-items-center h-100">
        <button
          className="new-incident-btn"
          type="button"
          aria-label="Reportar novo incidente"
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
  );
}

export default BottomTabs;
