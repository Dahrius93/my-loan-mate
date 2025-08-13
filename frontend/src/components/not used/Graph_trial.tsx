import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { nome: "Mario", importo: 1200 },
  { nome: "Luisa", importo: 800 },
  { nome: "Dario", importo: 1500 },
];

export default function Graph_trial() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nome" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="importo" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
