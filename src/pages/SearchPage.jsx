import React, { useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import MusicCard from "../components/MusicCard";
import shapeOfYou from "../assets/shape_of_you.mp3";
import oceanEyes from "../assets/ocean_eyes.mp3";
import loseYourself from "../assets/lose_yourself.mp3";
import heatWaves from "../assets/heat_waves.mp3";
import levitating from "../assets/levitating.mp3";
import starboy from "../assets/starboy.mp3";
import badGuy from "../assets/bad_guy.mp3";
import sunflower from "../assets/sunflower.mp3";
import blindinglight from "../assets/blinding_lights.mp3";
import stay from "../assets/stay.mp3";
import creep from "../assets/creep.mp3";
import hotelcalifornia from "../assets/hotel_california.mp3";
import bohemain from "../assets/bohemian.mp3";
import rolling from "../assets/rolling.mp3";
import asitwas from "../assets/asitwas.mp3";
import oceaneye from "../assets/oceaneyepic.jpg";
import eminem from "../assets/Eminem.jpg";
import shapeofyoued from "../assets/Edshapeofyou.jpeg";
import glassanimals from "../assets/glassanimals.jpeg";
import lavitatingpic from "../assets/dualipa.jpg";
import starboypic from "../assets/starboypic.webp";
import badguypic from "../assets/billieElish.jpg";
import sunflowerpic from "../assets/sunfloerpic.webp";
import blindinglightpic from "../assets/blindinglight.jpeg";
import staypic from "../assets/staypic.png";
import creepimg from "../assets/creepimg.jpg";
import asitwaspic from "../assets/asitwaspic.jpeg";
import queen from "../assets/queen.png";
import adele from "../assets/adele.png";
import eagles from "../assets/eagles.jpg";
import { image } from "framer-motion/client";


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Real-world track database 
  const allTracks = [
    { id: 'blinding-lights', title: "Blinding Lights", artist: "The Weeknd", genre: "Pop", audio: blindinglight, image: blindinglightpic },
    { id: 'shape-of-you', title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", audio: shapeOfYou, image:shapeofyoued },
    { id: 'bad-guy', title: "Bad Guy", artist: "Billie Eilish", genre: "Alternative", audio: badGuy, image: badguypic },
    { id: 'levitating', title: "Levitating", artist: "Dua Lipa", genre: "Pop", audio: levitating, image: lavitatingpic },
    { id: 'stay', title: "Stay", artist: "The Kid LAROI, Justin Bieber", genre: "Pop", audio: stay, image: staypic },
    { id: 'creep', title: "Creep", artist: "Radiohead", genre: "Rock", audio: creep, image: creepimg },
    { id: 'lose-yourself', title: "Lose Yourself", artist: "Eminem", genre: "Hip-Hop", audio: loseYourself, image:eminem },
    { id: 'hotel-california', title: "Hotel California", artist: "Eagles", genre: "Rock", audio: hotelcalifornia, image: eagles },
    { id: 'bohemian-rhapsody', title: "Bohemian Rhapsody", artist: "Queen", genre: "Classic Rock", audio: bohemain, image: queen },
    { id: 'rolling-in-the-deep', title: "Rolling in the Deep", artist: "Adele", genre: "Pop", audio: rolling, image: adele },
    { id: 'ocean-eyes', title: "Ocean Eyes", artist: "Billie Eilish", genre: "Alternative", audio: oceanEyes, image: oceaneye },
    { id: 'heat-waves', title: "Heat Waves", artist: "Glass Animals", genre: "Indie", audio: heatWaves, image: glassanimals },
    { id: 'starboy', title: "Starboy", artist: "The Weeknd", genre: "Pop", audio: starboy, image: starboypic },
    { id: 'sunflower', title: "Sunflower", artist: "Post Malone, Swae Lee", genre: "Hip-Hop", audio: sunflower, image: sunflowerpic },
    { id: 'as-it-was', title: "As It Was", artist: "Harry Styles", genre: "Pop", audio: asitwas, image:asitwaspic },
  ];

  // Trending searches (popular genres)
  const trendingSearches = [
    "Pop", "Hip-Hop", "Rock", "Indie", "EDM", "Classic Rock"
  ];

  // Search function
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Filter tracks based on title, artist, or genre
    const results = allTracks.filter(track =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.genre.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  };

  // Handle trending search click
  const handleTrendingClick = (term) => {
    handleSearch(term);
  };

  return (
    <main className="flex-grow p-6 overflow-y-auto">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Search</h1>

        {/* Search Input */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for songs, artists, or genres..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">
            Search Results for "{searchQuery}" ({searchResults.length} found)
          </h2>

          {isSearching ? (
            <div className="text-center py-8">
              <div className="animate-pulse text-gray-400">Searching...</div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.map((track) => (
                <MusicCard
                  key={track.id}
                  track={{...track, subtitle: track.artist}}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No results found</p>
              <p className="text-gray-500 text-sm">Try searching for something else</p>
            </div>
          )}
        </div>
      ) : (
        /* Default View - Trending Searches & Browse */
        <div>
          {/* Trending Searches */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-bold text-white">Trending Searches</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {trendingSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleTrendingClick(term)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/30 rounded-full text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </section>

          {/* Browse by Genre */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Pop", color: "from-pink-500 to-purple-500" },
                { name: "Hip-Hop", color: "from-yellow-500 to-red-500" },
                { name: "Rock", color: "from-blue-500 to-indigo-500",  },
                { name: "Indie", color: "from-green-500 to-teal-500", },
                { name: "EDM", color: "from-cyan-500 to-blue-500",  },
                { name: "Classic Rock", color: "from-orange-500 to-red-500", }
              ].map((genre, index) => (
                <button
                  key={index}
                  onClick={() => handleTrendingClick(genre.name)}
                  className={`relative p-6 bg-gradient-to-br ${genre.color} rounded-xl text-white font-semibold text-left hover:scale-105 transition-transform duration-300 group overflow-hidden`}
                >
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1">{genre.name}</h3>
                    <p className="text-sm opacity-90">{genre.tracks}</p>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </button>
              ))}
            </div>
          </section>

          {/* Discover Music */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Discover Music</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {allTracks.slice(0, 15).map((track) => (
                <MusicCard
                  key={track.id}
                  track={{...track, subtitle: track.artist}}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default SearchPage;