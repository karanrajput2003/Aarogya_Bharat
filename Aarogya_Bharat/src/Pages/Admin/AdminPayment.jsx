import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";

const AdminPayment = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch completed payments from the backend
    const fetchCompletedPayments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/getpayments`);
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching completed payments:", error);
      }
    };

    fetchCompletedPayments();
  }, []);

  const filteredPayments = payments
    .filter((payment) =>
      payment.patientName && payment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((payment) => payment.status !== "PENDING"); // Exclude "pending" status payments

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <section className="min-h-screen py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-8 md:mb-10 lg:mb-12 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700">
                Completed Payments
              </h1>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="overflow-x-auto text-black shadow-lg rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Patient id
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Transaction id
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
                    filteredPayments.map((payment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {payment.patientName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {payment.transactionId}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          Rs.{payment.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-green-500">
                          {payment.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 text-center">
                        No completed payments found
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
