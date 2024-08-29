import { useState } from "react";
import PropTypes from "prop-types";

function ProfissionalDeSaudeForm({ onSubmit, formData }) {
  const [formState, setFormState] = useState(
    formData || {
      registroConselho: "",
      nomeCompleto: "", // Alterado de pessoaId para nomeCompleto
      profissao: "",
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
        <label htmlFor="registroConselho" className="mb-1">Registro no Conselho</label>
        <input
          type="text"
          name="registroConselho"
          id="registroConselho"
          value={formState.registroConselho}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="nomeCompleto" className="mb-1">Nome Completo</label>
        <input
          type="text"
          name="nomeCompleto"
          id="nomeCompleto"
          value={formState.nomeCompleto}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="profissao" className="mb-1">Profissão</label>
        <input
          type="text"
          name="profissao"
          id="profissao"
          value={formState.profissao}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {formData ? "Atualizar Profissional" : "Criar Profissional"}
      </button>
    </form>
  );
}

ProfissionalDeSaudeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

export default ProfissionalDeSaudeForm;
