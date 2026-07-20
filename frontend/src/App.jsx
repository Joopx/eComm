// import {
//   SignedIn,
//   SignOutButton,
//   SignInButton,
//   SignedOut,
// } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./compnents/Navbar";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";
import HomePage from "./pages/HomePage"




function App() {

  const {isClerkLoaded, isSignedIn} = useAuthReq()
  useUserSync()

  if(!isClerkLoaded) return null;

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
              <Route path="/profile" element ={isSignedIn?<ProfilePage/>: <Navigate to={"/"}/>}></Route>
              <Route path="/create" element ={isSignedIn? <CreatePage/>: <Navigate to ={"/"}> </Navigate>}></Route>
              <Route path="/edit/:id" element ={isSignedIn?<EditProductPage/>: <Navigate to={"/"}/>}></Route>
            </Routes>
         </main>

      </div>
    </>
  );
}

export default App;
