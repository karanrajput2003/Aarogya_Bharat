import React, { useState, useEffect } from "react";
import { Input, List, Button, message, Spin } from "antd";
import { MapPin, Navigation2, Search as SearchIcon } from "lucide-react";
import { Map, Marker, Overlay } from "pigeon-maps";

const NearByMedical = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState([19.0473, 72.818]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("medical");
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
          message.success("Location found successfully!");
        },
        (error) => {
          message.error(
            "Unable to get your location. Please enable location services."
          );
        }
      );
    }
  };

  const searchNearbyPlaces = async (searchText = "") => {
    if (!userLocation) return;

    setLoading(true);

    const [lat, lon] = userLocation;
    const radius = 5000; // 5 km in meters

    try {
      const query = searchType === "medical" ? "medical store" : "medical lab";
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText} ${query}&addressdetails=1&limit=10&bounded=1&viewbox=${
          lon - 0.1
        },${lat - 0.1},${lon + 0.1},${lat + 0.1}`
      );
      const data = await response.json();

      const placesData = data.map((place) => ({
        id: place.place_id,
        name: place.display_name,
        address:
          place.address.road ||
          place.address.suburb ||
          place.address.city ||
          place.address.state,
        location: [parseFloat(place.lat), parseFloat(place.lon)],
        distance: calculateDistance(
          lat,
          lon,
          parseFloat(place.lat),
          parseFloat(place.lon)
        ),
      }));

      setPlaces(placesData);
      setLoading(false);
    } catch (error) {
      message.error("Error fetching nearby places");
      setLoading(false);
    }
  };

  const handleTextSearch = (searchText) => {
    setCurrentPage(1);
    searchNearbyPlaces(searchText);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              Nearby Healthcare Facilities
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Find medical stores and labs in your vicinity
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                onChange={(e) => handleTextSearch(e.target.value)}
              />
            </div>

            {/* Facility Type Tabs */}
            <div className="flex space-x-4">
              <button
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  searchType === "medical"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSearchType("medical");
                  setCurrentPage(1);
                  searchNearbyPlaces();
                }}
              >
                Medical Stores
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  searchType === "lab"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSearchType("lab");
                  setCurrentPage(1);
                  searchNearbyPlaces();
                }}
              >
                Medical Labs
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Map Section */}
              <div className="rounded-xl overflow-hidden shadow-lg h-[500px]">
                <Map center={center} zoom={14} width="100%" height="100%">
                  {userLocation && <Marker anchor={userLocation} color="#3b82f6" />}
                  {paginatedPlaces.map((place) => (
                    <Marker
                      key={place.id}
                      anchor={place.location}
                      color="#ef4444"
                      onClick={() => handleMarkerClick(place)}
                    />
                  ))}
                  {selectedPlace && (
                    <Overlay anchor={selectedPlace.location} offset={[120, 79]}>
                      <div className="bg-white rounded-lg shadow-lg p-3 w-64">
                        <h3 className="font-semibold text-gray-900">
                          {selectedPlace.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedPlace.address}
                        </p>
                        <p className="text-sm text-blue-600 mt-1 font-medium">
                          {selectedPlace.distance} km away
                        </p>
                      </div>
                    </Overlay>
                  )}
                </Map>
              </div>

              {/* Places List */}
              <div className="rounded-xl bg-white shadow-lg overflow-hidden">
                {loading ? (
                  <div className="flex justify-center items-center h-[500px]">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="h-[500px] overflow-y-auto">
                    <List
                      className="divide-y divide-gray-100"
                      dataSource={paginatedPlaces}
                      renderItem={(place) => (
                        <List.Item
                          className="p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => handleMarkerClick(place)}
                        >
                          <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {place.name}
                            </h3>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="text-sm">{place.address}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Navigation2 className="w-4 h-4 mr-2" />
                              <span className="text-sm">
                                {place.distance} km away
                              </span>
                            </div>
                            <Button
                              type="primary"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (userLocation) {
                                  window.open(
                                    `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${place.location[0]},${place.location[1]}`
                                  );
                                } else {
                                  message.warning(
                                    "Please enable location services for directions"
                                  );
                                }
                              }}
                            >
                              Get Directions
                            </Button>
                          </div>
                        </List.Item>
                      )}
                    />
                    {paginatedPlaces.length < places.length && (
                      <div className="p-4 border-t border-gray-100">
                        <button
                          onClick={loadMorePlaces}
                          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2 rounded-lg transition-colors"
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearByMedical;