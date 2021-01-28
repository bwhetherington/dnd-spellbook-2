import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Component from './Component';
import Tag from './Tag';

const SPELL_LEVELS = {
  0: 'cantrip',
  1: '1st-level',
  2: '2nd-level',
  3: '3rd-level',
};

const renderTags = (spell) => {
  const components = [];
  if (spell.concentration) {
    components.push(
      <Tag primary key="conc">
        Concentration
      </Tag>
    );
  }
  if (spell.ritual) {
    components.push(
      <Tag secondary key="rit">
        Ritual
      </Tag>
    );
  }
  return components;
};

function getSpellLevel(level) {
  let text = SPELL_LEVELS[level];
  if (text === undefined) {
    text = `${level}th-level`;
  }
  return text;
}

function capitalize(str) {
  if (str.length > 0) {
    const first = str[0];
    const rest = str.slice(1);
    return `${first.toUpperCase()}${rest}`;
  } else {
    return '';
  }
}

function getSpellBriefLine(spell) {
  const components = [];
  if (spell.level === 0) {
    components.push(
      <span key="brief" className="fill">
        {capitalize(spell.school)} cantrip
      </span>
    );
  } else {
    components.push(
      <span key="brief" className="fill">
        {capitalize(getSpellLevel(spell.level))} {spell.school}
      </span>
    );
  }
  return components.concat(renderTags(spell));
}

function SpellComponent(props) {
  const { spell } = props;
  const {
    name,
    casting_time,
    range,
    components,
    duration,
    desc,
    higher_level,
    classes,
    material,
  } = spell;
  const levelLine = (
    <p>
      <i className="flex">{getSpellBriefLine(spell)}</i>
    </p>
  );
  let componentsLine = components;
  if (material) {
    componentsLine += ` (${material})`;
  }
  const properties = (
    <p>
      <b>Casting Time:</b> {casting_time}
      <br />
      <b>Range:</b> {range}
      <br />
      <b>Components:</b> {componentsLine}
      <br />
      <b>Duration:</b> {duration}
    </p>
  );
  const spellDescription = ReactHtmlParser(desc);
  const higherLevel =
    higher_level === undefined ? (
      ''
    ) : (
      <p>
        <b>
          <i>At Higher Levels.</i>
        </b>{' '}
        {ReactHtmlParser(higher_level)}
      </p>
    );
  const description = <div>{spellDescription}</div>;
  const availableTo = (
    <p>
      <b>Available To:</b> {classes.map(capitalize).join(', ')}
    </p>
  );
  return (
    <div>
      <h2>{name}</h2>
      {levelLine}
      <hr />
      {properties}
      <hr />
      {description}
      {higherLevel}
      <hr />
      {availableTo}
    </div>
  );
}

class Spell extends Component {
  state = {
    spellIndex: 0,
  };

  render() {
    const { spellIndex } = this.state;
    const { spells } = this.props;
    const currentSpell = spells[spellIndex];

    if (currentSpell === undefined) {
      // Handle error
      return <div>ERROR: Spell not found</div>;
    } else {
      const selector = spells.length > 1 ? <p>Insert Selector Here</p> : <span />;
      return (
        <div>
          <SpellComponent spell={currentSpell} />
          {selector}
        </div>
      );
    }
  }
}

export default Spell;
