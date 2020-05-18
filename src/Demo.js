import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

export default class Demo extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 2,
    lazyRadius: 2
  };
  componentDidMount() {
    var element = document.querySelector('.mainCanvas > canvas:nth-of-type(2)');
    element.id="canvasElement";
    //secondChild.setAttribute("id", "drawingCanvas");
  }
  render() {
    return (
      <div>
        <h1>Sistemas inteligentes</h1>
        <h2>Handwritting emoji recognition</h2>
        <p></p>
        <div>
          <button
            onClick={() => {
                console.log("saving diegos image");
                var c= document.getElementById("canvasElement");
                var dataURL = c.toDataURL("image/jpeg",1.0);
                console.log(dataURL);
                //var blob = dataURItoBlob(dataURL);
                //console.log(blob);
                //var fd = new FormData(document.forms[0]);
                //fd.append("canvasImage", blob);
                //console.log(this.saveableCanvas.getSaveData());
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>

        </div>
        <CanvasDraw
          className="mainCanvas"
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
        />
      </div>
    );
  }
}


/**
  <p>
          The following is a disabled canvas with a hidden grid that we use to
          load & show your saved drawing.
        </p>
        <button
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              localStorage.getItem("savedDrawing")
            );
          }}
        >
          Load what you saved previously into the following canvas. Either by
          calling `loadSaveData()` on the component's reference or passing it
          the `saveData` prop:
        </button>
        <CanvasDraw
          disabled
          hideGrid
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
        />

 */