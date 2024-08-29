import "../App.css";
import { useNavigate } from "react-router-dom";
import CreatedForm from "../component/createdForms";

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/create");
  };

  return (
    <div className="appContainer">
      <div className="appTitle">
        <h1>Welcome to form.com</h1>
        <p>This is a simple form builder.</p>
        <button onClick={handleButtonClick}>CREATE NEW FORM</button>
        <hr className="divider" />
      </div>
      <CreatedForm />
    </div>
  );
}

export default Home;
