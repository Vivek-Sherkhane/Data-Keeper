import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

function InstructionBox({ list }) {
  const [hide, setHide] = useState(false);
  return (
    <div>
      {!hide ? (
        <div className="message-box alert-info">
          <div>
            <h5>Important Instructions</h5>
            <p>1.The file should be a excel (xlsx) file.</p>
            <p>
              2.The file should contain the following fileds :
              <ul>
                {list.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </p>
            <p>Note:The fields should be named as specified above.</p>
          </div>
          <div>
            <Tooltip title="close" arrow style={{ fontSize: "2rem" }}>
              <CloseIcon
                onClick={(e) => setHide(!hide)}
                className="close-icon"
              />
            </Tooltip>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default InstructionBox;
