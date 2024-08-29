import { useState } from "react";
import PropTypes from "prop-types";

function PacienteForm({ onSubmit, formData }) {
  const [formState, setFormState] = useState(
    formData || {
      nome: "",
      sobrenome: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="nome" className="mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          id="nome"
          value={formState.nome}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sobrenome" className="mb-1">Sobrenome</label>
        <input
          type="text"
          name="sobrenome"
          id="sobrenome"
          value={formState.sobrenome}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {formData ? "Atualizar Paciente" : "Criar Paciente"}
      </button>
    </form>
  );
}

PacienteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

export default PacienteForm;
