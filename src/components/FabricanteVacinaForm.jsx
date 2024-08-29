import { useState } from "react";
import PropTypes from "prop-types";

function FabricanteVacinaForm({ onSubmit, formData }) {
  const [formState, setFormState] = useState(
    formData || {
      nomeFabricante: "",
      tipoVacina: "",  // Novo campo para Tipo de Vacina
      lote: "",
      validade: "",
      quantidade: "",
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
        <label htmlFor="nomeFabricante" className="mb-1">Nome do Fabricante</label>
        <input
          type="text"
          name="nomeFabricante"
          id="nomeFabricante"
          value={formState.nomeFabricante}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="tipoVacina" className="mb-1">Tipo de Vacina</label> {/* Novo campo */}
        <input
          type="text"
          name="tipoVacina"
          id="tipoVacina"
          value={formState.tipoVacina}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lote" className="mb-1">Lote</label>
        <input
          type="text"
          name="lote"
          id="lote"
          value={formState.lote}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="validade" className="mb-1">Validade</label>
        <input
          type="date"
          name="validade"
          id="validade"
          value={formState.validade}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="quantidade" className="mb-1">Quantidade</label>
        <input
          type="number"
          name="quantidade"
          id="quantidade"
          value={formState.quantidade}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {formData ? "Atualizar Fabricante" : "Criar Fabricante"}
      </button>
    </form>
  );
}

FabricanteVacinaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

export default FabricanteVacinaForm;
