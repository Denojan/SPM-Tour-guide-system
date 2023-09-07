// ParentComponent.js

import React, { useRef } from "react";
import SearchPlaces from "./SearchPlaces";
import WishList from "./WishList";

function ParentComponent() {
  const mainRef = useRef();

  const handleExploreClick = () => {
    if (mainRef.current) {
      mainRef.current.Explore();
    }
  };

  return (
    <div>
      {/* Render the Main component and pass the ref */}
      <SearchPlaces ref={mainRef} />

      {/* Render AnotherComponent and pass the function as a prop */}
      <WishList onExploreClick={handleExploreClick} />
    </div>
  );
}

export default ParentComponent;
