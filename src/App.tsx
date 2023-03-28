import React from "react";

interface INode {
  id: string;
  fileName: string;
  children: Array<string>;
  root?: boolean;
}

class App extends React.Component {
  render() {
    return (
      <main className="mlb-l">
        <article className="stack center">
          <h1 className="text-1">Color Picker</h1>
          <ColorPicker
            colorPickerOptions={[
              "#5d77f5",
              "#0fd085",
              "#ffba5b",
              "#f95e62",
              "lightpink",
            ]}
            initialSelectedColor={"black"}
          />
        </article>
      </main>
    );
  }
}

type IColorPickerProps = {
  colorPickerOptions: Array<string>;
  initialSelectedColor: string;
};

type IColorPickerState = {
  selectedColor: string;
};

export default App;

class ColorPicker extends React.Component<
  IColorPickerProps,
  IColorPickerState
> {
  constructor(props: IColorPickerProps) {
    super(props);
    this.state = {
      selectedColor: this.props.initialSelectedColor,
    };
  }

  handleColorChange(color: string) {
    this.setState({ selectedColor: color });
  }

  render() {
    return (
      <article className="stack">
        <div
          className="box p-3xl border-none"
          style={{ backgroundColor: this.state.selectedColor }}
        >
          <p className="text-5">{this.state.selectedColor}</p>
        </div>
        <article className="cluster">
          {this.props.colorPickerOptions.map((color) => (
            <button
              onClick={() => this.handleColorChange(color)}
              key={color}
              className="box border-none pointer"
              style={{ backgroundColor: color }}
            >
              {color}
            </button>
          ))}
        </article>
      </article>
    );
  }
}
