import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";



function Notes() {
  const globalVar = localStorage.getItem("name");
  return (
    <div>
      <Header />
      <h2 className="greet"> Welcome {globalVar} </h2>
      <CreateArea username={globalVar} />
      <Footer />
    </div>
  );
}

export default Notes;