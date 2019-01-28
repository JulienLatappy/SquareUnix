import React from 'react';
import {
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
NavLink,
} from 'reactstrap';
import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
        };
    }
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className="Menu" dark expand="md">
                    <NavbarBrand className="logo" href="/"><img className="logo" src="/images/MSG.png" height="50" alt=""></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/pageartistes/">ARTISTES</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/calendrier">AGENDA</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Menu;