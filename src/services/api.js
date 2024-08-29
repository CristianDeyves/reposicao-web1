const baseUrl = "https://reposicao-web1-default-rtdb.firebaseio.com";

// Função genérica para lidar com erros
const handleFetchError = (error) => {
  console.error("Fetch error:", error);
  return null; // ou [] dependendo do caso
};

// Endereços CRUD
export const createEndereco = async (endereco) => {
  try {
    const response = await fetch(`${baseUrl}/enderecos.json`, {
      method: "POST",
      body: JSON.stringify(endereco),
    });
    return response.json();
  } catch (error) {
    return handleFetchError(error);
  }
};

export const getEnderecos = async () => {
  try {
    const response = await fetch(`${baseUrl}/enderecos.json`);
    const data = await response.json();
    return data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
  } catch (error) {
    return handleFetchError(error);
  }
};

export const deleteEndereco = async (id) => {
  try {
    await fetch(`${baseUrl}/enderecos/${id}.json`, {
      method: "DELETE",
    });
  } catch (error) {
    handleFetchError(error);
  }
};

export const updateEndereco = async (id, updatedEndereco) => {
  try {
    await fetch(`${baseUrl}/enderecos/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedEndereco),
    });
  } catch (error) {
    handleFetchError(error);
  }
};

// Pacientes CRUD
export const createPaciente = async (paciente) => {
  try {
    const response = await fetch(`${baseUrl}/pacientes.json`, {
      method: "POST",
      body: JSON.stringify(paciente),
    });
    return response.json();
  } catch (error) {
    return handleFetchError(error);
  }
};

export const getPacientes = async () => {
  try {
    const response = await fetch(`${baseUrl}/pacientes.json`);
    const data = await response.json();
    return data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
  } catch (error) {
    return handleFetchError(error);
  }
};

export const deletePaciente = async (id) => {
  try {
    await fetch(`${baseUrl}/pacientes/${id}.json`, {
      method: "DELETE",
    });
  } catch (error) {
    handleFetchError(error);
  }
};

export const updatePaciente = async (id, updatedPaciente) => {
  try {
    await fetch(`${baseUrl}/pacientes/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedPaciente),
    });
  } catch (error) {
    handleFetchError(error);
  }
};

// Profissionais de Saúde CRUD
export const createProfissionalDeSaude = async (profissional) => {
  try {
    const response = await fetch(`${baseUrl}/profissionais.json`, {
      method: "POST",
      body: JSON.stringify(profissional),
    });
    return response.json();
  } catch (error) {
    return handleFetchError(error);
  }
};

export const getProfissionaisDeSaude = async () => {
  try {
    const response = await fetch(`${baseUrl}/profissionais.json`);
    const data = await response.json();
    return data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
  } catch (error) {
    return handleFetchError(error);
  }
};

export const deleteProfissionalDeSaude = async (id) => {
  try {
    await fetch(`${baseUrl}/profissionais/${id}.json`, {
      method: "DELETE",
    });
  } catch (error) {
    handleFetchError(error);
  }
};

export const updateProfissionalDeSaude = async (id, updatedProfissional) => {
  try {
    await fetch(`${baseUrl}/profissionais/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedProfissional),
    });
  } catch (error) {
    handleFetchError(error);
  }
};

// Fabricantes de Vacinas CRUD
export const createFabricanteVacina = async (fabricante) => {
  try {
    const response = await fetch(`${baseUrl}/fabricantes.json`, {
      method: "POST",
      body: JSON.stringify(fabricante),
    });
    return response.json();
  } catch (error) {
    return handleFetchError(error);
  }
};

export const getFabricantesVacina = async () => {
  try {
    const response = await fetch(`${baseUrl}/fabricantes.json`);
    const data = await response.json();
    return data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
  } catch (error) {
    return handleFetchError(error);
  }
};

export const deleteFabricanteVacina = async (id) => {
  try {
    await fetch(`${baseUrl}/fabricantes/${id}.json`, {
      method: "DELETE",
    });
  } catch (error) {
    handleFetchError(error);
  }
};

export const updateFabricanteVacina = async (id, updatedFabricante) => {
  try {
    await fetch(`${baseUrl}/fabricantes/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedFabricante),
    });
  } catch (error) {
    handleFetchError(error);
  }
};

// Vacinações CRUD
export const createVacinacao = async (vacinacao) => {
  try {
    // Primeiro subtraímos uma unidade da quantidade de vacinas do lote selecionado
    const fabricanteId = vacinacao.lote; // Considerando que `lote` seja a chave para o fabricante
    const fabricante = await fetch(`${baseUrl}/fabricantes/${fabricanteId}.json`);
    const fabricanteData = await fabricante.json();

    if (fabricanteData && fabricanteData.quantidade > 0) {
      // Subtraímos 1 da quantidade
      fabricanteData.quantidade -= 1;

      // Atualizamos o fabricante no banco de dados
      await updateFabricanteVacina(fabricanteId, fabricanteData);

      // Criamos a vacinação
      const response = await fetch(`${baseUrl}/vacinacoes.json`, {
        method: "POST",
        body: JSON.stringify(vacinacao),
      });
      return response.json();
    } else {
      throw new Error("Quantidade de vacinas insuficiente");
    }
  } catch (error) {
    return handleFetchError(error);
  }
};

export const getVacinacoes = async () => {
  try {
    const response = await fetch(`${baseUrl}/vacinacoes.json`);
    const data = await response.json();
    return data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
  } catch (error) {
    return handleFetchError(error);
  }
};

export const deleteVacinacao = async (id) => {
  try {
    await fetch(`${baseUrl}/vacinacoes/${id}.json`, {
      method: "DELETE",
    });
  } catch (error) {
    handleFetchError(error);
  }
};

export const updateVacinacao = async (id, updatedVacinacao) => {
  try {
    await fetch(`${baseUrl}/vacinacoes/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedVacinacao),
    });
  } catch (error) {
    handleFetchError(error);
  }
};

// Dashboard Data Fetching
export const getDashboardData = async () => {
  try {
    const responseVacinas = await fetch(`${baseUrl}/vacinacoes.json`);
    const vacinasData = await responseVacinas.json();

    if (!vacinasData) {
      return {
        totalVacinas: 0,
        vacinasPorFabricante: {},
        profissionalTop: "",
        aplicacoesPorMes: {},
      };
    }

    const totalVacinas = Object.keys(vacinasData).length;

    const vacinasPorFabricante = {};
    const aplicacoesPorMes = {};
    const aplicacoesPorProfissional = {};

    Object.values(vacinasData).forEach((vacina) => {
      const fabricante = vacina.fabricante;
      const profissional = vacina.profissional;
      const mes = new Date(vacina.data).toLocaleString("default", { month: "long" });

      // Contagem por fabricante
      vacinasPorFabricante[fabricante] = (vacinasPorFabricante[fabricante] || 0) + 1;

      // Contagem por mês
      aplicacoesPorMes[mes] = (aplicacoesPorMes[mes] || 0) + 1;

      // Contagem por profissional
      aplicacoesPorProfissional[profissional] =
        (aplicacoesPorProfissional[profissional] || 0) + 1;
    });

    // Adicionando valor inicial ao reduce
    const profissionalTop = Object.keys(aplicacoesPorProfissional).reduce(
      (a, b) =>
        aplicacoesPorProfissional[a] > aplicacoesPorProfissional[b] ? a : b,
      ""
    );

    return {
      totalVacinas,
      vacinasPorFabricante,
      profissionalTop,
      aplicacoesPorMes,
    };
  } catch (error) {
    return handleFetchError(error);
  }
};

// Solicitações de Suporte CRUD
export const getRequests = async () => {
  try {
    const response = await fetch(`${baseUrl}/requests.json`);
    const data = await response.json();
    return data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
  } catch (error) {
    return handleFetchError(error);
  }
};

export const createRequest = async (request) => {
  try {
    const response = await fetch(`${baseUrl}/requests.json`, {
      method: "POST",
      body: JSON.stringify(request),
    });
    return response.json();
  } catch (error) {
    return handleFetchError(error);
  }
};

export const updateRequest = async (id, updatedRequest) => {
  try {
    const response = await fetch(`${baseUrl}/requests/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedRequest),
    });
    return response.json();
  } catch (error) {
    return handleFetchError(error);
  }
};
