import BookDetails from "./components/BookDetails";
import BlogDetails from "./components/BlogDetails";
import CourseDetails from "./components/CourseDetails";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "40px", padding: "20px" }}>
      <div style={{ flex: 1, minWidth: "220px" }}>
        <CourseDetails />
      </div>
      <div style={{ flex: 1, minWidth: "220px", borderLeft: "3px solid green", paddingLeft: "20px" }}>
        <BookDetails />
      </div>
      <div style={{ flex: 1, minWidth: "220px", borderLeft: "3px solid green", paddingLeft: "20px" }}>
        <BlogDetails />
      </div>
    </div>
  );
}

export default App;