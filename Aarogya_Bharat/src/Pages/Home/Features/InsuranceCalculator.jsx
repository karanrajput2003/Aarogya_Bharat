import React, { useState } from "react";
import { Card, Button, Slider, Select, Radio, Tooltip } from "antd";
import { InfoCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import Navbar from "../../../Components/Home/Navbar";

const initialFormData = {
  age: 30,
  preExistingConditions: [],
  lifestyle: "non_smoker",
  coverageAmount: 1000000,
  policyTerm: 1,
};

const COLORS = ["#4f46e5", "#06b6d4", "#f59e0b"];

export default function InsurancePremiumCalculator() {
  const [formData, setFormData] = useState(initialFormData);
  const [premium, setPremium] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculatePremium = () => {
    // Base calculation
    let basePremium = formData.coverageAmount * 0.005;
    
    // Age factor (2% increase per year above 20)
    basePremium *= 1 + (formData.age - 20) * 0.02;
    
    // Health conditions
    basePremium *= 1 + formData.preExistingConditions.length * 0.1;
    
    // Lifestyle adjustments
    const lifestyleMultipliers = {
      smoker: 1.5,
      regular_drinker: 1.3,
      sedentary: 1.2,
      non_smoker: 1.0,
      active: 0.9,
      occasional_drinker: 1.1
    };
    basePremium *= lifestyleMultipliers[formData.lifestyle] || 1;
    
    // Term adjustment
    basePremium *= formData.policyTerm;
    
    setPremium(Math.round(basePremium));
  };

  const premiumBreakdown = {
    base: premium ? premium * 0.7 : 0,
    risk: premium ? premium * 0.2 : 0,
    tax: premium ? premium * 0.1 : 0,
  };

  const pieData = [
    { name: "Base Premium", value: premiumBreakdown.base },
    { name: "Risk Assessment", value: premiumBreakdown.risk },
    { name: "Taxes & Fees", value: premiumBreakdown.tax }
  ];

  const barData = [
    {
      name: "Monthly",
      amount: premium ? premium / 12 : 0
    },
    {
      name: "Annual",
      amount: premium || 0
    }
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-10xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Term Life Insurance Calculator</h1>
            <p className="text-cyan-100">Calculate your premium based on personalized risk factors</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card 
              title={
                <div className="flex items-center justify-between">
                  <span>Your Details</span>
                  <Tooltip title="View calculation method">
                    <InfoCircleOutlined onClick={() => setShowInfo(!showInfo)} />
                  </Tooltip>
                </div>
              }
              className="shadow-xl bg-white/95 backdrop-blur"
            >
              {showInfo && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">How we calculate your premium</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Base rate: 0.5% of coverage amount</li>
                    <li>Age factor: +2% per year above age 20</li>
                    <li>Health conditions: +10% per condition</li>
                    <li>Lifestyle factors:
                      <ul className="pl-4">
                        <li>Smoker: +50%</li>
                        <li>Regular drinker: +30%</li>
                        <li>Sedentary: +20%</li>
                        <li>Active: -10%</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Age: {formData.age}</label>
                  <Slider
                    value={formData.age}
                    max={80}
                    min={18}
                    onChange={(value) => handleInputChange("age", value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Coverage Amount: ₹{formData.coverageAmount.toLocaleString()}
                  </label>
                  <Slider
                    value={formData.coverageAmount}
                    max={5000000}
                    min={100000}
                    step={100000}
                    onChange={(value) => handleInputChange("coverageAmount", value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lifestyle</label>
                  <Radio.Group
                    value={formData.lifestyle}
                    onChange={(e) => handleInputChange("lifestyle", e.target.value)}
                    className="w-full"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <Radio.Button value="non_smoker">Non-smoker</Radio.Button>
                      <Radio.Button value="smoker">Smoker</Radio.Button>
                      <Radio.Button value="active">Active</Radio.Button>
                      <Radio.Button value="sedentary">Sedentary</Radio.Button>
                      <Radio.Button value="occasional_drinker">Occasional Drinker</Radio.Button>
                      <Radio.Button value="regular_drinker">Regular Drinker</Radio.Button>
                    </div>
                  </Radio.Group>
                </div>

                <Button 
                  type="primary"
                  className="w-full h-10 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                  onClick={calculatePremium}
                  icon={<ArrowRightOutlined />}
                >
                  Calculate Premium
                </Button>
              </div>
            </Card>

            <Card 
              title="Premium Breakdown"
              className="shadow-xl bg-white/95 backdrop-blur"
            >
              {premium ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">Estimated Premium</p>
                    <p className="text-4xl font-bold text-indigo-600">
                      ₹{premium.toLocaleString()}
                    </p>
                    <p className="text-gray-600">per year</p>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
                        />
                        <Bar dataKey="amount" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value) => `₹${value.toLocaleString()}`}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">Enter your details to calculate premium</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}