import { useState, useEffect } from "react";
import { getFabricantesVacina, deleteFabricanteVacina, updateFabricanteVacina, createFabricanteVacina } from "../services/api";
import ActionButton from "../components/ActionButton";
import FabricanteVacinaForm from "../components/FabricanteVacinaForm";

function FabricanteVacinaManagement() {
  const [fabricantes, setFabricantes] = useState([]);
  const [editingFabricante, setEditingFabricante] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getFabricantesVacina();
      setFabricantes(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteFabricanteVacina(id);
    setFabricantes(fabricantes.filter((fabricante) => fabricante.id !== id));
  };

  const handleEdit = (fabricante) => {
    setEditingFabricante(fabricante);
    setIsFormVisible(true);
  };

  const handleUpdate = async (updatedFabricante) => {
    await updateFabricanteVacina(editingFabricante.id, updatedFabricante);
    setFabricantes(fabricantes.map((fabricante) =>
      fabricante.id === editingFabricante.id ? updatedFabricante : fabricante
    ));
    setEditingFabricante(null);
    setIsFormVisible(false);
  };

  const handleCreate = async (newFabricante) => {
    const createdFabricante = await createFabricanteVacina(newFabricante);
    setFabricantes([...fabricantes, { id: createdFabricante.name, ...newFabricante }]);
    setIsFormVisible(false);
  };

  const startCreating = () => {
    setEditingFabricante(null);
    setIsFormVisible(true);
  };

  return (
    <div className="h-full bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Gerenciar Fabricantes de Vacina</h1>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={startCreating}
          >
            {editingFabricante ? "Atualizar Fabricante" : "Cadastrar Fabricante"}
          </button>

          {isFormVisible && (
            <div className="mt-4">
              <FabricanteVacinaForm
                onSubmit={editingFabricante ? handleUpdate : handleCreate}
                formData={editingFabricante || {}}
              />
              <ActionButton
                label={"Cancelar"}
                onClick={() => setIsFormVisible(false)}
                color={"gray"}
              />
            </div>
          )}

          <ul className="mt-6">
            {fabricantes.map((fabricante) => (
              <li
                key={fabricante.id}
                className="text-lg flex justify-between items-center mb-4"
              >
                <span className="flex-1 text-left mr-4">
                  {fabricante.nomeFabricante} - Lote: {fabricante.lote} - Validade: {fabricante.validade}
                </span>
                <ActionButton
                  label={"Deletar"}
                  onClick={() => handleDelete(fabricante.id)}
                  color={"red"}
                />
                <ActionButton
                  label={"Editar"}
                  onClick={() => handleEdit(fabricante)}
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

export default FabricanteVacinaManagement;
