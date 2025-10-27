import React from "react";
import Button from "../ui/Button";

const Searchbar = () => {
  return (
    <>
      <div className="flex gap-4">
        <div className="searchBox w-[90%] h-[50px] bg-[#e5e5e5] rounded-xl relative p-2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-100 h-[35px] focus:outline-none"
          />
        </div>
        <Button className="bg-primary rounded-xl w-[100px] hover:cursor-pointer">
          Buscar
        </Button>
      </div>
    </>
  );
};

export default Searchbar;
