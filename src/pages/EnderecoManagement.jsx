import { useState, useEffect } from "react";
import { getEnderecos, deleteEndereco, updateEndereco, createEndereco } from "../services/api";
import ActionButton from "../components/ActionButton";
import EnderecoForm from "../components/EnderecoForm";

function EnderecoManagement() {
  const [enderecos, setEnderecos] = useState([]);
  const [editingEndereco, setEditingEndereco] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getEnderecos();
      setEnderecos(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteEndereco(id);
    setEnderecos(enderecos.filter((endereco) => endereco.id !== id));
  };

  const handleEdit = (endereco) => {
    setEditingEndereco(endereco);
    setIsFormVisible(true);
  };

  const handleUpdate = async (updatedEndereco) => {
    await updateEndereco(editingEndereco.id, updatedEndereco);
    setEnderecos(enderecos.map((endereco) =>
      endereco.id === editingEndereco.id ? updatedEndereco : endereco
    ));
    setEditingEndereco(null);
    setIsFormVisible(false);
  };

  const handleCreate = async (newEndereco) => {
    const createdEndereco = await createEndereco(newEndereco);
    setEnderecos([...enderecos, { id: createdEndereco.name, ...newEndereco }]);
    setIsFormVisible(false);
  };

  const startCreating = () => {
    setEditingEndereco(null);
    setIsFormVisible(true);
  };

  return (
    <div className="h-full bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Gerenciar Endereços</h1>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={startCreating}
          >
            {editingEndereco ? "Atualizar Endereço" : "Cadastrar Endereço"}
          </button>

          {isFormVisible && (
            <div className="mt-4">
              <EnderecoForm
                onSubmit={editingEndereco ? handleUpdate : handleCreate}
                formData={editingEndereco || {}}
              />
              <ActionButton
                label={"Cancelar"}
                onClick={() => setIsFormVisible(false)}
                color={"gray"}
              />
            </div>
          )}

          <ul className="mt-6">
            {enderecos.map((endereco) => (
              <li
                key={endereco.id}
                className="text-lg flex justify-between items-center mb-4"
              >
                <span className="flex-1 text-left mr-4">
                  {endereco.logradouro}, {endereco.numero} - {endereco.bairro} / {endereco.localidade} - {endereco.uf}
                </span>
                <ActionButton
                  label={"Deletar"}
                  onClick={() => handleDelete(endereco.id)}
                  color={"red"}
                />
                <ActionButton
                  label={"Editar"}
                  onClick={() => handleEdit(endereco)}
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

export default EnderecoManagement;
