import React from "react";

import "./Table.css";
import { isArray } from "util";
// {actionName: '', method: () => {}, class: ''/undefined }
function Table({ data, dataIgnored, actions }) {
  function DataExist() {
    if (data) {
      if (isArray(data)) {
        if (data.length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  return (
    <>
      {DataExist(data) && <p className="no-data">:( No existen datos</p>}
      <div className="table">

        <div className="table-header">
          {data &&
            Object.entries(data[0]).map((item,index) => {
              if (dataIgnored) {
                if (dataIgnored.indexOf(item[0]) === -1) {
                  return <p key={index}>{item[0]}</p>;
                }
              } else {
                return <p key={index}>{item[0]}</p>;
              }
            })}

          {Array.isArray(actions) && <p>Actions</p>}
        </div>

        {data &&
          data.map((item,index) => {
            return (
              <div className="table-row" key={index}>
                {Object.entries(item).map((i,k) => {
                  if (dataIgnored) {
                    if (dataIgnored.indexOf(i[0]) === -1) {
                      return <p key={k}> {i[1]} </p>;
                    }
                  } else {
                    return <p key={k}> {i[1]} </p>;
                  }
                })}

                {Array.isArray(actions) && (
                  <p>
                    {
                    actions.map((actionItem, k) => {
                      if (actionItem.class) {
                        return (
                          <button key={k}
                            onClick={() => actionItem.method(data[index])}
                            className={actionItem.class}
                          >
                            {actionItem.actionName}
                          </button>
                        );
                      } 
                      else {
                        return (
                          <button key={k}
                            onClick={ () => actionItem.method(data[index])}
                            className="action-btn"
                          >
                            {actionItem.actionName}
                          </button>
                        );
                      }
                    })
                    }
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Table;
