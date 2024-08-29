import "./App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/form");
  };

  return (
    <div className="appContainer">
      <div className="appTitle">
        <h1>Welcome to form.com</h1>
        <p>This is a simple form builder.</p>
        <button onClick={handleButtonClick}>CREATE NEW FORM</button>
        <hr className="divider" />
      </div>
    </div>
  );
}

export default Home;
