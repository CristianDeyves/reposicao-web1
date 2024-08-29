import { useState } from "react";
import PropTypes from "prop-types";

function EnderecoForm({ onSubmit, formData }) {
  const [formState, setFormState] = useState(
    formData || {
      cep: "",
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
      numero: "",
      complemento: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepBlur = async () => {
    if (formState.cep) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formState.cep}/json/`);
        const data = await response.json();
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }
        setFormState((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        }));
      } catch {
        alert("Erro ao buscar o CEP!");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="cep" className="mb-1">CEP</label>
        <input
          type="text"
          name="cep"
          id="cep"
          value={formState.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="logradouro" className="mb-1">Logradouro</label>
        <input
          type="text"
          name="logradouro"
          id="logradouro"
          value={formState.logradouro}
          onChange={handleChange}
          className="border p-2 rounded"
          readOnly
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bairro" className="mb-1">Bairro</label>
        <input
          type="text"
          name="bairro"
          id="bairro"
          value={formState.bairro}
          onChange={handleChange}
          className="border p-2 rounded"
          readOnly
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="localidade" className="mb-1">Localidade</label>
        <input
          type="text"
          name="localidade"
          id="localidade"
          value={formState.localidade}
          onChange={handleChange}
          className="border p-2 rounded"
          readOnly
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="uf" className="mb-1">UF</label>
        <input
          type="text"
          name="uf"
          id="uf"
          value={formState.uf}
          onChange={handleChange}
          className="border p-2 rounded"
          readOnly
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="numero" className="mb-1">Número</label>
        <input
          type="text"
          name="numero"
          id="numero"
          value={formState.numero}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="complemento" className="mb-1">Complemento</label>
        <input
          type="text"
          name="complemento"
          id="complemento"
          value={formState.complemento}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {formData ? "Atualizar Endereço" : "Cadastrar Endereço"}
      </button>
    </form>
  );
}

EnderecoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

export default EnderecoForm;
