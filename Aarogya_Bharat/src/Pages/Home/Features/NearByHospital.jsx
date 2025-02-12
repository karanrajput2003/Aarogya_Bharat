import React, { useState, useEffect } from 'react';
import { Card, Input, List, Space, Button, message, Spin } from 'antd';
import { MapPin, Navigation2 } from 'lucide-react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import Navbar from '../../../Components/Home/Navbar';

const { Search } = Input;

const NearByHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState([null,null]  ); 
  const [loading, setLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [center, setCenter] = useState([19.0760, 72.8777]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      searchNearbyHospitals();
    }
  }, [userLocation, currentPage]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = [position.coords.latitude, position.coords.longitude];
          setUserLocation(userPos);
          setCenter(userPos);
          message.success('Location found successfully!');
        },
        (error) => {
          message.error('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  const searchNearbyHospitals = async (searchText = '') => {
    if (!userLocation) return;

    setLoading(true);

    const [lat, lon] = userLocation;
    const radius = 5000; // 5 km in meters

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText} hospital&addressdetails=1&limit=10&bounded=1&viewbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}`);
      const data = await response.json();

      const hospitalsData = data.map(place => ({
        id: place.place_id,
        name: place.display_name,
        address: place.address.road || place.address.suburb || place.address.city || place.address.state,
        location: [parseFloat(place.lat), parseFloat(place.lon)],
        distance: calculateDistance(lat, lon, parseFloat(place.lat), parseFloat(place.lon))
      }));

      setHospitals(hospitalsData);
      setLoading(false);
    } catch (error) {
      message.error('Error fetching nearby hospitals');
      setLoading(false);
    }
  };

  const handleTextSearch = (searchText) => {
    setCurrentPage(1);
    searchNearbyHospitals(searchText);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const loadMoreHospitals = () => {
    setCurrentPage(currentPage + 1);
  };

  const paginatedHospitals = hospitals.slice(0, currentPage * itemsPerPage);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] py-8">
      <div className="container mx-auto px-4">
        <Card className="shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Nearby Hospitals</h1>
              <p className="text-gray-600">Discover healthcare facilities in your area</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Search
              placeholder="Search hospitals by name"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={handleTextSearch}
              loading={loading}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Map Section */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <Map
                center={center}
                zoom={14}
                width="100%"
                height="400px"
              >
                {userLocation && (
                  <Marker anchor={userLocation} color="blue" />
                )}
                
                {paginatedHospitals.map(hospital => (
                  <Marker
                    key={hospital.id}
                    anchor={hospital.location}
                    color="red"
                    onClick={() => handleMarkerClick(hospital)}
                  />
                ))}

                {selectedHospital && (
                  <Overlay anchor={selectedHospital.location} offset={[120, 79]}>
                    <div className="p-2 bg-white rounded shadow-md">
                      <h3 className="font-semibold">{selectedHospital.name}</h3>
                      <p className="text-sm mt-1">{selectedHospital.address}</p>
                      <p className="text-sm mt-1">📍 {selectedHospital.distance} km away</p>
                    </div>
                  </Overlay>
                )}
              </Map>
            </div>

            {/* Hospital List */}
            <div className="bg-white rounded-lg">
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <Spin size="large" />
                </div>
              ) : (
                <List
                  className="bg-white rounded-lg"
                  itemLayout="vertical"
                  dataSource={paginatedHospitals}
                  renderItem={hospital => (
                    <List.Item
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleMarkerClick(hospital)}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-800">{hospital.name}</h3>
                        </div>
                        
                        <Space className="text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.address}</span>
                        </Space>

                        <div className="flex items-center space-x-1 text-gray-600">
                          <Navigation2 className="w-4 h-4" />
                          <span>{hospital.distance} km away</span>
                        </div>

                        <Button 
                          type="primary" 
                          className="w-full bg-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (userLocation) {
                              window.open(
                                `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${hospital.location[0]},${hospital.location[1]}`
                              );
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
              )}
              {paginatedHospitals.length < hospitals.length && (
                <div className="flex justify-center mt-4">
                  <Button onClick={loadMoreHospitals}>Load More</Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
};

export default NearByHospital;