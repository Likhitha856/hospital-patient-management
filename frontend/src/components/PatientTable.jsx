import { Link } from "react-router-dom";

export default function PatientTable({
  patients = [],
  onDelete,
  onEdit,
  onStatusChange,
  searchTerm,
  onSearch,
}) {
  const getStatusColor = (status) => {
    if (status === "Waiting") return "bg-yellow-400";
    if (status === "Admitted") return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Patient Records</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Disease..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="input mb-4"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1500px] w-full border-collapse text-sm">
          <thead className="bg-blue-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left dark:text-gray-200">Status</th>
              <th className="p-3 text-left dark:text-gray-200">S.No</th>
              <th className="p-3 text-left dark:text-gray-200">Date & Time</th>
              <th className="p-3 text-left dark:text-gray-200">Name</th>
              <th className="p-3 text-left dark:text-gray-200">Age</th>
              <th className="p-3 text-left dark:text-gray-200">Contact</th>
              <th className="p-3 text-left dark:text-gray-200">Address</th>
              <th className="p-3 text-left dark:text-gray-200">Temp</th>
              <th className="p-3 text-left dark:text-gray-200">BP</th>
              <th className="p-3 text-left dark:text-gray-200">Disease</th>
              <th className="p-3 text-left dark:text-gray-200">Doctor</th>
              <th className="p-3 text-left dark:text-gray-200">Full Details</th>
              <th className="p-3 text-left dark:text-gray-200">Update</th>
              <th className="p-3 text-left dark:text-gray-200">Delete</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p, index) => (
              <tr
                key={p.id}
                className="border-t dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-2">
                  <button
                    onClick={() => onStatusChange(p)}
                    className={`${getStatusColor(p.status)} text-white px-3 py-1 rounded-full transition hover:scale-105`}
                  >
                    {p.status}
                  </button>
                </td>

                <td className="p-2">{index + 1}</td>
                <td className="p-2">{p.datetime}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">
                  {p.age} {p.ageType}
                </td>
                <td className="p-2">{p.contact}</td>
                <td className="p-2">{p.address}</td>
                <td className="p-2">{p.temperature}°C</td>
                <td className="p-2">{p.bp}</td>
                <td className="p-2">{p.disease}</td>
                <td className="p-2">{p.doctor}</td>

                <td className="p-2">
                  <Link
                    to={`/report/${p.id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>
                </td>

                <td className="p-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>

                <td className="p-2">
                  <button
                    onClick={() => onDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
