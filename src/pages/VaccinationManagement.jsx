import { useState, useEffect } from "react";
import {
  getVacinacoes,
  deleteVacinacao,
  updateVacinacao,
  createVacinacao,
  getPacientes,
  getProfissionaisDeSaude,
  getFabricantesVacina,
} from "../services/api";
import ActionButton from "../components/ActionButton";
import VaccinationForm from "../components/VaccinationForm";

function VaccinationManagement() {
  const [vacinacoes, setVacinacoes] = useState([]);
  const [editingVacinacao, setEditingVacinacao] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const vacinacaoData = await getVacinacoes();
      const pacientesData = await getPacientes();
      const profissionaisData = await getProfissionaisDeSaude();
      const fabricantesData = await getFabricantesVacina();
      setVacinacoes(vacinacaoData || []);
      setPacientes(pacientesData || []);
      setProfissionais(profissionaisData || []);
      setFabricantes(fabricantesData || []);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteVacinacao(id);
    setVacinacoes(vacinacoes.filter((vacinacao) => vacinacao.id !== id));
  };

  const handleEdit = (vacinacao) => {
    setEditingVacinacao(vacinacao);
    setIsFormVisible(true);
  };

  const handleUpdate = async (updatedVacinacao) => {
    await updateVacinacao(editingVacinacao.id, updatedVacinacao);
    setVacinacoes(
      vacinacoes.map((vacinacao) =>
        vacinacao.id === editingVacinacao.id ? updatedVacinacao : vacinacao
      )
    );
    setEditingVacinacao(null);
    setIsFormVisible(false);
  };

  const handleCreate = async (newVacinacao) => {
    const createdVacinacao = await createVacinacao(newVacinacao);
    setVacinacoes([
      ...vacinacoes,
      { id: createdVacinacao.name, ...newVacinacao },
    ]);
    setIsFormVisible(false);
  };

  const startCreating = () => {
    setEditingVacinacao(null);
    setIsFormVisible(true);
  };

  return (
    <div className="h-full bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Gerenciar Vacinações</h1>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={startCreating}
          >
            {editingVacinacao ? "Atualizar Vacinação" : "Cadastrar Vacinação"}
          </button>

          {isFormVisible && (
            <div className="mt-4">
              <VaccinationForm
                onSubmit={editingVacinacao ? handleUpdate : handleCreate}
                formData={editingVacinacao || {}}
                pacientes={pacientes}
                profissionais={profissionais}
                fabricantes={fabricantes}
              />
              <ActionButton
                label={"Cancelar"}
                onClick={() => setIsFormVisible(false)}
                color={"gray"}
              />
            </div>
          )}

          <ul className="mt-6">
            {vacinacoes.map((vacinacao) => (
              <li
                key={vacinacao.id}
                className="text-lg flex justify-between items-center mb-4"
              >
                <span className="flex-1 text-left mr-4">
                  Paciente: {vacinacao.paciente?.nome} {vacinacao.paciente?.sobrenome} - Aplicado por: {vacinacao.aplicador?.nomeCompleto} - Vacina: {vacinacao.fabricante?.tipoVacina} - Data da aplicação: {new Date(vacinacao.data).toLocaleDateString()}
                </span>
                <ActionButton
                  label={"Deletar"}
                  onClick={() => handleDelete(vacinacao.id)}
                  color={"red"}
                />
                <ActionButton
                  label={"Editar"}
                  onClick={() => handleEdit(vacinacao)}
                  color={"yellow"}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VaccinationManagement;
