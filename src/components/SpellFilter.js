import React from 'react';
import Select from './Select';
import './SpellFilter.css';

const CLASS_OPTIONS = [
  {
    value: 'any',
    label: 'Class'
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

const SCHOOL_OPTIONS = [
  {
    value: 'any',
    label: 'School'
  },
  {
    value: 'abjuration',
    label: 'Abjuration'
  },
  {
    value: 'conjuration',
    label: 'Conjuration'
  },
  {
    value: 'divination',
    label: 'Divination'
  },
  {
    value: 'enchantment',
    label: 'Enchantment'
  },
  {
    value: 'evocation',
    label: 'evocation'
  },
  {
    value: 'illusion',
    label: 'Illusion'
  },
  {
    value: 'necromancy',
    label: 'Necromancy'
  },
  {
    value: 'transmutation',
    label: 'Transmutation'
  }
];

const DEFAULT_LISTENERS = {
  spellName: _ => {},
  spellClass: _ => {},
  spellSchool: _ => {}
};

function SpellFilter(props) {
  const { filter, onChangeProperties = DEFAULT_LISTENERS } = props;

  const { spellName, spellClass, spellSchool } = filter;
  const {
    spellName: onChangeName,
    spellClass: onChangeClass,
    spellSchool: onChangeSchool
  } = onChangeProperties;

  return (
    <div className="SpellFilter">
      <input type="text" value={spellName} onChange={onChangeName} placeholder="Spell Name" />
      <Select
        options={CLASS_OPTIONS}
        value={spellClass}
        onChange={onChangeClass}
        placeholder="Class"
      />
      <Select
        options={SCHOOL_OPTIONS}
        value={spellSchool}
        onChange={onChangeSchool}
        placeholder="School"
      />
    </div>
  );
}
