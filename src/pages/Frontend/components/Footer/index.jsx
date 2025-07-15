import React from "react";

function index() {

const year = new Date().getFullYear()

  return (
    <div className="py-2 bg-black text-white text-sm text-center">
        &copy: {year}. All rights are reserved.
    </div>
  );
}

export default index;
