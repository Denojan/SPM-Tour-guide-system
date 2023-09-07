import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function UpdateNote() {
  const param = useParams();
  const placeName = param.placeName;
  console.log(placeName);

  const [note, setNote] = useState(""); // State to store the note
  const [newNote, setNewNote] = useState(""); // State to store the new note value

  async function getNote(placeName) {
    try {
      const res = await axios.get(`http://localhost:8080/wishlist/getNote/${placeName}`);
      console.log(res.data);

      // Assuming your API returns a response with a 'note' property
      if (res.data.note) {
        setNote(res.data.note);
      } else {
        console.error("Note not found in the response.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getNote();
  }, [placeName]); // Include placeName in the dependency array to refetch the note when placeName changes

  async function updateNote(placeName) {
    try {
      await axios.put(`http://localhost:8080/wishlist/updateWishList/${placeName}`, { note: newNote });
      toast.success("Note updated", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Update Note</h1>
      <div>
        <p>Current Note: {note}</p>
        <input
          type="text"
          placeholder="Enter new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={updateNote}>Update Note</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateNote;
