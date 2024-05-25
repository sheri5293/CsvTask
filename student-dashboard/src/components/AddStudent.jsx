// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const addStudent = () => {
    push(ref(database, "students"), { name, age }).then(() => {
      setName("");
      setAge("");
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Add Student</h2>
      <div className="flex items-center mb-4">
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
          onClick={addStudent}
          className="p-2 bg-blue-600 text-white rounded"
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
