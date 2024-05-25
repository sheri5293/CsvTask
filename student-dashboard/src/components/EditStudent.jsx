/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, set, get } from "firebase/database";

const EditStudent = ({ studentId, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const studentRef = ref(database, `students/${studentId}`);
    get(studentRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setName(data.name);
        setAge(data.age);
      }
    });
  }, [studentId]);

  const updateStudent = () => {
    set(ref(database, `students/${studentId}`), { name, age });
    onSave();
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Edit Student</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="p-2 border rounded mr-2"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        className="p-2 border rounded mr-2"
      />
      <button
        onClick={updateStudent}
        className="p-2 bg-blue-600 text-white rounded mr-2"
      >
        Save
      </button>
      <button onClick={onCancel} className="p-2 bg-gray-600 text-white rounded">
        Cancel
      </button>
    </div>
  );
};

export default EditStudent;
