/* eslint-disable no-unused-vars */

import React from "react";
import Layout from "./components/Layout";
import FileUpload from "./components/FileUpload";
import ListStudents from "./components/ListStudents";
import AddStudent from "./components/AddStudent";

const App = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <FileUpload />
        <AddStudent />
        <ListStudents />
      </div>
    </Layout>
  );
};

export default App;
