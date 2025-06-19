import { Suspense } from "react";
import ArtistHome from "./pages/artist-home";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <ArtistHome />
      </>
    </Suspense>
  );
}

export default App;
