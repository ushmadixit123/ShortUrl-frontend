import { Box } from "@mui/material";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Box minHeight="90vh" bgcolor="#f4f6f8" p={2} textAlign="center" sx={{display : "flex", flexDirection : "column", alignItems:"center"}}>
        <UrlForm />
        <Features />
        <Footer />
      </Box>
    </>
  );
}

export default App;
