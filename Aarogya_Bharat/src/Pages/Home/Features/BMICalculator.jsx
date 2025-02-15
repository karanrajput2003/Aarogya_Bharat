import React, { useState } from 'react';
import { Card, Slider, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../../../Components/Home/Navbar'


const BMICalculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBMI] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const calculateBMI = () => {
    const bmiValue = (weight / Math.pow(height / 100, 2)).toFixed(1);
    setBMI(parseFloat(bmiValue));
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: '#f59e0b', risk: 'Increased risk of nutritional deficiencies and osteoporosis' };
    if (bmiValue < 25) return { category: 'Normal', color: '#10b981', risk: 'Lowest risk of health problems' };
    if (bmiValue < 30) return { category: 'Overweight', color: '#f97316', risk: 'Increased risk of heart disease and diabetes' };
    return { category: 'Obese', color: '#ef4444', risk: 'High risk of multiple health problems' };
  };

  const getBMIData = () => {
    const data = [];
    for (let w = 40; w <= 120; w += 10) {
      data.push({
        weight: w,
        bmi: +(w / Math.pow(height / 100, 2)).toFixed(1)
      });
    }
    return data;
  };

  const { category, color, risk } = bmi ? getBMICategory(bmi) : { category: '', color: '', risk: '' };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">BMI Calculator</h1>
            <p className="text-cyan-100">Calculate your Body Mass Index</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 shadow-xl bg-white/95 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Calculate Your BMI</h2>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {/* <InfoCircleOutlined className="w-5 h-5" /> */}
                </button>
              </div>

              {showInfo && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">How BMI is Calculated</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>BMI = Weight (kg) / Height² (m²)</p>
                    <div className="p-3 bg-white rounded">
                      <p className="font-medium">Example:</p>
                      <p>Height: 170 cm (1.7 m)</p>
                      <p>Weight: 70 kg</p>
                      <p>BMI = 70 / (1.7)² = 24.2</p>
                    </div>
                    <h4 className="font-medium mt-2">BMI Categories:</h4>
                    <ul className="space-y-1">
                      <li><span className="inline-block w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>Underweight: &lt; 18.5</li>
                      <li><span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>Normal: 18.5 - 24.9</li>
                      <li><span className="inline-block w-4 h-4 rounded-full bg-orange-500 mr-2"></span>Overweight: 25 - 29.9</li>
                      <li><span className="inline-block w-4 h-4 rounded-full bg-red-500 mr-2"></span>Obese: ≥ 30</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Height: {height} cm
                  </label>
                  <Slider
                    value={height}
                    min={120}
                    max={220}
                    onChange={(value) => setHeight(value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Weight: {weight} kg
                  </label>
                  <Slider
                    value={weight}
                    min={40}
                    max={120}
                    onChange={(value) => setWeight(value)}
                    className="w-full"
                  />
                </div>

                <Button 
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                >
                  Calculate BMI
                </Button>
              </div>
            </Card>

            <Card className="p-6 shadow-xl bg-white/95 backdrop-blur">
              {bmi ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">Your BMI</p>
                    <p className="text-4xl font-bold" style={{ color }}>
                      {bmi}
                    </p>
                    <p className="text-lg font-semibold" style={{ color }}>
                      {category}
                    </p>
                    <p className="text-sm text-gray-600">{risk}</p>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getBMIData()}>
                        <XAxis 
                          dataKey="weight" 
                          label={{ value: 'Weight (kg)', position: 'bottom' }}
                        />
                        <YAxis 
                          label={{ value: 'BMI', angle: -90, position: 'left' }}
                        />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="bmi" 
                          stroke="#4f46e5" 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-2 rounded bg-gray-50">
                      <p className="font-medium">Healthy BMI Range</p>
                      <p className="text-gray-600">18.5 - 24.9</p>
                    </div>
                    <div className="p-2 rounded bg-gray-50">
                      <p className="font-medium">Ideal Weight Range</p>
                      <p className="text-gray-600">
                        {Math.round(18.5 * Math.pow(height / 100, 2))} - {Math.round(24.9 * Math.pow(height / 100, 2))} kg
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    Enter your details to calculate BMI
                  </p>
                </div>
              )}
            </Card>
          </div>

          <Card className="p-6 shadow-xl bg-white/95 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">Important Notes About BMI</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-2">BMI Limitations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Doesn't distinguish between weight from muscle and fat</li>
                  <li>• May not be accurate for athletes or elderly people</li>
                  <li>• Doesn't account for body fat distribution</li>
                  <li>• May vary for different ethnic groups</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">When to Consult a Doctor</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• BMI is significantly above or below normal range</li>
                  <li>• Rapid weight changes without lifestyle changes</li>
                  <li>• Concerns about weight affecting health</li>
                  <li>• Before starting any major weight change program</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default BMICalculator;