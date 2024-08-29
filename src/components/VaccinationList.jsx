import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importando PropTypes
import { getVacinacoes } from "../services/api";

function VaccinationList({ pacienteId }) {
  const [vacinacoes, setVacinacoes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getVacinacoes();
      const vacinasPaciente = data.filter(v => v.pacienteId === pacienteId);
      setVacinacoes(vacinasPaciente);
    }
    fetchData();
  }, [pacienteId]);

  return (
    <ul>
      {vacinacoes.map((vacinacao) => (
        <li key={vacinacao.id}>
          Fabricante: {vacinacao.fabricante} - Data: {new Date(vacinacao.data).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}

// Adicionando validação de PropTypes
VaccinationList.propTypes = {
  pacienteId: PropTypes.string.isRequired, // Validando que pacienteId é uma string e é obrigatório
};

export default VaccinationList;
