import React from 'react';
import Component from './Component';
import SortTable from './SortTable';
import { iterator } from 'lazy-iters';
import Tag from './Tag';
import './SpellTable.css';

const HEADERS = ['Level', 'Spell Name'];

const renderTd = spells => (col, colIndex) => {
  if (colIndex === 1) {
    return renderName(spells[col][0]);
  } else if (colIndex === 0) {
    return renderLevel(col);
  } else {
    return col;
  }
};

const renderName = spell => {
  const components = [<span className="spell-name" key="name">{spell.name}</span>];
  if (spell.concentration) {
    components.push(<Tag primary key="conc">Concentration</Tag>);
  }
  if (spell.ritual) {
    components.push(<Tag secondary key="rit">Ritual</Tag>);
  }
  return <span className="spell-col">{components}</span>;
};

const renderLevel = level => {
  const content = level === 0 ? 'Cantrip' : level.toString();
  return <span className="level-col">{content}</span>;
}

class SpellTable extends Component {
  state = {};

  render() {
    const { spells, onSpellSelect = _ => { }, ...props } = this.props;
    const onClick = ([_, spellName]) => () => onSpellSelect([spells[spellName][0]]);
    const spellsMatrix = iterator(Object.values(spells))
      .map(spell => spell[0])
      .map(spell => [spell.level, spell.name])
      .collect();

    const renderer = renderTd(spells);

    return (
      <SortTable
        className="SpellTable"
        tdRenderer={renderer}
        widths={['20%', 'auto']}
        head={HEADERS}
        body={spellsMatrix}
        onClickRow={onClick}
      />
    );

    // const spellNames = Object.keys(spells);
    // const spellRows = spellNames.map(name => (
    //   <tr
    //     key={name}
    //     onClick={() => {
    //       onSpellSelect(spells[name]);
    //     }}
    //   >
    //     <td>{name}</td>
    //     <td style={{ textAlign: 'center' }}>{spells[name][0].level}</td>
    //   </tr>
    // ));
    // return (
    //   <table className="SpellTable" {...props}>
    //     <thead>
    //       <tr>
    //         <th>Spell Name</th>
    //         <th>Spell Level</th>
    //       </tr>
    //     </thead>
    //     <tbody>{spellRows}</tbody>
    //   </table>
    // );
  }
}

export default SpellTable;
