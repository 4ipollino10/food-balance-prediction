"use client"

import Plot from 'react-plotly.js';

const MyPlot = ({ plotDataX, plotDataY, plotTitle, plotXaxis, plotYaxis }) => {
  const layout = {
    title: plotTitle,
    xaxis: {
      title: plotYaxis
    },
    yaxis: {
      title: plotXaxis
    }
  };

  return <Plot
    data={[ {x: [...plotDataX], y: [...plotDataY], type: 'scatter'}]}
    layout={layout}
  />;
};

export default MyPlot;