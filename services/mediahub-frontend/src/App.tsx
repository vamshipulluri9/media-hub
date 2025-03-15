import "./App.css";

function App() {
  return (
    <>
      <form
        action="http://localhost:5001/upload/file"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="file" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
