import { useState, useRef } from "react";
import { usePopper } from "react-popper";
import HighJewellery from "./HighJewellery";

const Hoverpopper = ({lable=null,icon=null,children,offset,open}) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    anchorRef.current,
    popperRef.current,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [offset.offsetX, offset.offsetY-210],
          },
        },
      ],
    }
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  

  return (
    <>
     
      <div ref={anchorRef} onMouseEnter={handleOpen} >
        {lable} {icon}
        
      </div>
      <div
        onMouseLeave={handleClose}
        onMouseEnter={handleOpen}
        
        ref={popperRef}
        style={{ ...styles.popper, visibility: isOpen ? "visible" : "hidden" }}
        {...attributes.popper}
      >
        {children} 
      </div>
      
    </>
  );
};

export default Hoverpopper;
