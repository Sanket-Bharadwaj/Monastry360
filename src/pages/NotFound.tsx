import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-6">🏔️</div>
        <h1 className="text-4xl font-serif font-bold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-4">Sacred Path Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The monastery path you're seeking doesn't exist in our records. 
          Perhaps you'd like to return to the main trail?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/map">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Explore Map
            </Link>
          </Button>
        </div>
        <div className="mt-8 text-xs text-muted-foreground">
          Monastery360 — Sikkim Heritage Guide
        </div>
      </div>
    </div>
  );
};

export default NotFound;
