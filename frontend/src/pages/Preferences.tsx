import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { genres } from "@/data/musicData";
import { toast } from "sonner";

const Preferences = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user, updatePreferences } = useAuth();

  useEffect(() => {
    if (user?.preferences) {
      setSelectedGenres(user.preferences);
    }
  }, [user]);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleComplete = () => {
    updatePreferences(selectedGenres);
    toast.success("Preferências salvas com sucesso!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Escolha alguns estilos que você curte
          </h1>
          <p className="text-muted-foreground">
            Isso nos ajudará a criar suas primeiras recomendações.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedGenres.includes(genre.id)
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-lg font-semibold text-foreground">
                {genre.name}
              </span>
            </button>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={handleComplete}
              className="w-full"
              size="lg"
              disabled={selectedGenres.length === 0}
            >
              CONCLUIR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
