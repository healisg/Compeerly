import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import CoverPage from "@/pages/cover";
import FeedPage from "@/pages/feed";
import CapturePage from "@/pages/capture";
import DetailPage from "@/pages/detail";
import AdminPage from "@/pages/admin";
import AboutPage from "@/pages/about";
import EssayPage from "@/pages/essay";
import OgCard from "@/pages/og-card";
import { WorkflowProvider } from "@/lib/workflows";
import { NudgeStrip } from "@/components/nudge-strip";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={CoverPage} />
      <Route path="/feed" component={FeedPage} />
      <Route path="/capture" component={CapturePage} />
      <Route path="/workflow/:id" component={DetailPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/essay" component={EssayPage} />
      <Route path="/og-card" component={OgCard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WorkflowProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <NudgeStrip />
          </WouterRouter>
        </WorkflowProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
