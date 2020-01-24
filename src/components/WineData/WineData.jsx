import React from "react";
import "./WineData.css";

const WineData = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.vintage}</td>

    <td>{props.regions}</td>
    <td>{props.score}</td>
    <td>
      <button
        onClick={() =>
          props.handleAddWine({
            name: props.name,
            vintage: props.vintage,
            type: props.type,
            regions: props.regions,
            score: props.score,
            cheeses: props.cheese
          })
        }
      >
        Add Wine
      </button>
    </td>
  </tr>
);

export default WineData;
