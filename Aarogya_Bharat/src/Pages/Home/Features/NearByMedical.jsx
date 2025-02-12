import React, { useState, useEffect } from 'react';
import { Card, Input, List, Space, Button, message, Spin } from 'antd';
import { MapPin, Navigation2 } from 'lucide-react';
import { Map, Marker, Overlay } from 'pigeon-maps';

const { Search } = Input;

const NearByMedical = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState([19.0473, 72.8180]); // Default to Bandra Bandstand
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState([19.0473, 72.8180]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState('medical'); // Default to medicals
  const itemsPerPage = 7;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      searchNearbyPlaces();
    }
  }, [userLocation, currentPage, searchType]);

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

  const searchNearbyPlaces = async (searchText = '') => {
    if (!userLocation) return;

    setLoading(true);

    const [lat, lon] = userLocation;
    const radius = 5000; // 5 km in meters

    try {
      const query = searchType === 'medical' ? 'medical store' : 'medical lab';
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText} ${query}&addressdetails=1&limit=10&bounded=1&viewbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}`);
      const data = await response.json();

      const placesData = data.map(place => ({
        id: place.place_id,
        name: place.display_name,
        address: place.address.road || place.address.suburb || place.address.city || place.address.state,
        location: [parseFloat(place.lat), parseFloat(place.lon)],
        distance: calculateDistance(lat, lon, parseFloat(place.lat), parseFloat(place.lon))
      }));

      setPlaces(placesData);
      setLoading(false);
    } catch (error) {
      message.error('Error fetching nearby places');
      setLoading(false);
    }
  };

  const handleTextSearch = (searchText) => {
    setCurrentPage(1);
    searchNearbyPlaces(searchText);
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

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const loadMorePlaces = () => {
    setCurrentPage(currentPage + 1);
  };

  const paginatedPlaces = places.slice(0, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Card className="shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Nearby Medicals and Labs</h1>
              <p className="text-gray-600">Discover healthcare facilities in your area</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Search
              placeholder="Search by name"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={handleTextSearch}
              loading={loading}
            />
          </div>

          <div className="flex justify-center mb-6">
            <Button
              type={searchType === 'medical' ? 'primary' : 'default'}
              onClick={() => {
                setSearchType('medical');
                setCurrentPage(1);
                searchNearbyPlaces();
              }}
            >
              Medical Stores
            </Button>
            <Button
              type={searchType === 'lab' ? 'primary' : 'default'}
              onClick={() => {
                setSearchType('lab');
                setCurrentPage(1);
                searchNearbyPlaces();
              }}
              style={{ marginLeft: '10px' }}
            >
              Medical Labs
            </Button>
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
                
                {paginatedPlaces.map(place => (
                  <Marker
                    key={place.id}
                    anchor={place.location}
                    color="red"
                    onClick={() => handleMarkerClick(place)}
                  />
                ))}

                {selectedPlace && (
                  <Overlay anchor={selectedPlace.location} offset={[120, 79]}>
                    <div className="p-2 bg-white rounded shadow-md">
                      <h3 className="font-semibold">{selectedPlace.name}</h3>
                      <p className="text-sm mt-1">{selectedPlace.address}</p>
                      <p className="text-sm mt-1">📍 {selectedPlace.distance} km away</p>
                    </div>
                  </Overlay>
                )}
              </Map>
            </div>

            {/* Place List */}
            <div className="bg-white rounded-lg">
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <Spin size="large" />
                </div>
              ) : (
                <List
                  className="bg-white rounded-lg"
                  itemLayout="vertical"
                  dataSource={paginatedPlaces}
                  renderItem={place => (
                    <List.Item
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleMarkerClick(place)}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
                        </div>
                        
                        <Space className="text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{place.address}</span>
                        </Space>

                        <div className="flex items-center space-x-1 text-gray-600">
                          <Navigation2 className="w-4 h-4" />
                          <span>{place.distance} km away</span>
                        </div>

                        <Button 
                          type="primary" 
                          className="w-full bg-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (userLocation) {
                              window.open(
                                `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${place.location[0]},${place.location[1]}`
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
              {paginatedPlaces.length < places.length && (
                <div className="flex justify-center mt-4">
                  <Button onClick={loadMorePlaces}>Load More</Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NearByMedical;