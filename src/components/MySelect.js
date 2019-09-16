import React from "react";
import "./MySelect.css";

// const MySelect = ({ categories, loaded, fetchCategory }) => {
class MySelect extends React.Component {
  // const categoriesArr = Object.keys(categories);
  state = {
    value: null
  };
  handleClick = (e) => {
    const { fetchCategory } = this.props;
    if (this.state.value) {
      fetchCategory(this.state.value);
    }
  };
  render() {
    const { categories, loaded } = this.props;
    const categoriesArr = Object.keys(categories);
    console.log(this.state.value);
    return (
      <section className="MySelect">
        {loaded && categories ? (
          <div id="my-select">
            <label htmlFor="category-select">
              Categories:
              <select
                id="category-select"
                onChange={(e) => this.setState({ value: e.target.value })}
              >
                <option value="">Please choose a category</option>
                {categoriesArr.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={this.handleClick}>Generate</button>
          </div>
        ) : (
          <p id="loading">...loading</p>
        )}
      </section>
    );
  }
}

export default MySelect;
