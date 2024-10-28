import { useState } from "react";
function Footer() {

    const year = new Date().getFullYear();
    return (
        <>
            <div className="fixed bottom-0 bg-lime-400 flex flex-row p-3 w-full justify-center">
                <span>Andreas Moraits &nbsp; &copy;{year}</span>
            </div>
        </>
    );
}

export default Footer;