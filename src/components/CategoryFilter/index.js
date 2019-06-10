import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./style.css";

import SearchIcon from "../../assets/icons/search.svg";

import Spinner from "../Spinner";

function CategoryFilter(props) {
  const { data = [], isLoading = true } = props;
  const [categories, setCategories] = useState(data);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  // Hook that handles our filtering from all sources
  useEffect(() => {
    const filteredCategories = data.filter(category => {
      return (
        category.indexOf(search) !== -1 && !selected.find(s => s === category)
      );
    });

    const sortedCategories = [].concat(selected, filteredCategories);

    setCategories(sortedCategories);
    setIsLoadingSearch(false);
  }, [search, selected, data]);

  // Half a second debounce, curtosey of lodash, normally I would implement my own
  const handleChange = _.debounce(search => {
    setSearch(search);
  }, 500);

  // Handling Box change
  const handleCheckboxChange = item => {
    return () => {
      if (selected.find(s => s === item)) {
        setSelected(selected.filter(s => s !== item));
      } else {
        setSelected([].concat(item, selected));
      }
    };
  };

  return (
    <div className="CategoryFilter">
      <div className="CategoryFilter__header"> Productgroep </div>
      <div className="CategoryFilter__search-container">
        <input
          className="CategoryFilter__search"
          onChange={e => {
            setIsLoadingSearch(true);
            handleChange(e.target.value);
          }}
          placeholder="Zoek op ..."
        />
        <div className="CategoryFilter__input-icon">
          {isLoadingSearch ? (
            <Spinner size={"small"} />
          ) : (
            <img src={SearchIcon} alt="search icon" />
          )}
        </div>
      </div>
      <div className="CategoryFilter__item-container">
        {isLoading ? (
          <Spinner />
        ) : categories.length === 0 ? (
          "No Results Found"
        ) : (
          categories.map((item, index) => {
            const isSelected = selected.some(s => s === item);
            return (
              <div
                className={`CategoryFilter__item ${isSelected &&
                  "CategroyFilter__item--selected"}`}
                onClick={handleCheckboxChange(item)}
                key={index}
              >
                <input
                  className="CategoryFilter__input"
                  type="checkbox"
                  name={item + index}
                  value={isSelected}
                  checked={isSelected}
                  onChange={() => null}
                />
                <label className="CategoryFilter__label" htmlFor={item + index}>
                  {item}
                </label>
              </div>
            );
          })
        )}
      </div>
      <button
        className="CategoryFilter__apply"
        onClick={() => console.log("Apply this thing!")}
      >
        Toessen
      </button>
    </div>
  );
}

export default CategoryFilter;
