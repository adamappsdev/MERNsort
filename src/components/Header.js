import React from 'react';

class Header extends React.Component {
  render() {
    var header = ["GitHub Repo", "LinkedIn", "Blog"];
    var elements = [];
    for (var i = 0; i < header.length; i++) {
      elements.push(<a key={i} href={ header[i] }>{ header[i] }</a>);
    }
    return (
      <nav>
        <div className="nav-left">
          <a href={ header[i] }>MERNsort</a>
        </div>
        <div className="nav-right">
          { elements }
        </div>
      </nav>
    )
  };
}

export default Header;
