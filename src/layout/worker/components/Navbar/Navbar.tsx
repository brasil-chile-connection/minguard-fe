import './Navbar.css';

function Navbar(): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg bg-body-primary px-4">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/minerador/dashboard">
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
                href="/minerador/dashboard"
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/minerador/incidentes">
                Incidentes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
