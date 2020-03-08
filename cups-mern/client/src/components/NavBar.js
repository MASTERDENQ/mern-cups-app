import React, { Component } from 'react';
// import '../css/NavBarStyle.css';
// import avatar from '../assets/avatar.jpg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';


export class NavBar extends Component {
    state = {
        isOpen: false   
    }

    toggle = () =>
        this.setState({
            isOpen: !this.state.isOpen
        });
    
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">C.U.P.S</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen}>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://gitlab.com/MASTERQ9/ap-cups">
                                        Github
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


// const NavBar = () => {
//     return (
//         <nav className="NavBar">

//             <p className="Username">
//                 Username
//             </p>

//             <img 
//                 src={avatar} 
//                 className="NavBarAvatar" 
//                 alt="Avatar" 
//             />

//         </nav>
//     );
// };

export default NavBar;