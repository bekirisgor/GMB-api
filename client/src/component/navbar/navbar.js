import React, { Component } from "react";
import { Menu, Container, Image } from "semantic-ui-react";
import rimoilogo from "../../static/logo-light.png";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class NavBar extends Component {
  state = {};

  render() {
    return (
      <Menu
        inverted
        fixed="top"
        style={{ maxHeight: "75px", backgroundColor: "#17181a" }}
      >
        <Image src={rimoilogo} size="small" style={{ margin: "10px" }} />
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70px"
          }}
        >
          <Menu.Item>
            <Link to="/"> Home</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/accounts"> Accounts</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/locations"> Location</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/reviews"> Reviews</Link>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
export default NavBar;
