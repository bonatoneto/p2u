import { EditNote } from "@mui/icons-material";
import { useState } from "react";
import "./EditIcon.scss";

export default function EditIcon(props) {

  const [isShown, setIsShown] = useState(true);
  
  return (
    <div className="editIcon" id={props.id} onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
      <div className="edit-hover">
        <div className={isShown ? "editText-hover iconHide" : "editText-hover iconShow"}>
          <span>Editar</span>
        </div>
        <EditNote className="noteIcon" />
      </div>
    </div>
  );
}
