import React from "react";

export default function Spinner({ width = 4, height = 4, color = "blue" }) {

    return (
        <div className="flex items-center justify-center">
            <div className={`spinner-border animate-spin inline-block w-${width} h-${height} border-4 rounded-full text-${color}-300`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
