import './Navbar.css';
import Auth from '@services/auth';

function Navbar(): JSX.Element {
  return (
    <nav className="navbar fixed-top bg-dark px-4">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/minerador/dashboard">
          MINGUARD
        </a>

        <button
          type="button"
          className="btn btn-secondary px-3 ml-auto"
          onClick={() => Auth.signOut()}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
