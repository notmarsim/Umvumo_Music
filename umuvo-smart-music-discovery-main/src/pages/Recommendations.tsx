import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { songs, Song } from "@/data/musicData";
import { X, Heart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
//import LikedSongs from "./LikedSongs";

const Recommendations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [recommendedSongs, setRecommendedSongs] = useState<any[]>([]);

  useEffect(() => {
    // Filter songs based on user preferences
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs"))
    const dislikedSongs = JSON.parse(localStorage.getItem("dislikedSongs"))
    getTracks(likedSongs ? "recommended" : "popular",likedSongs,dislikedSongs)
  }, [user]);

  const currentSong = recommendedSongs[currentSongIndex];

  const getTracks = async (t:string,likedSongs,dislikedSongs) => {
    
    var type = t

    if (!(type == "popular" || type == "recommended")) type = 'popular' 
    console.log(type)
    if (type == 'recommended'){
      const params = new URLSearchParams();
      console.log(likedSongs)
      console.log(dislikedSongs)
      likedSongs.forEach(t => params.append("liked", t.id));
      dislikedSongs.forEach(t => params.append("disliked", t.id))

      const response = await fetch(`http://127.0.0.1:8000/${type}-tracks/20?${params.toString()}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = response.json()
      setRecommendedSongs(await data)
    } else {
      setRecommendedSongs(songs)
    }
    
  }

  const handleDislike = () => {
    const dislikedSongs = JSON.parse(localStorage.getItem("dislikedSongs") || "[]");
    if (!dislikedSongs.find((s: Song) => s.id === currentSong.id)) {
      localStorage.setItem("dislikedSongs", JSON.stringify([...dislikedSongs, currentSong]));
      toast.success(`"${currentSong.title}" adicionada às descurtidas!`);
    } 
    
    // checar se está nas curtidas
    var item = null
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs") || "[]");
    if ((item = likedSongs.find((s: Song) => s.id === currentSong.id))) {
      likedSongs.splice(likedSongs.indexOf(item))
      localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
      toast.success(`"${currentSong.title}" removida das curtidas!`);
    }

    
    if (currentSongIndex < recommendedSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      toast.info("Você chegou ao fim das recomendações!");
      navigate("/home");
    }
  };

  const handleLike = () => {
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs") || "[]");
    if (!likedSongs.find((s: Song) => s.id === currentSong.id)) {
      localStorage.setItem("likedSongs", JSON.stringify([...likedSongs, currentSong]));
      toast.success(`"${currentSong.title}" adicionada às curtidas!`);
    }

    // checar se está nas descurtidas
    var item = null
    const dislikedSongs = JSON.parse(localStorage.getItem("dislikedSongs") || "[]");
    if ((item = dislikedSongs.find((s: Song) => s.id === currentSong.id))) {
      dislikedSongs.splice(dislikedSongs.indexOf(item))
      localStorage.setItem("dislikedSongs", JSON.stringify(dislikedSongs));
      toast.success(`"${currentSong.title}" removida das descurtidas!`);
    }
    
    if (currentSongIndex < recommendedSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      toast.info("Você chegou ao fim das recomendações!");
      navigate("/home");
    }
  };

  if (!currentSong) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando recomendações...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Recomendações Inteligentes</h1>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className="w-full aspect-square object-cover"
            />
            <div className="p-6 space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {currentSong.title}
              </h2>
              <p className="text-lg text-muted-foreground">{currentSong.artist}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {currentSong.genre}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-8">
            <Button
              size="lg"
              variant="outline"
              className="h-16 w-16 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleDislike}
            >
              <X className="h-8 w-8" />
            </Button>
            <Button
              size="lg"
              className="h-16 w-16 rounded-full"
              onClick={handleLike}
            >
              <Heart className="h-8 w-8" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {currentSongIndex + 1} de {recommendedSongs.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
