import DateSelector from "./DateSelector";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 top-0 drop-shadow-xl z-10">
      <div className="prose prose-xl mx-auto flex justify-around items-center flex-row text-white">
        <h1>Sportly 🏈⚾🏀</h1>
        <h1>NFL</h1>
        <h1>MLB</h1>
        <h1>NBA</h1>
        <DateSelector />
      </div>
    </nav>
  );
}
