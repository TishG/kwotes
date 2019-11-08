import React, { useState } from "react";

//css
import "./MySelect.css";

const MySelect = ({ categories, fetchCategory }) => {
  const [val, setVal] = useState(null);
  const handleClick = (e) => {
    if (val) {
      fetchCategory(val);
    }
  };
  const categoriesArr = Object.keys(categories);
  return (
    <section className="MySelect">
      <div className="select-container">
        <label htmlFor="category-select">
          Categories:
          <select id="category-select" onChange={(e) => setVal(e.target.value)}>
            {categoriesArr.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleClick}>Generate</button>
      </div>
    </section>
  );
};

export default MySelect;
