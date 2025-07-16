const DashboardCard = ({ title, value, bg }) => {
  return (
    <div className={`p-5 rounded-xl shadow-md text-white ${bg}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
