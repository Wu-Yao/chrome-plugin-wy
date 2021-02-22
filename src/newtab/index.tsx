import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";
function NewTab() {
  const [bookmarkArray, setBookmarkArray] = useState([]);
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    chrome.bookmarks.getTree(function (bookmarkArray) {
      setBookmarkArray(bookmarkArray[0].children[0].children);
    });
    chrome.history.search({ text: "" }, (res) => {
      const array = Array.from(new Set(res)).splice(0, 10);
      setHistoryArray(array);
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
      {historyArray.length && (
        <div className="tab">
          <span className="bookmark" data-content="历史记录"></span>
          <ul>
            {historyArray.map((item, i) => (
              <a href={item.url} key={i}>
                <li>{item.title}</li>
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<NewTab />, document.getElementById("root"));
