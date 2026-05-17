"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
  fetch("/api/token")
    .then((res) => res.json())
    .then((tokenData) => {
      console.log(tokenData);

      // If token exists → user is logged in
      if (tokenData.token) {
        setIsLoggedIn(true);

        return fetch("http://localhost:5000/products", {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        });
      }

      // If no token → user not logged in
      setIsLoggedIn(false);
    })
          .then((res) => {
        if (!res) return;

        // Token expired or unauthorized
        if (res.status === 401) {
          alert("Session expired. Please login again.");

          window.location.href = "/api/auth/signin";

          return;
        }

        return res.json();
      })
    .then((data) => {
      if (data) {
        setProducts(data);
      }
    })
    .catch((err) => console.log(err));
}, []);

  const handleLogin = () => {
  window.location.href = "/api/auth/signin";
};

  const handleLogout = () => {
  setIsLoggedIn(false);
  setProducts([]);

  window.location.href = "/api/auth/signout";
};

const handleAddToCart = () => {
  setCartCount((prev) => prev + 1);
};

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
          <Navbar
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            cartCount={cartCount}
          />

      {/* Hero */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-16 px-8">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

    {/* Left Content */}
    <div>
      <h2 className="text-5xl font-extrabold leading-tight animate-pulse">
        Shop Smarter <br />
        with MonoShop
      </h2>

      <p className="text-gray-300 text-xl mt-6">
        Secure ecommerce powered by MonoCloud OAuth
        authentication and JWT protected APIs.
      </p>

      <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl">
        Explore Products
      </button>
    </div>

    {/* Right Image */}
    <div className="flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        alt="shopping"
        className="rounded-3xl shadow-2xl w-full max-w-md hover:scale-105 transition-all duration-500"
      />
    </div>

  </div>
</div>

      {/* Content */}
      <div className="p-8">
        {!isLoggedIn ? (
          <div className="text-center mt-20 bg-white max-w-xl mx-auto p-10 rounded-3xl shadow-xl">
            <div className="text-6xl mb-4">🔒</div>

            <h2 className="text-4xl font-bold mb-4">
              Login Required
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              Secure products are available only for
              authenticated users.
            </p>

            <button
              onClick={handleLogin}
              className="bg-black text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Login with MonoCloud
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((p: any) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl duration-300 transition-all duration-300"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-60 w-full object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-2xl font-bold">
                      {p.name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Premium quality product with modern design.
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-2xl font-bold">
                        {p.price}
                      </span>

                      <button
                        onClick={handleAddToCart}
                        className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}