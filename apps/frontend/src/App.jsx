import { useEffect, useState } from "react";
import ProfessorProfile from "./components/ProfessorProfile";
import DisciplinasList from "./components/DisciplinasList";
import StacksTable from "./components/StacksTable";
import ImageAndCarousel from "./components/ImageAndCarousel";
import Sidebar from "./components/Sidebar";
import VideoComponent from "./components/VideoComponent";
import InteractiveExamples from "./components/InteractiveExamples";

const API_URL = "http://localhost:8000/api/v1";

export default function App() {
  const [data, setData] = useState(null);
  const [cidades, setCidades] = useState([]);
  const [hoteis, setHoteis] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    setLoading(true);
    setError(null);

    try {
      const [sobreResponse, cidadesResponse, hoteisResponse] =
        await Promise.all([
          fetch(`${API_URL}/sobre`),
          fetch(`${API_URL}/cidades`),
          fetch(`${API_URL}/hoteis`),
        ]);

      if (!sobreResponse.ok) {
        throw new Error("Falha ao carregar os dados de /sobre");
      }

      if (!cidadesResponse.ok) {
        throw new Error("Falha ao carregar os dados de /cidades");
      }

      if (!hoteisResponse.ok) {
        throw new Error("Falha ao carregar os dados de /hoteis");
      }

      const [sobreJson, cidadesJson, hoteisJson] = await Promise.all([
        sobreResponse.json(),
        cidadesResponse.json(),
        hoteisResponse.json(),
      ]);

      setData(sobreJson);
      setCidades(cidadesJson);
      setHoteis(hoteisJson);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="bg-light min-vh-100 pb-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4 sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <span className="fs-4 fw-bold text-primary">Rede Hoteleira</span>
            <span className="ms-2 badge bg-secondary text-wrap small">
              Estágio II
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Abrir menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#api-json">
                  API
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#tutorial-components">
                  Tutorial
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-primary btn-sm px-3"
                type="button"
              >
                Login
              </button>

              <button className="btn btn-primary btn-sm px-3" type="button">
                Perfil
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <header className="mb-5 p-4 bg-white rounded shadow-sm">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 text-primary fw-bold">
                Sistemas de Informação - Estágio II
              </h1>

              <p className="lead text-secondary mb-0">
                Projeto Monorepo Base (Boilerplate de Inicialização)
              </p>
            </div>

            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={carregarDados}
                disabled={loading}
              >
                {loading ? "Carregando..." : "Recarregar Dados"}
              </button>
            </div>
          </div>

          <hr className="my-4" />

          <div className="row g-3">
            <div className="col-md-3 col-sm-6">
              <strong>Equipe:</strong>{" "}
              <span className="text-secondary ms-1">
                {data?.equipe || "Alpha"}
              </span>
            </div>

            <div className="col-md-3 col-sm-6">
              <strong>Professor:</strong>{" "}
              <span className="text-secondary ms-1">
                {data?.professor?.nome || "Ronildo Silva"}
              </span>
            </div>

            <div className="col-md-3 col-sm-6">
              <strong>Ano:</strong>{" "}
              <span className="text-secondary ms-1">{data?.ano || "2026"}</span>
            </div>

            <div className="col-md-3 col-sm-6">
              <strong>Semestre:</strong>{" "}
              <span className="text-secondary ms-1">
                {data?.semestre || "2"}
              </span>
            </div>
          </div>
        </header>

        {loading && (
          <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">
                Carregando dados da API...
              </span>
            </div>

            <p className="mt-3 text-secondary">
              Buscando informações do servidor...
            </p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger shadow-sm p-4" role="alert">
            <h4 className="alert-heading fw-bold">
              Erro de Conexão com o Backend!
            </h4>

            <p>
              Não foi possível obter os dados da API em <code>{API_URL}</code>.
            </p>

            <p className="mb-0">
              Verifique se o backend está rodando e se os serviços foram
              inicializados corretamente.
            </p>

            <hr />

            <p className="mb-0 small text-muted">Detalhe do erro: {error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="row g-4">
              <div className="col-md-3">
                <Sidebar />
              </div>

              <div className="col-md-9" id="tutorial-components">
                <ProfessorProfile professor={data.professor} />

                <DisciplinasList disciplinas={data.disciplinas} />

                <StacksTable stacks={data.stacks} />

                <ImageAndCarousel />

                <VideoComponent />

                <InteractiveExamples />
              </div>
            </div>

            <section id="api-json" className="mt-5">
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                  <h2 className="h5 mb-0">Dados consumidos da API</h2>
                </div>

                <div className="card-body">
                  <p className="text-secondary">
                    Os dados abaixo foram obtidos diretamente do Core Service
                    através das rotas de Cidade e Hotel.
                  </p>

                  <div className="mb-4">
                    <h3 className="h6">GET /api/v1/cidades</h3>

                    <pre className="bg-light border rounded p-3 overflow-auto">
                      <code>{JSON.stringify(cidades, null, 2)}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="h6">GET /api/v1/hoteis</h3>

                    <pre className="bg-light border rounded p-3 overflow-auto">
                      <code>{JSON.stringify(hoteis, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        <footer className="mt-5 py-4 border-top text-center text-muted">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} - Disciplina de Estágio II.
            Desenvolvido pela Equipe {data?.equipe || "Alpha"}.
          </p>
        </footer>
      </div>
    </div>
  );
}
