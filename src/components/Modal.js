import React from 'react';
import Component from './Component';
import './Modal.css';

class ModalKeyHandler extends Component {
  handleKeyDown = event => {
    switch (event.keyCode) {
      case 27:
        this.props.onClose();
        return;
      default:
        return;
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return <span />;
  }
}

function id(x) {
  return x;
}

function CloseButton(props) {
  return <div className="modal-close-btn" {...props} />;
}

function handleClick(onClose) {
  return e => {
    // Check if we clicked outside the modal
    if (!hasAncestor(e.target, 'modal-container')) {
      onClose();
    }
  };
}

function hasAncestor(element, className) {
  if (element.className === className) {
    return true;
  } else if (element.parentNode !== undefined && element.parentNode !== null) {
    return hasAncestor(element.parentNode, className);
  } else {
    return false;
  }
}

class Modal extends Component {
  componentDidUpdate() {
    if (this.props.isVisible) {
      document.body.className = 'modal-open';
    } else {
      document.body.className = '';
    }
  }

  render() {
    const { isVisible, onClose = id, children = [] } = this.props;
    if (isVisible) {
      return (
        <div className="Modal" onClick={handleClick(onClose)} aria-hidden={true}>
          <div className="modal-container">
            <ModalKeyHandler onClose={onClose} />
            <div className="modal-header">
              <CloseButton onClick={onClose} />
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Modal;
