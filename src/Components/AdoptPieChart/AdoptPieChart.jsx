import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d"];

const AdoptPieChart = ({ adopted, notAdopted }) => {
  const data = [
    { name: "Adopted", value: adopted },
    { name: "Not Adopted", value: notAdopted },
  ];

  return (
    <PieChart width={320} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default AdoptPieChart;
