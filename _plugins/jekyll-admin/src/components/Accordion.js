import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';

class Accordion extends Component {
  state = { collapsed: true };

  handleClick = () => {
    this.setState(state => {
      return {
        collapsed: !state.collapsed,
      };
    });
  };

  renderIndicator() {
    const { counter, count } = this.props;
    const { collapsed } = this.state;

    if (collapsed && counter && count) {
      return <div className="counter">{count}</div>;
    }
    return (
      <div className="chevrons">
        <Icon name={`chevron-${collapsed ? 'down' : 'up'}`} />
      </div>
    );
  }

  render() {
    const { icon, label, minHeight, count, children } = this.props;
    const { collapsed } = this.state;
    const accordionClasses = classnames('accordion', { collapsed });

    let panelHeight = minHeight;
    if (!collapsed) {
      panelHeight = minHeight && count ? (count + 1) * minHeight : 'none';
    }

    return (
      <div
        className={accordionClasses}
        style={{ maxHeight: panelHeight }}
        onClick={this.handleClick}
      >
        <div className="accordion-label">
          {icon && <Icon name={icon} />}
          {label}
          <div className="indicator">{this.renderIndicator()}</div>
        </div>
        {children}
      </div>
    );
  }
}

Accordion.defaultProps = {
  minHeight: 50,
};

Accordion.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  count: PropTypes.number,
  counter: PropTypes.bool,
  icon: PropTypes.string,
};

export default Accordion;
