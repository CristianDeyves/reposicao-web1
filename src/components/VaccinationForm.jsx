import { useState } from "react";
import PropTypes from "prop-types";

function VaccinationForm({ onSubmit, formData, pacientes, profissionais, fabricantes }) {
  const [formState, setFormState] = useState(
    formData || {
      paciente: "",
      aplicador: "",
      fabricante: "",
      lote: "",  // Adicionando lote para referência
      data: "",
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
    const selectedPaciente = pacientes.find((p) => p.id === formState.paciente);
    const selectedAplicador = profissionais.find(
      (p) => p.id === formState.aplicador
    );
    const selectedFabricante = fabricantes.find(
      (f) => f.lote === formState.lote
    );

    const vacinacaoData = {
      ...formState,
      paciente: selectedPaciente,
      aplicador: selectedAplicador,
      fabricante: selectedFabricante.nomeFabricante,  // Armazena apenas o nome do fabricante
    };

    onSubmit(vacinacaoData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="paciente" className="mb-1">
          Paciente
        </label>
        <select
          name="paciente"
          id="paciente"
          value={formState.paciente}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecione um Paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nome} {paciente.sobrenome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="aplicador" className="mb-1">
          Aplicador
        </label>
        <select
          name="aplicador"
          id="aplicador"
          value={formState.aplicador}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecione um Aplicador</option>
          {profissionais.map((profissional) => (
            <option key={profissional.id} value={profissional.id}>
              {profissional.nomeCompleto} - {profissional.profissao}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="lote" className="mb-1">
          Fabricante
        </label>
        <select
          name="lote"
          id="lote"
          value={formState.lote}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecione um Fabricante</option>
          {fabricantes.map((fabricante) => (
            <option key={fabricante.lote} value={fabricante.lote}>
              {fabricante.nomeFabricante} - {fabricante.tipoVacina} - Lote: {fabricante.lote}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="data" className="mb-1">
          Data
        </label>
        <input
          type="date"
          name="data"
          id="data"
          value={formState.data}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {formData ? "Atualizar Vacinação" : "Salvar Vacinação"}
      </button>
    </form>
  );
}

VaccinationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
  pacientes: PropTypes.array.isRequired,
  profissionais: PropTypes.array.isRequired,
  fabricantes: PropTypes.array.isRequired,  // Adicione aqui
};

export default VaccinationForm;
