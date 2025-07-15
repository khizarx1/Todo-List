import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

function Topbar() {
    const [currentDay, setCurrentDay] = useState("");

    useEffect(() => {
        setInterval(() => {
            setCurrentDay(dayjs().format('dddd, MMMM D YYYY,  h:mm:ss A'));
        }, 1000);
    }, [])

    return (
        <header className="py-2 bg-[#449DD1] text-white text-center">
            <p>{currentDay}</p>
        </header>
    );
}

export default Topbar;
