import React from 'react';
import Component from './Component';
import { iterator } from 'lazy-iters';
import './Select.css';

function id(x) {
  return x;
}

function Menu(props) {
  const { isShown = false, options, onChange = id, cursor = 0 } = props;

  if (isShown) {
    const children = iterator(options)
      .enumerate()
      .map(([option, i]) => {
        const className = cursor === i ? 'option selected' : 'option';
        return (
          <div key={i} className={className} onClick={() => onChange(i)}>
            {option.label}
          </div>
        );
      })
      .collect();

    return <div className="menu">{children}</div>;
  } else {
    return <span style={{ display: 'none' }} />;
  }
}

class Select extends Component {
  state = {
    isFocused: false,
    cursor: 0
  };

  get selected() {
    const { options } = this.props;
    const { cursor } = this.state;
    return options[cursor];
  }

  get length() {
    return this.props.options.length;
  }

  onFocus = () => {
    this.setState({
      isFocused: true
    });
  };

  onSelect(i) {
    const { onChange = id } = this.props;
    const obj = this.props.options[i];
    onChange(obj);
  }

  onBlur = () => {
    const { onChange = id } = this.props;
    this.setState({
      isFocused: false
    });
    onChange(this.selected);
  };

  onChangeOption = i => {
    this.setState(
      {
        cursor: i
      },
      () => {
        this.component.blur();
      }
    );
  };

  moveDown() {
    const { cursor } = this.state;
    let newCursor = cursor + 1;
    while (newCursor >= this.length) {
      newCursor -= this.length;
    }
    this.setState({
      cursor: newCursor
    });
  }

  moveUp() {
    const { cursor } = this.state;
    let newCursor = cursor - 1;
    while (newCursor < 0) {
      newCursor += this.length;
    }
    this.setState({
      cursor: newCursor
    });
  }

  onKeyDown = e => {
    e.preventDefault();
    const { key } = e;
    switch (key) {
      case 'ArrowUp':
        this.moveUp();
        break;
      case 'ArrowDown':
        this.moveDown();
        break;
      case 'Enter':
        this.component.blur();
        break;
    }
  };

  render() {
    const { options, onChange, ...props } = this.props;
    const { cursor, isFocused } = this.state;
    const selected = this.selected;
    const menu = (
      <Menu isShown={isFocused} options={options} cursor={cursor} onChange={this.onChangeOption} />
    );
    const text = selected !== undefined ? selected.label : <span style={{ height: '1em' }} />;
    const icon = isFocused ? <span className="arrow up" /> : <span className="arrow down" />;
    return (
      <span
        className="Select"
        tabIndex={0}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        ref={el => (this.component = el)}
        {...props}
      >
        <span className="container">
          <span className="label">{text}</span>
          <span className="icon">{icon}</span>
        </span>
        {menu}
      </span>
    );
  }
}

export default Select;
