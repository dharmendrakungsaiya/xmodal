import {useState} from "react";
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.className === "modal") setIsOpen(false);
  };

  const submitModal = (e) => {
    e.preventDefault();
    if (e.target.phone.value.toString().length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (new Date(e.target.dob.value).getTime() > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.phone.value = "";
      e.target.dob.value = "";
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      <div className="modal">
        <h1>User Details Modal</h1>
        <button onClick={openModal}>Open Form</button>
        {isOpen && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={submitModal}>
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
                  <label htmlFor="phone">Phone Number:</label>
                  <input type="number" name="phone" id="phone" required />
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
    </div>
  );
}

export default App;
