import React from 'react';
import { render } from 'react-dom';
import './index.css';
import '@babel/polyfill';
import UrlLoader from './components/UrlLoader';
import Modal from './components/Modal';
import { loadUrls, buildSpellMap } from './components/SpellLoader';
import Spell from './components/Spell';
import Component from './components/Component';
import SpellTable from './components/SpellTable';
import Select from './components/Select';
import Label from './components/Label';
import { iterator } from 'lazy-iters';
import Tag from './components/Tag';

class Comp extends Component {
  state = {
    modal: false,
    spells: {},
    spellLine: '',
    selectedSpell: null,
    selectedClass: 'any'
  };

  async componentDidMount() {
    // https://dl.dropbox.com/s/r9jyvbkrtjcb08r/spells.json?dl=0
    const spells = await loadUrls(this.props.urls);
    const map = buildSpellMap(spells);
    console.log(map);
    this.setState({
      spells: map
    });
  }

  onChangeClass = ({ value }) => {
    this.setState({
      selectedClass: value
    });
  };

  onToggleModal = () => {
    const { modal } = this.state;
    console.log(!modal);
    this.setState({
      modal: !modal
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: false
    });
  };

  onEditSpell = e => {
    const { value } = e.target;
    console.log(value);
    this.setState({
      spellLine: value
    });
  };

  onSelectSpell = spell => this.setState({ modal: true, selectedSpell: spell });

  render() {
    let modal = <span>No spell selected</span>;
    if (this.state.spells !== {}) {
      // Check textfield
      if (this.state.selectedSpell === null) {
        const spellName = this.state.spellLine;
        const spell = this.state.spells[spellName];
        if (spell !== undefined) {
          modal = <Spell spells={spell} />;
        }
      } else {
        modal = <Spell spells={this.state.selectedSpell} />;
      }
    }
    const { spells, selectedClass } = this.state;
    const spellName = this.state.spellLine.toLowerCase();
    const spellsToRender = iterator(Object.keys(spells))
      .filter(
        key =>
          (selectedClass === 'any' || spells[key][0].classes.indexOf(selectedClass) > -1) &&
          (this.state.spellLine == '' || spells[key][0].name.toLowerCase().indexOf(spellName) > -1)
      )
      .fold({}, (obj, key) => {
        obj[key] = spells[key];
        return obj;
      });
    return (
      <div>
        <Modal isVisible={this.state.modal} onClose={this.onCloseModal}>
          {modal}
        </Modal>
        <div className="root">
          <div class="input">
            {/* <div style={{ display: 'grid', gridTemplateColumns: '40px 180px 40px 180px' }}> */}
            <Label>Spell</Label>
            <input
              class="search-name"
              type="text"
              value={this.state.spellLine}
              onChange={this.onEditSpell}
              style={{ width: 80 }}
            />
            <Label>Class</Label>
            <Select options={options} onChange={this.onChangeClass} style={{ width: 120 }} />
          </div>
          <SpellTable
            spells={spellsToRender}
            onSpellSelect={this.onSelectSpell}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    );
  }
}

const root = document.getElementById('root');
const options = [
  {
    value: 'any',
    label: 'Any'
  },
  {
    value: 'artificer',
    label: 'Artificer'
  },
  {
    value: 'bard',
    label: 'Bard'
  },
  {
    value: 'cleric',
    label: 'Cleric'
  },
  {
    value: 'druid',
    label: 'Druid'
  },
  {
    value: 'paladin',
    label: 'Paladin'
  },
  {
    value: 'ranger',
    label: 'Ranger'
  },
  {
    value: 'sorcerer',
    label: 'Sorcerer'
  },
  {
    value: 'warlock',
    label: 'Warlock'
  },
  {
    value: 'wizard',
    label: 'Wizard'
  }
];

render(<UrlLoader Component={Comp} />, root);
