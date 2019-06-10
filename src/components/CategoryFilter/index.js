import React, { useState } from "react";
import _ from "lodash";
import "./index.scss";

function CategoryFilter({ data }) {
  const [categories, setCategories] = useState(data);
  const [selected, setSelected] = useState([]);

  // Half a second debounce, curtosey of lodash, normally I would implement my own
  const handleChange = _.debounce(search => {
    // Basic search, checking for partial matches
    const filteredCategories = data.filter(category => {
      return (
        category.indexOf(search) !== -1 || selected.find(s => s === category)
      );
    });
    setCategories(filteredCategories);
  }, 500);

  const handleCheckboxChange = item => {
    return () => {
      if (selected.find(s => s === item)) {
        setSelected(selected.filter(s => s !== item));
      } else {
        setSelected(selected.concat(item));
      }
    };
  };

  return (
    <div className="CategoryFilter__container">
      <input
        onChange={e => handleChange(e.target.value)}
        placeholder="filter"
      />
      <div className="CategoryFilter__container">
        {categories
          .sort((a, b) => {
            return selected.find(s => s === a) ? -1 : 1;
          })
          .map((item, index) => {
            const isSelected = selected.some(s => s === item);
            return (
              <div
                className="CategoryFilter__input"
                onClick={handleCheckboxChange(item)}
                key={index}
              >
                <input
                  type="checkbox"
                  name={item + index}
                  value={isSelected}
                  checked={isSelected}
                  onChange={() => null}
                />
                <label htmlFor={item + index}>{item}</label>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CategoryFilter;
