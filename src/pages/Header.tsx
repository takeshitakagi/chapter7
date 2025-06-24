import { Link } from "react-router-dom";

function Header() {

  return (
    <>
      <div class='bg-gray-800 text-white'>
        <div class='max-w-3xl mx-auto flex justify-between py-6'>
          <Link to="/" class='text-2xl'>blog</Link>
          <Link to="/contact" class='text-xl'>お問い合わせ</Link>
        </div>
      </div>
    </>
  );
};
export default Header;
