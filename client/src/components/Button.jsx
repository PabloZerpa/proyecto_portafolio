
import { useState } from "react";

function Button({children, color, width=24}) {
    const [clase, setClase] = useState(
        `w-${width} h-8 text-sm bg-${color}-600 text-white border-none outline-none rounded cursor-pointer hover:bg-${color}-500`
    )

    return(
        <button className={clase} size='small' >
            {children}
        </button>
    );
}

export default Button;