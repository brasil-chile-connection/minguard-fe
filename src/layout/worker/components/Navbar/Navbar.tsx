import './Navbar.css';
import Auth from '@services/auth';

function Navbar(): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg bg-body-primary px-4">
      <div className="d-flex container-fluid">
        <a className="navbar-brand text-white" href="/minerador/dashboard">
          MINGUARD
        </a>
        <span className="d-flex align-items center gap-3">
          <button
            type="button"
            className="d-lg-none btn btn-secondary btn-sm px-3"
            onClick={() => Auth.signOut()}
          >
            Sair
          </button>
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
        </span>
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
        <button
          type="button"
          className="d-none d-lg-block btn btn-secondary px-3 ml-auto"
          onClick={() => Auth.signOut()}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
