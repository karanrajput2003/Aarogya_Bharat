import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";

const AdminPayment = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const navigate = useNavigate();

  // Dummy data for payments (replace with actual data from your API)
  const dummyPayments = [
    {
      id: "1",
      patientName: "John Doe",
      amount: 150,
      paymentDate: "2024-11-15",
      status: "Pending",
      transactionId: "TX12345",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      amount: 200,
      paymentDate: "2024-11-16",
      status: "Completed",
      transactionId: "TX12346",
    },
    {
      id: "3",
      patientName: "Michael Johnson",
      amount: 100,
      paymentDate: "2024-11-17",
      status: "Failed",
      transactionId: "TX12347",
    },
  ];

  useEffect(() => {
    // Fetch the data (replace with actual API call)
    setPayments(dummyPayments);
  }, []);

  const handleStatusChange = (id, status) => {
    // Update payment status in the backend here
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, status } : payment
      )
    );
  };

  // Filtered payments based on search term
  const filteredPayments = payments.filter((payment) =>
    payment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <section className="min-h-screen py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-8 md:mb-10 lg:mb-12 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700">
                All Payments
              </h1>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>

            {/* Table for Payments */}
            <div className="overflow-x-auto text-black shadow-lg rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Payment Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {payment.patientName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ${payment.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {payment.paymentDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {payment.status === "Pending" ? (
                            <span className="text-yellow-500">
                              {payment.status}
                            </span>
                          ) : payment.status === "Completed" ? (
                            <span className="text-green-500">
                              {payment.status}
                            </span>
                          ) : (
                            <span className="text-red-500">{payment.status}</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-sm text-gray-500 text-center"
                      >
                        No payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPayment;
