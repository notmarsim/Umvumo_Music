import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      await signup(username, email, password, photoUrl);
      toast.success("Conta criada com sucesso!");
      navigate("/preferences");
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Crie sua conta</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={photoUrl} />
                <AvatarFallback className="bg-card">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90"
              >
                <Camera className="h-4 w-4 text-primary-foreground" />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setPhotoUrl(url);
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-card border-border"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-card border-border"
            />
            <Input
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-card border-border"
            />
            <Input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-card border-border"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OU</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" size="lg">
            Cadastrar-se com o Google
          </Button>

          <Button type="submit" className="w-full" size="lg">
            CADASTRAR E PROSSEGUIR
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
