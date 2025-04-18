import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  IndianRupee,
  BellRing,
  Search,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react";
import Navbar from "../../Components/Doctor/Navbar";

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#6366f1'];
const STATUS_COLORS = {
  SUCCESS: "bg-green-500 text-green-100",
  PENDING: "bg-amber-500 text-amber-100",
  FAILED: "bg-red-500 text-red-100"
};

export default function DoctorPayment() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStats, setPaymentStats] = useState({
    totalPayments: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    completionRate: 0
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/getpayments`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setPayments(data);
        
        // Calculate payment statistics
        calculatePaymentStats(data);
        
        // Generate chart data
        generateChartData(data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const calculatePaymentStats = (data) => {
    const totalPayments = data.length;
    const totalRevenue = data.reduce((sum, payment) => 
      payment.status === "SUCCESS" ? sum + payment.amount : sum, 0);
    const pendingPayments = data.filter(payment => 
      payment.status === "PENDING").length;
    const successPayments = data.filter(payment => 
      payment.status === "SUCCESS").length;
    const completionRate = totalPayments > 0 
      ? Math.round((successPayments / totalPayments) * 100) 
      : 0;

    setPaymentStats({
      totalPayments,
      totalRevenue,
      pendingPayments,
      completionRate
    });
  };

  const generateChartData = (data) => {
    // Group payments by month for charts
    const monthlyPayments = {};
    const monthlyRevenue = {};
    
    // Current date for getting last 6 months
    const currentDate = new Date();
    
    // Process data for last 6 months
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const monthYear = date.toLocaleString('default', { month: 'short' });
      
      monthlyPayments[monthYear] = { 
        name: monthYear, 
        completed: 0, 
        pending: 0 
      };
      
      monthlyRevenue[monthYear] = { 
        name: monthYear, 
        value: 0 
      };
    }
    
    // Fill in actual data
    data.forEach(payment => {
      const paymentDate = new Date(payment.paymentDate);
      const monthYear = paymentDate.toLocaleString('default', { month: 'short' });
      
      // Only process if it's within the last 6 months
      if (monthlyPayments[monthYear]) {
        if (payment.status === "SUCCESS") {
          monthlyPayments[monthYear].completed += 1;
          monthlyRevenue[monthYear].value += payment.amount;
        } else if (payment.status === "PENDING") {
          monthlyPayments[monthYear].pending += 1;
        }
      }
    });
    
    // Convert to arrays and reverse to chronological order
    const monthlyDataArray = Object.values(monthlyPayments).reverse();
    const revenueDataArray = Object.values(monthlyRevenue).reverse();
    
    setMonthlyData(monthlyDataArray);
    setRevenueData(revenueDataArray);
  };

  const filteredPayments = payments.filter((payment) =>
    payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading payment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Data</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="ml-20 flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Aarogya Bharat"
              readOnly
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
              <BellRing className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium mr-2">
                DL
              </div>
              <div className="relative">
                <button className="flex items-center">
                  <span className="font-medium text-slate-800">Dr. Luke</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 ml-1 text-slate-500"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-slate-800">
            Payment Dashboard
          </h1>
          <p className="text-slate-500">Monitor and manage all payment transactions</p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Left side - 4/7 */}
          <div className="lg:col-span-4 space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-4 gap-6">
              <MetricCard
                icon={<CreditCard className="h-6 w-6 text-indigo-600" />}
                label="Total Payments"
                value={paymentStats.totalPayments}
                bgColor="bg-indigo-200"
                iconBgColor="bg-indigo-100"
              />
              <MetricCard
                icon={<IndianRupee className="h-6 w-6 text-indigo-600" />}
                label="Total Revenue"
                value={`₹${paymentStats.totalRevenue.toLocaleString()}`}
                bgColor="bg-green-200"
                iconBgColor="bg-indigo-100"
              />
              <MetricCard
                icon={<Calendar className="h-6 w-6 text-indigo-600" />}
                label="Pending Payments"
                value={paymentStats.pendingPayments}
                bgColor="bg-amber-200"
                iconBgColor="bg-indigo-100"
              />
              <MetricCard
                icon={<Users className="h-6 w-6 text-indigo-600" />}
                label="Completion Rate"
                value={`${paymentStats.completionRate}%`}
                progress={paymentStats.completionRate}
                bgColor="bg-blue-200"
                iconBgColor="bg-indigo-100"
              />
            </div>

            {/* Payment Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6 text-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Monthly Payment Trends</h2>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-indigo-600 mr-1"></span>
                    <span className="text-xs text-slate-500">Completed</span>
                  </span>
                  <span className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-amber-400 mr-1"></span>
                    <span className="text-xs text-slate-500">Pending</span>
                  </span>
                </div>
              </div>
              <div className="h-64">
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.5rem" }}
                        labelStyle={{ color: "#1e293b" }}
                        itemStyle={{ color: "#1e293b" }}
                      />
                      <Bar dataKey="pending" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completed" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500">No monthly data available</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Revenue Trend</h2>
                <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
                  <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">6M</button>
                  <button className="text-xs text-slate-600 px-3 py-1">1Y</button>
                  <button className="text-xs text-slate-600 px-3 py-1">All</button>
                </div>
              </div>
              <div className="h-64">
                {revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.5rem" }}
                        labelStyle={{ color: "#1e293b" }}
                        formatter={(value) => [`₹${value}`, "Revenue"]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4f46e5" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: "#4f46e5", stroke: "#c7d2fe", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500">No revenue data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - 3/7 */}
          <div className="lg:col-span-3 space-y-6">
            {/* Status Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Payment Status</h2>
                <div className="flex space-x-2">
                  <button className="p-1 rounded-md hover:bg-slate-100">
                    <Filter className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {Object.keys(STATUS_COLORS).map((status) => {
                  const count = payments.filter(p => p.status === status).length;
                  const percentage = payments.length > 0 ? Math.round((count / payments.length) * 100) : 0;
                  
                  return (
                    <div key={status} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${STATUS_COLORS[status]}`}>
                          {status}
                        </span>
                        <span className="text-sm font-medium text-slate-700">{count} payments</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-indigo-500" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-right">
                        <span className="text-xs text-slate-500">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Recent Payments</h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredPayments.length > 0 ? (
                  filteredPayments.slice(0, 10).map((payment, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium mr-3">
                          {typeof payment.patientName === 'string' && payment.patientName.includes(' ') 
                            ? payment.patientName.split(' ').map(n => n[0]).join('')
                            : payment.patientName.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">
                            {typeof payment.patientName === 'string' && !payment.patientName.includes('') 
                              ? payment.patientName 
                              : `Patient ID: ${payment.patientName}`}
                          </h4>
                          <div className="flex space-x-2 text-xs text-slate-500">
                            <span>ID: {payment.id.substring(0, 8)}...</span>
                            <span>•</span>
                            <span>TXN: {payment.transactionId.substring(0, 8)}...</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-slate-800">₹{payment.amount.toLocaleString()}</div>
                        <div className="flex items-center justify-end space-x-2 mt-1">
                          <span className="text-xs">{new Date(payment.paymentDate).toLocaleDateString()}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[payment.status] || "bg-gray-500 text-gray-100"}`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No payments found matching your search
                  </div>
                )}
              </div>
              
              {filteredPayments.length > 10 && (
                <div className="mt-6 text-center">
                  <button className="text-indigo-600 text-sm font-medium flex items-center justify-center mx-auto hover:text-indigo-800">
                    View All Payments
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  trend,
  trendUp,
  subtext,
  progress,
  bgColor,
  iconBgColor
}) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-slate-800">{label}</h3>
        <div className={`p-2 ${iconBgColor} rounded-full`}>{icon}</div>
      </div>
      <div className="mt-2">
        <div className="flex items-end">
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {subtext && (
            <p className="ml-1 mb-1 text-sm text-slate-500">{subtext}</p>
          )}
        </div>

        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trendUp ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {trendUp ? (
                <ArrowUpRight className="inline h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="inline h-3 w-3 mr-0.5" />
              )}
              {trend}
            </span>
            <span className="text-xs text-slate-500 ml-1">vs last month</span>
          </div>
        )}

        {progress && (
          <div className="mt-3 w-full bg-white/50 rounded-full h-1.5">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}