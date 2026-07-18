// import {
//   SignedIn,
//   SignOutButton,
//   SignInButton,
//   SignedOut,
// } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./compnents/Navbar";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";

function HomePage() {
  return <div>Home Page</div>;
}

function App() {
  return (
    <>
      <div className="min-h-screen bg-base-100">

        {/*if user is signing in then show sign out and vice versa 
    <SignedOut>

      <SignInButton mode="modal" />
    </SignedOut>
     
     <SignedIn>

      <SignOutButton />
    </SignedIn>
    */}
        <Navbar />
         <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>  
              <Route path="/" element ={<HomePage/>}></Route>
              <Route path="/product/:id" element ={<ProductPage/>}></Route>
              <Route path="/profile" element ={<ProfilePage/>}></Route>
              <Route path="/create" element ={<CreatePage/>}></Route>
              <Route path="/edit/:id" element ={<EditProductPage/>}></Route>
            </Routes>
         </main>

      </div>
    </>
  );
}

export default App;
