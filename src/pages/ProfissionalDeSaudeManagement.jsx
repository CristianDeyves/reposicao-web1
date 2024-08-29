import { useState, useEffect } from "react";
import {
  getProfissionaisDeSaude,
  deleteProfissionalDeSaude,
  updateProfissionalDeSaude,
  createProfissionalDeSaude
} from "../services/api";
import ActionButton from "../components/ActionButton";
import ProfissionalDeSaudeForm from "../components/ProfissionalDeSaudeForm";

function ProfissionalDeSaudeManagement() {
  const [profissionais, setProfissionais] = useState([]);
  const [editingProfissional, setEditingProfissional] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfissionaisDeSaude();
      setProfissionais(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteProfissionalDeSaude(id);
    setProfissionais(profissionais.filter((profissional) => profissional.id !== id));
  };

  const handleEdit = (profissional) => {
    setEditingProfissional(profissional);
    setIsFormVisible(true);
  };

  const handleUpdate = async (updatedProfissional) => {
    await updateProfissionalDeSaude(editingProfissional.id, updatedProfissional);
    setProfissionais(profissionais.map((profissional) =>
      profissional.id === editingProfissional.id ? updatedProfissional : profissional
    ));
    setEditingProfissional(null);
    setIsFormVisible(false);
  };

  const handleCreate = async (newProfissional) => {
    const createdProfissional = await createProfissionalDeSaude(newProfissional);
    setProfissionais([...profissionais, { id: createdProfissional.name, ...newProfissional }]);
    setIsFormVisible(false);
  };

  const startCreating = () => {
    setEditingProfissional(null);
    setIsFormVisible(true);
  };

  return (
    <div className="h-full bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Gerenciar Profissionais de Saúde</h1>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={startCreating}
          >
            {editingProfissional ? "Atualizar Profissional" : "Cadastrar Profissional"}
          </button>

          {isFormVisible && (
            <div className="mt-4">
              <ProfissionalDeSaudeForm
                onSubmit={editingProfissional ? handleUpdate : handleCreate}
                formData={editingProfissional || {}}
              />
              <ActionButton
                label={"Cancelar"}
                onClick={() => setIsFormVisible(false)}
                color={"gray"}
              />
            </div>
          )}

          <ul className="mt-6">
            {profissionais.map((profissional) => (
              <li
                key={profissional.id}
                className="text-lg flex justify-between items-center mb-4"
              >
                <span className="flex-1 text-left mr-4">
                  {profissional.nomeCompleto} - {profissional.profissao}
                </span>
                <ActionButton
                  label={"Deletar"}
                  onClick={() => handleDelete(profissional.id)}
                  color={"red"}
                />
                <ActionButton
                  label={"Editar"}
                  onClick={() => handleEdit(profissional)}
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

export default ProfissionalDeSaudeManagement;
