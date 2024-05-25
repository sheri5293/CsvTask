/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl">Student Dashboard</h1>
      </header>
      <main className="flex-grow p-4 bg-gray-100">{children}</main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        © 2024 Student Dashboard
      </footer>
    </div>
  );
};

export default Layout;
