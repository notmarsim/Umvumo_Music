import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home as HomeIcon, Search, Library, Sparkles, Heart } from "lucide-react";
import { songs } from "@/data/musicData";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const userPreferenceSongs = songs.filter((song) =>
    user?.preferences.includes(song.genre)
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={user?.photoUrl} />
                  <AvatarFallback className="bg-card">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-card">
              <DropdownMenuItem onClick={() => navigate("/preferences")}>
                Alterar Preferências Musicais
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                logout();
                navigate("/");
              }}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <h1 className="text-xl font-bold">Umuvo</h1>
          <div className="w-10" />
        </div>

        <Input
          type="search"
          placeholder="O que você quer ouvir?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-card border-border"
        />
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate("/recommendations")}
            className="p-6 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center gap-4 hover:scale-105 transition-transform"
          >
            <Sparkles className="h-8 w-8 text-primary-foreground" />
            <div className="text-left">
              <h3 className="text-xl font-bold text-primary-foreground">
                Recomendações Inteligentes
              </h3>
              <p className="text-sm text-primary-foreground/80">
                Descubra novas músicas feitas para você
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/liked")}
            className="p-6 bg-card rounded-lg border border-border flex items-center gap-4 hover:bg-card/80 transition-colors"
          >
            <Heart className="h-8 w-8 text-primary" />
            <div className="text-left">
              <h3 className="text-xl font-bold text-foreground">Músicas Curtidas</h3>
              <p className="text-sm text-muted-foreground">
                Suas músicas favoritas em um só lugar
              </p>
            </div>
          </button>
        </div>

        {/* Based on your styles */}
        {userPreferenceSongs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Com base nos seus estilos
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {userPreferenceSongs.slice(0, 10).map((song) => (
                <div key={song.id} className="flex-shrink-0 w-40 space-y-2">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {song.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around items-center h-16">
          <button className="flex flex-col items-center gap-1">
            <HomeIcon className="h-6 w-6 text-primary" />
            <span className="text-xs text-primary">Início</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Search className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Buscar</span>
          </button>
          <button
            onClick={() => navigate("/liked")}
            className="flex flex-col items-center gap-1"
          >
            <Library className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Biblioteca</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
