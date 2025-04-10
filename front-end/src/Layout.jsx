import React from "react";

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-slate-900 via-gray-900 to-black text-white font-sans">
  
      <header className="bg-gray-950/90 shadow-lg backdrop-blur border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-500 tracking-tight">
            TensorGo
          </h1>

          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="font-semibold text-white leading-tight text-sm">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate max-w-[150px]">
                  {user.email}
                </p>
              </div>
              <img
                src={user.picture}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-gray-600 shadow-md"
              />
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded shadow-md transition-all duration-150"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow px-4 py-8 sm:px-6 max-w-4xl mx-auto w-full space-y-10">
        {children}
      </main>

      <footer className="bg-gray-950 border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} TensorGo. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
