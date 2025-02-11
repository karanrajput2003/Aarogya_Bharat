import React, { useState, useEffect } from 'react';
import { Card, Input, Select, List, Space, Rate, Button, message, Modal, Form } from 'antd';
import { MapPin, Navigation2, Building2, Map, Plus } from 'lucide-react';

const { Search } = Input;
const { Option } = Select;

// Initial hospital data stored in localStorage
const initialHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    address: "123 Healthcare Ave",
    rating: 4.5,
    distance: "1.2",
    specialties: ["Emergency", "Surgery", "Pediatrics"],
    beds: 200,
    type: "Government",
    lat: 19.0760,
    lng: 72.8777
  },
  {
    id: 2,
    name: "Medicare Plus",
    address: "456 Medical Drive",
    rating: 4.2,
    distance: "2.1",
    specialties: ["Cardiology", "Orthopedics"],
    beds: 150,
    type: "Private",
    lat: 19.0830,
    lng: 72.8800
  }
];

// Load hospitals from localStorage or use initial data
const loadHospitals = () => {
  const stored = localStorage.getItem('hospitals');
  return stored ? JSON.parse(stored) : initialHospitals;
};

const NearByHospital = () => {
  const [hospitals, setHospitals] = useState(loadHospitals());
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Get user's location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Save hospitals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
    setFilteredHospitals(hospitals);
  }, [hospitals]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          message.success('Location found successfully!');
        },
        (error) => {
          message.error('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  // Search functionality
  const handleSearch = (value) => {
    setLoading(true);
    const searchResults = hospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(value.toLowerCase()) ||
      hospital.address.toLowerCase().includes(value.toLowerCase())
    );
    
    if (userLocation) {
      searchResults.forEach(hospital => {
        hospital.distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.lat,
          hospital.lng
        );
      });
    }
    
    setFilteredHospitals(searchResults);
    setLoading(false);
  };

  // Filter by type
  const handleTypeFilter = (value) => {
    if (value === 'all') {
      setFilteredHospitals(hospitals);
      return;
    }
    const filtered = hospitals.filter(hospital => 
      hospital.type.toLowerCase() === value.toLowerCase()
    );
    setFilteredHospitals(filtered);
  };

  // Filter by distance
  const handleDistanceFilter = (maxDistance) => {
    if (!userLocation) {
      message.warning('Please enable location services to filter by distance');
      return;
    }

    const filtered = hospitals.filter(hospital => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        hospital.lat,
        hospital.lng
      );
      return parseFloat(distance) <= parseFloat(maxDistance);
    });
    setFilteredHospitals(filtered);
  };

  // Add new hospital
  const handleAddHospital = (values) => {
    const newHospital = {
      id: hospitals.length + 1,
      ...values,
      rating: 0,
      specialties: values.specialties.split(',').map(s => s.trim()),
      lat: parseFloat(values.lat),
      lng: parseFloat(values.lng)
    };

    setHospitals([...hospitals, newHospital]);
    setIsModalVisible(false);
    form.resetFields();
    message.success('Hospital added successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Card className="shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Nearby Hospitals</h1>
              <p className="text-gray-600">Discover healthcare facilities in your area</p>
            </div>
            <Button 
              type="primary" 
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalVisible(true)}
              className="bg-blue-600"
            >
              Add Hospital
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Search
              placeholder="Search hospitals by name or location"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={handleSearch}
              loading={loading}
            />
            
            <Select
              size="large"
              defaultValue="all"
              onChange={handleTypeFilter}
              className="w-full"
            >
              <Option value="all">All Types</Option>
              <Option value="government">Government</Option>
              <Option value="private">Private</Option>
            </Select>

            <Select
              size="large"
              defaultValue="5"
              onChange={handleDistanceFilter}
              className="w-full"
            >
              <Option value="2">Within 2 km</Option>
              <Option value="5">Within 5 km</Option>
              <Option value="10">Within 10 km</Option>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Map Section */}
            <div className="bg-gray-100 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Map className="w-12 h-12 mx-auto mb-2" />
                <p>Map integration requires Google Maps API key</p>
                <p className="text-sm">
                  Current coordinates: {userLocation ? 
                    `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 
                    'Fetching location...'}
                </p>
              </div>
            </div>

            {/* Hospital List */}
            <List
              className="bg-white rounded-lg"
              itemLayout="vertical"
              dataSource={filteredHospitals}
              loading={loading}
              renderItem={hospital => (
                <List.Item
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800">{hospital.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {hospital.type}
                      </span>
                    </div>
                    
                    <Space className="text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{hospital.address}</span>
                    </Space>

                    <div className="flex items-center space-x-4">
                      <Rate disabled defaultValue={hospital.rating} className="text-sm" />
                      <span className="text-gray-600">({hospital.rating})</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <span>{hospital.beds} beds</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Navigation2 className="w-4 h-4" />
                        <span>{hospital.distance} km</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map(specialty => (
                        <span 
                          key={specialty}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <Button 
                      type="primary" 
                      className="w-full bg-blue-600"
                      onClick={() => {
                        if (userLocation) {
                          window.open(`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${hospital.lat},${hospital.lng}`);
                        } else {
                          message.warning('Please enable location services for directions');
                        }
                      }}
                    >
                      Get Directions
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Card>

        {/* Add Hospital Modal */}
        <Modal
          title="Add New Hospital"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddHospital}
          >
            <Form.Item
              name="name"
              label="Hospital Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Government">Government</Option>
                <Option value="Private">Private</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="beds"
              label="Number of Beds"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="specialties"
              label="Specialties (comma-separated)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lat"
              label="Latitude"
              rules={[{ required: true }]}
            >
              <Input type="number" step="0.0001" />
            </Form.Item>

            <Form.Item
              name="lng"
              label="Longitude"
              rules={[{ required: true }]}
            >
              <Input type="number" step="0.0001" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full bg-blue-600">
                Add Hospital
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default NearByHospital;