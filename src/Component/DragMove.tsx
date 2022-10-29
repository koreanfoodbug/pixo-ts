import React, { PointerEventHandler, useState } from "react";

interface Props {
    onDragMove: (e: PointerEvent) => void;
    children: React.ReactNode;
    toggleEditable: () => void;
}

const DragMove: React.FC<Props> = (props) => {
  const {
    onDragMove,
    children,
    toggleEditable,
  } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [click, setClick] = useState(false);

  const handlePointerDown: PointerEventHandler = (e) => {
    setClick(true);
    setIsDragging(true);
  };

  const handlePointerUp: PointerEventHandler = () => {
    if (click) {
        toggleEditable();
    }
    
    setIsDragging(false);
  };

  const handlePointerMove = (e: any): void => {
    setClick(false)
    if (isDragging) onDragMove(e);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsDragging(false)}
    >
      {children}
    </div>
  );
}

export default DragMove;