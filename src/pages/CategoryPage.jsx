import React, { useState } from "react";
import { Headphones, BookOpen, Radio, Music, Mic2, Zap, Heart, Calendar } from "lucide-react";
import MusicCard from "../components/MusicCard";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("music");

  const categories = [
    { id: "music", name: "Music", icon: Music, color: "from-purple-500 to-pink-500" },
    { id: "podcasts", name: "Podcasts", icon: Headphones, color: "from-blue-500 to-cyan-500" },
    { id: "audiobooks", name: "Audiobooks", icon: BookOpen, color: "from-green-500 to-teal-500" },
    { id: "radio", name: "Radio Stations", icon: Radio, color: "from-orange-500 to-red-500" },
    { id: "live", name: "Live Sessions", icon: Zap, color: "from-yellow-500 to-amber-500" },
    { id: "dj", name: "DJ Mixes", icon: Mic2, color: "from-indigo-500 to-purple-500" },
    { id: "relaxation", name: "Relaxation", icon: Heart, color: "from-pink-500 to-rose-500" },
    { id: "events", name: "Events", icon: Calendar, color: "from-gray-500 to-blue-500" }
  ];

  // Sample content for each category
  const categoryContent = {
    music: [
      { title: "Top Hits 2024", subtitle: "Popular tracks", image: "" },
      { title: "Chill Vibes", subtitle: "Relaxing music", image: "" },
      { title: "Workout Mix", subtitle: "Energy boost", image: "" }
    ],
    podcasts: [
      { title: "Tech Talk Daily", subtitle: "Technology news", image: "" },
      { title: "True Crime Stories", subtitle: "Mystery & investigation", image: "" },
      { title: "Health & Wellness", subtitle: "Self improvement", image: "" }
    ],
    audiobooks: [
      { title: "Best Sellers", subtitle: "Popular books", image: "" },
      { title: "Self Help", subtitle: "Personal growth", image: "" },
      { title: "Fiction", subtitle: "Storytelling", image: "" }
    ]
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const IconComponent = currentCategory?.icon || Music;

  return (
    <div className="p-6 text-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Content</h1>
        <p className="text-gray-400">Explore different types of audio experiences</p>
      </div>

      {/* Category Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const CatIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r " + category.color + " text-white shadow-lg"
                    : "bg-[#1e1e1e] border border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a]"
                }`}
              >
                <CatIcon size={24} className="mb-2" />
                <h3 className="font-semibold">{category.name}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Content */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${currentCategory?.color}`}>
            <IconComponent size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">{currentCategory?.name}</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(categoryContent[selectedCategory] || []).map((item, index) => (
            <MusicCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
            />
          ))}
        </div>

        {/* Empty State */}
        {!categoryContent[selectedCategory] && (
          <div className="text-center py-12">
            <div className={`w-16 h-16 bg-gradient-to-r ${currentCategory?.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
              <IconComponent size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-gray-400">{currentCategory?.name} content will be available soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;