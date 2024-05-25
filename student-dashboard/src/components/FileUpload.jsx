// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { database } from "../firebase";
import { ref, push, set, update, onValue, remove } from "firebase/database";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      onValue(ref(database, "students"), (snapshot) => {
        const students = snapshot.val();
        if (students) {
          const studentArray = Object.keys(students).map((key) => ({
            id: key,
            ...students[key],
          }));
          setStudentData(studentArray);
        } else {
          setStudentData([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      Papa.parse(selectedFile, {
        complete: (results) => {
          const csvData = results.data
            .map((row) => ({
              Name: row[0], // Assuming Name is the first column
              age: row[1], // Assuming age is the second column
            }))
            .slice(1); // Skip the first row (headers)

          console.log("CSV Data:", csvData); // Log the parsed CSV data

          // Push data to Firebase Realtime Database
          csvData.forEach((student) => {
            const newStudentRef = push(ref(database, "students"));
            set(newStudentRef, student);
          });
        },
      });
      setSelectedFile(null);
    }
  };

  const handleDeleteStudent = (id) => {
    const studentRef = ref(database, `students/${id}`);
    remove(studentRef);
  };

  const handleEditStudent = (id, updatedData) => {
    const studentRef = ref(database, `students/${id}`);
    const { Name, age } = updatedData;
    const updatedStudentData = { Name, age };
    update(studentRef, updatedStudentData);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Import Students</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="p-2 border rounded mb-2"
      />
      {selectedFile && (
        <div className="mb-2">
          <strong>Selected File:</strong> {selectedFile.name}
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="p-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Student Data</h2>
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.id}>
                <td className="border p-2">{student.Name}</td>
                <td className="border p-2">{student.age}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleEditStudent(student.id, {
                        ...student,
                        Name: prompt("Enter new name", student.Name),
                        age: prompt("Enter new age", student.age),
                      })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileUpload;
