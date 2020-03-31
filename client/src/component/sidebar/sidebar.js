import React, { Component } from "react";
import { Menu, Sidebar, Container } from "semantic-ui-react";

const subMenuStyle = { backgroundColor: "#2b2d30", fontSize: "13px" };

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
    };
  }

  handleItemClick(e, { name }) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.activeItem === name) this.setState({ activeItem: null });
    else this.setState({ activeItem: name });
    console.log(name);
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Container>
        <Sidebar
          as={Menu}
          inverted
          vertical
          visible
          style={{
            top: "73px",
            paddingTop: "40px",
            width: "200px",
            backgroundColor: "#17181a",
            paddingRight: "220px",
          }}
        >
          <Menu.Item
            as="a"
            name="Accounts"
            active={activeItem === "Accounts"}
            onClick={this.handleItemClick}
          >
            Accounts
          </Menu.Item>

          {activeItem === "Accounts" && (
            <>
              <Menu.Item as="a" style={subMenuStyle}>
                List
              </Menu.Item>
              <Menu.Item as="a" style={subMenuStyle}>
                Get
              </Menu.Item>
              <Menu.Item as="a" style={subMenuStyle}>
                Update
              </Menu.Item>
            </>
          )}
          <Menu.Item
            as="a"
            name="Locations"
            active={activeItem === "Locations"}
            onClick={this.handleItemClick}
          >
            Locations
          </Menu.Item>

          {activeItem === "Locations" && (
            <>
              <Menu.Item as="a" style={subMenuStyle}>
                List
              </Menu.Item>
              <Menu.Item as="a" style={subMenuStyle}>
                Get
              </Menu.Item>
              <Menu.Item as="a" style={subMenuStyle}>
                Update
              </Menu.Item>
            </>
          )}

          <Menu.Item
            as="a"
            name="Reviews"
            active={activeItem === "Reviews"}
            onClick={this.handleItemClick}
          >
            Reviews
          </Menu.Item>
          {activeItem === "Reviews" && (
            <>
              <Menu.Item as="a" style={subMenuStyle}>
                List
              </Menu.Item>
              <Menu.Item as="a" style={subMenuStyle}>
                Get
              </Menu.Item>
              <Menu.Item as="a" style={subMenuStyle}>
                Update
              </Menu.Item>
            </>
          )}
        </Sidebar>
      </Container>
    );
  }
}

export default SideBar;
