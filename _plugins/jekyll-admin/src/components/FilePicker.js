import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import StaticIndex from '../containers/views/StaticIndex';
import Icon from './Icon';

export default class FilePicker extends Component {
  state = {
    showModal: false,
  };

  customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 10,
    },
    content: {
      margin: 20,
      paddingTop: 0,
      paddingRight: 10,
      paddingLeft: 15,
    },
  };

  openModal = () => this.setState({ showModal: true });
  shutModal = () => this.setState({ showModal: false });

  onPickItem = path => {
    this.props.onPick(path);
    this.shutModal();
  };

  render() {
    return (
      <span className="images-wrapper">
        <button onClick={this.openModal} ref="trigger">
          <Icon name="picture-o" />
        </button>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="FilePicker"
          onRequestClose={this.shutModal}
          style={this.customStyles}
        >
          <div className="content">
            <StaticIndex onClickStaticFile={this.onPickItem} modalView />
          </div>
        </Modal>
      </span>
    );
  }
}

FilePicker.propTypes = {
  onPick: PropTypes.func.isRequired,
};
