import './Navbar.css';

function Navbar(): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg bg-body-primary px-4">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/admin/dashboard">
          MINGUARD
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-white" />{' '}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/admin/dashboard"
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/incidentes">
                Incidentes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/tickets">
                Tickets
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/tickets">
                Equipe
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
