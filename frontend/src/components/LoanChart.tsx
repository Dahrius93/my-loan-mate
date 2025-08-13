import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";
import { useEffect, useState } from "react";
import { getLoanRequests } from "../services/api";
import type { LoanRequest } from "../services/api";

interface Props {
  userId: number;
}

type Slice = { categoria: string; valore: number; colore: string };

export default function LoanChart({ userId }: Props) {
  const [data, setData] = useState<Slice[]>([]);
  const [totaleRichiesto, setTotaleRichiesto] = useState(0);

  useEffect(() => {
    getLoanRequests().then((res: LoanRequest[]) => {
      const userRequests = res.filter((r) => r.user.id === userId);

      let richiesto = 0;
      let approvato = 0;
      let rifiutato = 0;

      userRequests.forEach((r) => {
        if (typeof r.importo !== "number") return;
        richiesto += r.importo;
        if (r.stato === "approvata") approvato += r.importo;
        else if (r.stato === "rifiutata") rifiutato += r.importo;
      });

      const pendente = Math.max(richiesto - approvato - rifiutato, 0);

      setTotaleRichiesto(richiesto);
      setData([
        { categoria: "Approvato", valore: approvato, colore: "#4ade80" },
        { categoria: "Rifiutato", valore: rifiutato, colore: "#f87171" },
        ...(pendente > 0
          ? [
              {
                categoria: "In valutazione",
                valore: pendente,
                colore: "#facc15",
              },
            ]
          : []),
      ]);
    });
  }, [userId]);

  const formatEuro = (v: number) =>
    `€${v.toLocaleString("it-IT", { maximumFractionDigits: 0 })}`;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-center mb-2">Totali utente</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="valore"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            isAnimationActive={false}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.colore} />
            ))}
            <Label
              value="Richiesto"
              position="center"
              fill="#64748b"
              fontSize={12}
              dy={-8}
            />
            <Label
              value={formatEuro(totaleRichiesto)}
              position="center"
              fill="#0f172a"
              fontSize={16}
              dy={12}
            />
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              const v = Number(value) || 0;
              const perc =
                totaleRichiesto > 0
                  ? `${((v / totaleRichiesto) * 100).toFixed(1)}%`
                  : "0%";
              return [`${formatEuro(v)} (${perc})`, String(name)];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
