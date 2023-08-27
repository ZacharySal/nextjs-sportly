import DateSelector from "./DateSelector";

export default function Navbar() {
  return (
    <nav className="w-full h-10 bg-gray-800 drop-shadow-xl z-10 mx-auto flex justify-around items-center text-sm flex-row text-white sticky top-0">
      <h1>Sportly</h1>
      <h1>NFL</h1>
      <h1>MLB</h1>
      <h1>NBA</h1>
    </nav>
  );
}
