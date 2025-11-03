import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent mb-6 shadow-elegant">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Chat Nexu
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Experience modern messaging with a beautiful interface. Connect, share, and stay in touch with friends and teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-elegant"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-elegant transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Real-time messaging with instant delivery. Stay connected without delays.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-elegant transition-all">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Group Chats</h3>
            <p className="text-muted-foreground">
              Create groups, invite friends, and collaborate seamlessly with your team.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-elegant transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your conversations are protected with modern security standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
