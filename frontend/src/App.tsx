import { CssBaseline } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
