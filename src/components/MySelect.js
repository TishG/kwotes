import React, { useState } from "react";

//css
import "./MySelect.css";

const MySelect = ({ categories, fetchCategory }) => {
  const [val, setVal] = useState("funny");
  const [displayElement, setDisplayElement] = useState(false);
  const categoriesArr = Object.keys(categories);
  const handleSetVal = val => {
    setVal(val);
    setDisplayElement(false);
    fetchCategory(val);
  };
  const renderMySelectOptions = () => {
    return categoriesArr.map((category, i) => (
      <div
        className="my-select-option"
        key={i}
        title={category}
        onClick={e => handleSetVal(e.target.title)}
      >
        {category}
      </div>
    ))
  }
  return (
    <section className="MySelect">
      <div className="select-container">
        <div
          className="my-select-element"
          onClick={() => setDisplayElement(!displayElement)}
          onChange={e => setVal(e.target.value)}
        >
          {val}
          <ion-icon name={displayElement ? "arrow-dropup" : "arrow-dropdown" }></ion-icon>
        </div>
        <div
          className="my-select-options"
          style={displayElement ? { display: "block" } : { display: "none" }}
        >
          {renderMySelectOptions()}
        </div>
      </div>
    </section>
  );
};

export default MySelect;
