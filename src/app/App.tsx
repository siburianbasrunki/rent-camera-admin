import { AppProviders } from "./AppProvider";
import { AppRouter } from "./AppRouter";

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
