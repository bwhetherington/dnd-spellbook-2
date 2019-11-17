import Component from './Component';
import { asyncIterator, iterator } from 'lazy-iters';

async function readUrl(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

async function* readUrls(urls) {
  for (const url of urls) {
    yield await readUrl(url);
  }
}

export async function loadUrls(urls) {
  const sources = await asyncIterator(readUrls(urls)).collect();
  const spells = iterator(sources)
    .flatMap(source => iterator(source.spells).map(spell => ({ ...spell, source: source.name })))
    .collect();
  return spells;
}

export function buildSpellMap(spells) {
  const spellMap = {};
  for (const spell of spells) {
    const { name } = spell;
    const entry = spellMap[name];
    if (entry instanceof Array) {
      entry.push(spell);
    } else {
      spellMap[name] = [spell];
    }
  }
  return spellMap;
}

class SpellLoader extends Component {
  state = {
    // `spells` is a mapping of spell names to lists of corresponding spells
    spells: {}
  };

  loadSource(source) {}

  loadSpell(spell) {}
}

// export default SpellLoader;
