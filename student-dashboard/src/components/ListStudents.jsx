// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import EditStudent from "./EditStudent";

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const studentsRef = ref(database, "students");
    onValue(studentsRef, (snapshot) => {
      const studentsData = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        studentsData.push({ ...data, id: childSnapshot.key });
      });
      setStudents(studentsData);
    });
  }, []);

  const deleteStudent = (id) => {
    remove(ref(database, `students/${id}`));
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Student List</h2>
      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center p-2 border-b"
          >
            {editingId === student.id ? (
              <EditStudent
                studentId={student.id}
                onSave={saveEditing}
                onCancel={cancelEditing}
              />
            ) : (
              <div className="flex items-center">
                <div className="mr-4">
                  {student.name} ({student.age})
                </div>
                <div>
                  <button
                    onClick={() => startEditing(student.id)}
                    className="p-2 bg-yellow-600 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="p-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListStudents;
