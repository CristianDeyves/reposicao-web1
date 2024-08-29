import { useState, useEffect } from "react";
import { getRequests, updateRequest } from "../services/api";

function RequestListPage() {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getRequests();
      setRequests(data);
    }
    fetchData();
  }, []);

  const handleEdit = (request) => {
    setEditingRequest(request);
    setResponseText(request.resposta || "");
  };

  const handleUpdate = async () => {
    if (editingRequest) {
      const updatedRequest = {
        ...editingRequest,
        resposta: responseText,
      };
      await updateRequest(editingRequest.id, updatedRequest);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === editingRequest.id ? updatedRequest : req
        )
      );
      setEditingRequest(null);
      setResponseText("");
    }
  };

  return (
    <div className="h-full bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Lista de Solicitações</h1>
          <ul className="mb-6">
            {requests.map((request) => (
              <li key={request.id} className="text-lg mb-4">
                <div>
                  <span className="font-semibold">{request.nome}</span> (
                  {request.email}): {request.descricao}
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h3 className="font-semibold mb-2">Resposta:</h3>
                  <p className="whitespace-pre-wrap">{request.resposta || "Nenhuma resposta ainda."}</p>
                </div>
                {editingRequest && editingRequest.id === request.id ? (
                  <div className="mt-2">
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Escreva sua resposta"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                      <h3 className="font-semibold mb-2">Preview da Resposta:</h3>
                      <p className="whitespace-pre-wrap">{responseText}</p>
                    </div>
                    <button
                      onClick={handleUpdate}
                      className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                    >
                      Enviar Resposta
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(request)}
                    className="mt-2 bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600"
                  >
                    Editar Resposta
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RequestListPage;
