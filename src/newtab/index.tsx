import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";
function NewTab() {
  const [bookmarkArray, setBookmarkArray] = useState([]);

  useEffect(() => {
    chrome.bookmarks.getTree(function (bookmarkArray) {
      setBookmarkArray(bookmarkArray[0].children[0].children);
    });
  }, []);

  return (
    <div className="newTab">
      {bookmarkArray.map(
        (item, i) =>
          item.children && (
            <div className="tab" key={i}>
              <span className="bookmark" data-content={item.title}></span>
              <ul>
                {item.children.map((child, j) => (
                  <a href={child.url} key={j}>
                    <li>{child.title}</li>
                  </a>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
}

ReactDOM.render(<NewTab />, document.getElementById("root"));
