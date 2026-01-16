import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { X, Lock } from "lucide-react";

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onClose: () => void;
}

export function AdminLogin({ onLogin, onClose }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check password - NOTE: This is frontend only, not truly secure!
    // For production use, implement proper backend authentication
    const correctPassword = "Loch90Dunh^"; // Change this to your desired password
    
    if (password === correctPassword) {
      onLogin(password);
      setPassword("");
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-white/95 backdrop-blur-sm p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#E0A63F]/20 flex items-center justify-center">
              <Lock className="size-5 text-[#E0A63F]" />
            </div>
            <h2 className="text-[#0F4C5C]">Admin Access</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="hover:bg-[#0F4C5C]/10 text-[#0F4C5C] border border-[#0F4C5C]/30"
          >
            <X className="size-5" />
          </Button>
        </div>

        <p className="text-[#6B8E9E] mb-6">
          Enter your password to access the admin panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin password"
              className={error ? "border-red-500" : ""}
              autoFocus
            />
            {error && (
              <p className="text-red-500 mt-2">
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#E0A63F] hover:bg-[#E0A63F]/90 text-white"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 p-4 bg-[#0F4C5C]/10 rounded-lg">
          <p className="text-xs text-[#0F4C5C]">
            <strong>Note:</strong> This is frontend-only password protection. 
            For production use with sensitive data, implement proper backend authentication.
          </p>
        </div>
      </Card>
    </div>
  );
}