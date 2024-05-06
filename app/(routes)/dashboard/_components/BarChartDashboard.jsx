import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-3">Activity</h2>
      <div className="border rounded-lg p-5 flex justify-center items-center">
        <ResponsiveContainer width={"80%"} height={300}>
          <BarChart
            data={budgetList}
            margin={{
              top: 7,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" barSize={120} />
            <Bar dataKey="amount" stackId="a" fill="#c3c2ff" barSize={120} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartDashboard;
