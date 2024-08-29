import { useState, useEffect } from "react";
import { getDashboardData } from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [data, setData] = useState({
    totalVacinas: 0,
    vacinasPorFabricante: {},
    profissionalTop: "",
    aplicacoesPorMes: {},
  });

  useEffect(() => {
    async function fetchData() {
      const result = await getDashboardData();
      setData(result);
    }
    fetchData();
  }, []);

  const barData = {
    labels: Object.keys(data.aplicacoesPorMes),
    datasets: [
      {
        label: "Total de Aplicações",
        data: Object.values(data.aplicacoesPorMes),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-full bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg mb-6">
            Total de vacinas aplicadas:{" "}
            <span className="font-semibold">{data.totalVacinas}</span>
          </p>
          <h2 className="text-2xl font-semibold mb-2">Vacinas aplicadas por fabricante:</h2>
          <ul className="mb-6">
            {Object.entries(data.vacinasPorFabricante).map(([fabricante, total]) => (
              <li key={fabricante} className="text-lg">
                <span className="font-medium">{fabricante}:</span> {total}
              </li>
            ))}
          </ul>
          <p className="text-lg mb-6">
            Profissional de saúde que mais aplicou vacinas:{" "}
            <span className="font-semibold">{data.profissionalTop}</span>
          </p>
          <h2 className="text-2xl font-semibold mb-2">Total de aplicações por mês:</h2>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
