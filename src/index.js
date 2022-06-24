import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./style.css";
import productList from "./product-list.json";

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productList, stockOnly: false, searchWord: "" };
  }

  handleChange = (word) => {
    this.setState(() => {
      return { searchWord: word };
    });
  };

  handleClick = () => {
    this.setState((state) => {
      return { stockOnly: !state.stockOnly };
    });
  };

  render() {
    return (
      <div>
        <SearchBar
          handleClick={this.handleClick}
          handleChange={this.handleChange}
        />
        <ProductTable
          productList={this.state.productList}
          stockOnly={this.state.stockOnly}
          searchWord={this.state.searchWord}
        />
      </div>
    );
  }
}

function ProductTable(props) {
  let newList = [];
  let prevCat = "";
  for (let prdt of props.productList) {
    if (prdt.stocked) {
      var stock = "";
    } else {
      var stock = "out-of-stock";
      if (props.stockOnly) continue;
    }
    if (!prdt.name.toLowerCase().includes(props.searchWord.toLowerCase()))
      continue;
    if (prevCat === "" || prevCat !== prdt.category) {
      prevCat = prdt.category;
      newList.push(
        <tr key={prdt.category}>
          <th>{prdt.category}</th>
        </tr>
      );
      newList.push(
        <tr key={prdt.name}>
          <td className={stock}>{prdt.name}</td>
          <td>{prdt.price}</td>
        </tr>
      );
    } else if (prdt.category === prevCat) {
      newList.push(
        <tr key={prdt.name}>
          <td className={stock}>{prdt.name}</td>
          <td>{prdt.price}</td>
        </tr>
      );
    }
  }
  return (
    <table>
      <tbody>{newList}</tbody>
    </table>
  );
}

function SearchBar(props) {
  return (
    <form className="searchBar">
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => {
          props.handleChange(e.target.value);
        }}
      />
      <div className="inStock-checkbox">
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          onClick={props.handleClick}
        />
        <label htmlFor="inStock">Only show products in stock</label>
      </div>
    </form>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FilterableProductTable />);
