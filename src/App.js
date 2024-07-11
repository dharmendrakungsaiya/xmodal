import {useState,useEffect,useRef} from "react";
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const inactivityTimer = useRef(null);

  const resetTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      setIsOpen(false);
    }, 10000);
  };

  const clickHandler = () => {
    setIsOpen(true);
    resetTimer();
  };

  const closeHandler = (e) => {
    console.log(e.target.className);
    if (e.target.className === "modal-content") {
      setIsOpen(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.phoneNo.value.toString().length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (new Date(e.target.dob.value).getTime() > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.phoneNo.value = "";
      e.target.dob.value = "";
      setIsOpen(false);
    }
    console.log(e.target.dob.value);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", resetTimer);
      document.addEventListener("mousedown", resetTimer);
    } else {
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("mousedown", resetTimer);
    }

    return () => {
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("mousedown", resetTimer);
    };
  }, [isOpen]);


  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={clickHandler}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={closeHandler}>
          <div className="modal-content">
            <form onSubmit={submitHandler} onChange={resetTimer}>
              <h2>Fill Details</h2>
              <div className="input-group">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" required />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" id="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="phoneNo">Phone Number:</label>
                <input type="number" name="phoneNo" id="phone" required />
              </div>
              <div className="input-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" name="dob" id="dob" required />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



export default App;
