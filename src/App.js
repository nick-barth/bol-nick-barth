import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://raw.githubusercontent.com/hvgeertruy/frontend-exercise/master/assets/items.json"
      );
      const unEncodedData = result.data.data.map(item => {
        const elment = document.createElement("p");
        // warning, will probably execute scripts
        elment.innerHTML = item;
        return elment.textContent;
      });

      setData(unEncodedData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {<CategoryFilter data={data} isLoading={isLoading} />}
    </div>
  );
}

export default App;
