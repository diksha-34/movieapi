import React, { useEffect, useState } from "react";

function MovieCard({ movie }) {
  const placeholderImage = "https://via.placeholder.com/300x400";

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
    
      <img
        src={movie.image || placeholderImage} 
        alt={movie.movie || "No title available"}
        className="w-full h-64 object-cover"
        onError={(e) => (e.target.src = placeholderImage)} 
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{movie.movie}</h3>
        <p className="text-gray-600">Rating: {movie.rating}</p>
        <a
          href={movie.imdb_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on IMDb
        </a>
      </div>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://dummyapi.online/api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }
        const data = await response.json();
        setMovies(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Movie Database
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
