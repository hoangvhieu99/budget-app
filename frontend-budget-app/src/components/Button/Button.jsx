import React from "react";
function Button({ name, icon, onClick, bg, bPad, color, bRad }) {
  return (
    <button
      className="button-style"
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
      onClick={onClick}
    >
      {icon}
      {name}
    </button>
  );
}

export default Button;
