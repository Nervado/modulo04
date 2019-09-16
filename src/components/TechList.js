import React, { Component } from "react";

import TechItem from "./TechItem";

class TechList extends Component {
  static propTypes = {};

  static defaultProps = {
    tech: "Oculta"
  };

  state = {
    newTech: "",
    techs: []
    //techs: ["Node.js", "ReactJs", "React Native"]
  };

  // Component is show
  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // All change in state or props
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs)
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
  }
  // Componente will leave
  componentWillUnmount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <ul>
            {this.state.techs.map((tech, i) => (
              <TechItem
                key={i}
                tech={tech}
                onDelete={() => this.handleDelete(tech)}
              />
            ))}
          </ul>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={this.state.newTech}
          />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }
}

export default TechList;
