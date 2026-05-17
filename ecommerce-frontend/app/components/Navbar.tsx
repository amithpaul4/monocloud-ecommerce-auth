"use client";

type NavbarProps = {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  cartCount: number;
};

export default function Navbar({
  isLoggedIn,
  handleLogin,
  handleLogout,
  cartCount,
}: NavbarProps) {
  return (
    <nav className="bg-black/90 backdrop-blur-md text-white px-8 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
          M
        </div>

        <h1 className="text-3xl font-bold tracking-wide">
          MonoShop
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Cart */}
        <div className="relative">
          <button className="hover:scale-110 transition-all duration-300 text-2xl">
            🛒
          </button>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {/* User Avatar */}
        {isLoggedIn && (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
            A
          </div>
        )}

        {/* Login / Logout */}
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}