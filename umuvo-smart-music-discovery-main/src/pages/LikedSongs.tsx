import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Song } from "@/data/musicData";
import { Play, ArrowLeft, Shuffle } from "lucide-react";

const LikedSongs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedSongs") || "[]");
    setLikedSongs(stored);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Playlist Header */}
      <div className="p-6 space-y-4">
        <div className="w-full aspect-square max-w-sm mx-auto bg-gradient-to-br from-primary to-primary/30 rounded-lg flex items-center justify-center">
          {likedSongs.length > 0 ? (
            <div className="grid grid-cols-2 gap-1 w-full h-full p-2">
              {likedSongs.slice(0, 4).map((song, index) => (
                <img
                  key={index}
                  src={song.coverUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          ) : (
            <div className="text-4xl">❤️</div>
          )}
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Músicas Curtidas</h1>
          <p className="text-muted-foreground">Por {user?.username}</p>
          <p className="text-sm text-muted-foreground">
            {likedSongs.length} {likedSongs.length === 1 ? "música" : "músicas"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full h-14 w-14" disabled={likedSongs.length === 0}>
            <Play className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-14 w-14"
            disabled={likedSongs.length === 0}
          >
            <Shuffle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Songs List */}
      <div className="px-4 space-y-2">
        {likedSongs.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-lg text-muted-foreground">
              Você ainda não curtiu nenhuma música
            </p>
            <Button onClick={() => navigate("/recommendations")}>
              Descobrir Músicas
            </Button>
          </div>
        ) : (
          likedSongs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-card/50 transition-colors"
            >
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-14 h-14 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {song.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {song.artist}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
