import React, { useState, useEffect } from "react";
import "./style.css";
import SearchIcon from "../../assets/icons/search.svg";
import useDebounce from "../../hooks/useDebounce.js";
import Spinner from "../Spinner";

function CategoryFilter(props) {
  const { data = [], isLoading = true } = props;
  const [categories, setCategories] = useState(data);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  // Hook based debounce
  const debouncedSearchTerm = useDebounce(search, 500);

  // Hook that handles our filtering from all sources
  useEffect(() => {
    const filteredCategories = data.filter(category => {
      return (
        category.toLowerCase().indexOf(debouncedSearchTerm.toLowerCase()) !==
          -1 && !selected.includes(category)
      );
    });

    const sortedCategories = [].concat(selected, filteredCategories);

    setCategories(sortedCategories);
    setIsLoadingSearch(false);
  }, [debouncedSearchTerm, selected, data]);

  // Handling Box change
  const handleCheckboxChange = item => {
    return () => {
      if (selected.includes(item)) {
        setSelected(selected.filter(s => s !== item));
      } else {
        setSelected([item, ...selected]);
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
            setSearch(e.target.value);
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
        Toepassen
      </button>
    </div>
  );
}

export default CategoryFilter;
