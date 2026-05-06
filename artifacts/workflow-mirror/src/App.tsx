import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import FeedPage from "@/pages/feed";
import CapturePage from "@/pages/capture";
import DetailPage from "@/pages/detail";
import { WorkflowProvider } from "@/lib/workflows";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={FeedPage} />
      <Route path="/capture" component={CapturePage} />
      <Route path="/workflow/:id" component={DetailPage} />
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
          </WouterRouter>
        </WorkflowProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
