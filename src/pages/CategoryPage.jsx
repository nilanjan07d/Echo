import React, { useState } from "react";
import { Headphones, BookOpen, Radio, Music, Mic2, Zap, Heart, Calendar } from "lucide-react";
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

  // Updated categoryContent with all songs from SearchPage
  const categoryContent = {
    music: [
      { 
        id: "blinding-lights-cat", 
        title: "Blinding Lights", 
        artist: "The Weeknd", 
        subtitle: "The Weeknd",
        genre: "Pop",
        audio: blindinglight,
        image: blindinglightpic 
      },
      { 
        id: "shape-of-you-cat", 
        title: "Shape of You", 
        artist: "Ed Sheeran", 
        subtitle: "Ed Sheeran",
        genre: "Pop",
        audio: shapeOfYou,
        image: shapeofyoued 
      },
      { 
        id: "bad-guy-cat", 
        title: "Bad Guy", 
        artist: "Billie Eilish", 
        subtitle: "Billie Eilish",
        genre: "Alternative",
        audio: badGuy,
        image: badguypic 
      },
      { 
        id: "levitating-cat", 
        title: "Levitating", 
        artist: "Dua Lipa", 
        subtitle: "Dua Lipa",
        genre: "Pop",
        audio: levitating,
        image: lavitatingpic 
      },
      { 
        id: "stay-cat", 
        title: "Stay", 
        artist: "The Kid LAROI, Justin Bieber", 
        subtitle: "The Kid LAROI, Justin Bieber",
        genre: "Pop",
        audio: stay,
        image: staypic 
      },
      { 
        id: "creep-cat", 
        title: "Creep", 
        artist: "Radiohead", 
        subtitle: "Radiohead",
        genre: "Rock",
        audio: creep,
        image: creepimg 
      },
      { 
        id: "lose-yourself-cat", 
        title: "Lose Yourself", 
        artist: "Eminem", 
        subtitle: "Eminem",
        genre: "Hip-Hop",
        audio: loseYourself,
        image: eminem 
      },
      { 
        id: "hotel-california-cat", 
        title: "Hotel California", 
        artist: "Eagles", 
        subtitle: "Eagles",
        genre: "Rock",
        audio: hotelcalifornia,
        image: eagles 
      },
      { 
        id: "bohemian-rhapsody-cat", 
        title: "Bohemian Rhapsody", 
        artist: "Queen", 
        subtitle: "Queen",
        genre: "Classic Rock",
        audio: bohemain,
        image: queen 
      },
      { 
        id: "rolling-in-the-deep-cat", 
        title: "Rolling in the Deep", 
        artist: "Adele", 
        subtitle: "Adele",
        genre: "Pop",
        audio: rolling,
        image: adele 
      },
      { 
        id: "ocean-eyes-cat", 
        title: "Ocean Eyes", 
        artist: "Billie Eilish", 
        subtitle: "Billie Eilish",
        genre: "Alternative",
        audio: oceanEyes,
        image: oceaneye 
      },
      { 
        id: "heat-waves-cat", 
        title: "Heat Waves", 
        artist: "Glass Animals", 
        subtitle: "Glass Animals",
        genre: "Indie",
        audio: heatWaves,
        image: glassanimals 
      },
      { 
        id: "starboy-cat", 
        title: "Starboy", 
        artist: "The Weeknd", 
        subtitle: "The Weeknd",
        genre: "Pop",
        audio: starboy,
        image: starboypic 
      },
      { 
        id: "sunflower-cat", 
        title: "Sunflower", 
        artist: "Post Malone, Swae Lee", 
        subtitle: "Post Malone, Swae Lee",
        genre: "Hip-Hop",
        audio: sunflower,
        image: sunflowerpic 
      },
      { 
        id: "as-it-was-cat", 
        title: "As It Was", 
        artist: "Harry Styles", 
        subtitle: "Harry Styles",
        genre: "Pop",
        audio: asitwas,
        image: asitwaspic 
      }
    ],
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {(categoryContent[selectedCategory] || []).map((item, index) => (
            <MusicCard
              key={item.id || index}
              track={item}
            />
          ))}
        </div>

        {/* Empty State */}
        {(!categoryContent[selectedCategory] || categoryContent[selectedCategory].length === 0) && (
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