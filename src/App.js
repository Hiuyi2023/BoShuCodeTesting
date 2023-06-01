import './App.css';
import CheckBoxGroup from './CheckBoxGroup';

const demoData = [
  { key: 'aaa', text: 'aaa' },
  { key: 'bbb', text: 'bbb' },
  { key: 'ccc', text: 'ccc' },
  { key: 'ddd', text: 'ddd' },
  { key: 'eee', text: 'eee' },
  { key: 'fff', text: 'fff' },
  { key: 'ggg', text: 'ggg' },
  { key: 'hhh', text: 'hhh' },
  { key: 'iii', text: 'iii' }
];
const DEFAULT_COLUMN = 3;

function App() {
  return (
    <div className="App">
      <CheckBoxGroup
        options={demoData}
        defaultColumns={DEFAULT_COLUMN}
        onChange={(selected, options) => { console.log(selected) }}
      />
    </div>
  );
}

export default App;
