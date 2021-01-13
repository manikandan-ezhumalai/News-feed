import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class Nav extends Component {

    state = {
        searchField: ''
    }

    searchFieldHandler(e) {
        this.setState({
            searchField: e.target.value
        })
    }

    searchSubmit(e) {
        e.preventDefault();
        this.props.closeDrawer();
        this.props.history.push('/search/' + this.state.searchField);
    }

    render() {
        var navDrawerClass = [this.props.showDrawer === true ? 'nav-drawer-show' : 'nav-drawer-hide', 'nav-drawer'];
        return (
            <nav className='nav'>
                <div className='nav__links'>
                    <NavLink exact activeClassName={'nav__link-active'} className='nav__link' to='/'>Home</NavLink>
                    <NavLink activeClassName={'nav__link-active'} className='nav__link' to='/sources'>Sources</NavLink>
                    <NavLink activeClassName={'nav__link-active'} className='nav__link' to='/about'>About</NavLink>
                </div>
                <form className='nav__search' onSubmit={this.searchSubmit.bind(this)} >
                    <input placeholder='Search News' onChange={this.searchFieldHandler.bind(this)} />
                    <button type='submit'><i className="fas fa-search"></i></button>
                </form>
            </nav> 
        )
    }

}

export default withRouter(Nav);