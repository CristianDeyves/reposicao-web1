import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EnderecoManagement from "./pages/EnderecoManagement";
import FabricanteVacinaManagement from "./pages/FabricanteVacinaManagement";
import ProfissionalDeSaudeManagement from "./pages/ProfissionalDeSaudeManagement";
import VaccinationManagement from "./pages/VaccinationManagement";
import SupportPage from "./pages/SupportPage";
import RequestListPage from "./pages/RequestListPage";
import PacienteManagement from "./pages/PacienteManagement"; // Importando a nova página
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul className="flex justify-center space-x-8 p-4">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/enderecos"
                className="text-gray-700 hover:text-blue-500"
              >
                Gerenciar Endereços
              </Link>
            </li>
            <li>
              <Link
                to="/fabricantes"
                className="text-gray-700 hover:text-blue-500"
              >
                Gerenciar Fabricantes
              </Link>
            </li>
            <li>
              <Link
                to="/profissionais"
                className="text-gray-700 hover:text-blue-500"
              >
                Gerenciar Profissionais de Saúde
              </Link>
            </li>
            <li>
              <Link
                to="/vacinacoes"
                className="text-gray-700 hover:text-blue-500"
              >
                Gerenciar Vacinações
              </Link>
            </li>
            <li>
              <Link
                to="/pacientes" // Adicionando a nova rota para pacientes
                className="text-gray-700 hover:text-blue-500"
              >
                Gerenciar Pacientes
              </Link>
            </li>
            <li>
              <Link to="/suporte" className="text-gray-700 hover:text-blue-500">
                Suporte
              </Link>
            </li>
            <li>
              <Link
                to="/solicitacoes"
                className="text-gray-700 hover:text-blue-500"
              >
                Solicitações
              </Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/enderecos" element={<EnderecoManagement />} />
            <Route
              path="/fabricantes"
              element={<FabricanteVacinaManagement />}
            />
            <Route
              path="/profissionais"
              element={<ProfissionalDeSaudeManagement />}
            />
            <Route path="/vacinacoes" element={<VaccinationManagement />} />
            <Route path="/pacientes" element={<PacienteManagement />} /> {/* Nova rota adicionada */}
            <Route path="/suporte" element={<SupportPage />} />
            <Route path="/solicitacoes" element={<RequestListPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
