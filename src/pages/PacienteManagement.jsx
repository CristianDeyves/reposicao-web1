import { useState, useEffect } from "react";
import { getPacientes, deletePaciente, updatePaciente, createPaciente } from "../services/api";
import ActionButton from "../components/ActionButton";
import PacienteForm from "../components/PacienteForm";
import VaccinationList from "../components/VaccinationList";

function PacienteManagement() {
  const [pacientes, setPacientes] = useState([]);
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPacientes();
      setPacientes(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deletePaciente(id);
    setPacientes(pacientes.filter((paciente) => paciente.id !== id));
  };

  const handleEdit = (paciente) => {
    setEditingPaciente(paciente);
    setIsFormVisible(true);
  };

  const handleUpdate = async (updatedPaciente) => {
    await updatePaciente(editingPaciente.id, updatedPaciente);
    setPacientes(pacientes.map((paciente) =>
      paciente.id === editingPaciente.id ? updatedPaciente : paciente
    ));
    setEditingPaciente(null);
    setIsFormVisible(false);
  };

  const handleCreate = async (newPaciente) => {
    const createdPaciente = await createPaciente(newPaciente);
    setPacientes([...pacientes, { id: createdPaciente.name, ...newPaciente }]);
    setIsFormVisible(false);
  };

  const startCreating = () => {
    setEditingPaciente(null);
    setIsFormVisible(true);
  };

  const handleSelectPaciente = (paciente) => {
    setSelectedPaciente(paciente);
  };

  return (
    <div className="h-full bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Gerenciar Pacientes</h1>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={startCreating}
          >
            {editingPaciente ? "Atualizar Paciente" : "Cadastrar Paciente"}
          </button>

          {isFormVisible && (
            <div className="mt-4">
              <PacienteForm
                onSubmit={editingPaciente ? handleUpdate : handleCreate}
                formData={editingPaciente || {}}
              />
              <ActionButton
                label={"Cancelar"}
                onClick={() => setIsFormVisible(false)}
                color={"gray"}
              />
            </div>
          )}

          <ul className="mt-6">
            {pacientes.map((paciente) => (
              <li
                key={paciente.id}
                className="text-lg flex justify-between items-center mb-4"
              >
                <button
                  className="flex-1 text-left mr-4 cursor-pointer bg-transparent border-none p-0"
                  onClick={() => handleSelectPaciente(paciente)}
                >
                  {paciente.nome} {paciente.sobrenome}
                </button>
                <ActionButton
                  label={"Deletar"}
                  onClick={() => handleDelete(paciente.id)}
                  color={"red"}
                />
                <ActionButton
                  label={"Editar"}
                  onClick={() => handleEdit(paciente)}
                  color={"yellow"}
                />
              </li>
            ))}
          </ul>

          {selectedPaciente && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Vacinas do Paciente: {selectedPaciente.nome} {selectedPaciente.sobrenome}</h2>
              <VaccinationList pacienteId={selectedPaciente.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PacienteManagement;
