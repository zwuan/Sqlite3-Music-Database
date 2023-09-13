uid = localStorage.getItem("UID");
username = localStorage.getItem("name");
document.getElementById("page").innerHTML = "user " + username + " UID: " + uid;  //"page_title"

const wrapper = document.getElementById('content');

function ListFunc() {
    var select = document.getElementById('ListType')
    var valueSelected = select.options[select.selectedIndex].value;  //4list which Pro SongWr
    var input_list = document.getElementById('ListId').value;
    fetch('http://127.0.0.1:5000/' + valueSelected + '/' + input_list)
        .then(data => data.json())
        .then(jsonData => {
            CreateTable(jsonData, false);
        })
        .catch(e => {
            remove_table();
            //wrapper.innerText = "Error: " + e + " going to use demo data";
        });
}

function PersonFunc() {
    var select = document.getElementById('PersonType')
    var valueSelected = select.options[select.selectedIndex].value; //what type
    var input_name = document.getElementById('Name').value;

    fetch('http://127.0.0.1:5000/search' + valueSelected + '/' + input_name)
        .then(data => data.json())
        .then(jsonData => {
            //console.log(jsonData.length)
            CreateTable(jsonData, true);
        })
        .catch(e => {
            remove_table();
            //wrapper.innerText = "Error: " + e + " going to use demo data";
        });
};





function dom(tag, text) {
    let r = document.createElement(tag);
    if (text) r.innerText = text;
    return r;
};

function append(parent, child) {
    parent.appendChild(child);
    return parent;
};

function remove_table() {
    if (document.getElementById("table")) {
        var element = document.getElementById("table");
        element.remove();
    }
}

function CreateTable(json, subscribeList) {
    if (json.length === 0) {
        remove_table();
       //wrapper.innerText = "No any datas"; //Error: No any data
    };
    remove_table();
    let keys = Object.keys(json[0]);
    let table = dom('table');
    table.className += 'blueTable';
    table.setAttribute('id', 'table')
        //header
    append(table,
        keys.map(k => dom('th', k)).reduce(append, dom('tr'))
    );


    //values列
    const makeRow = (acc, row) =>
        append(acc,
            keys.map(k => dom('td', row[k])).reduce(append, dom('tr'))
        );

    json.reduce(makeRow, table);
    if (subscribeList) {   //search人才出現 訂閱不出現
        // open loop for each row and append cell
        for (i = 0; i < table.rows.length; i++) {
            createCell(table.rows[i].insertCell(table.rows[i].cells.length), "訂閱", 'subscribe', i);
        }
    }
    wrapper.appendChild(table);
};

// utility functions
function getChildren(n, skipMe) {
    var r = [];
    for (; n; n = n.nextSibling)
        if (n.nodeType == 1 && n != skipMe)
            r.push(n.outerText);
    return r;
};

function getSiblings(n) {
    return getChildren(n.parentNode.firstChild, n);
}


function createCell(cell, text, style, number) {
    var ele = (number) ? 'button' : 'div';
    var input = document.createElement(ele), //建立button or div
        txt = document.createTextNode(text);
    input.appendChild(txt);
    if (number) {
        input.setAttribute('class', style);
        input.onclick = (e) => {
            console.log(getSiblings(e.target.parentNode))
            var songName = getSiblings(e.target.parentNode)[0];
            var url1 = 'http://127.0.0.1:5000/FindSong/' + songName
            fetch(url1, {method: "GET"})
                .then(data => data.json())
                .then(jsonData => {
                    console.log(jsonData)
                    if (jsonData.length === 0) {
                        alert("未找到該歌曲id")
                        return
                    }
                    var sid = jsonData[0].sid
                    var Mid = window.localStorage.getItem("UID");
                    var url = 'http://127.0.0.1:5000/subscribeSong/' + Mid + '/' + sid;
                    fetch(url, {method: "GET"})
                        .then(data => data.text())
                        .then(jsonData => {
                            alert("成功將" + songName + "歌曲，加入至" + Mid);
                        })
                        .catch(e => {
                            remove_table();
                            //wrapper.innerText = "Error: " + e + " going to use demo data";
                        });
                })
                .catch(e => {
                    //wrapper.innerText = "Error: " + e + " going to use demo data";
                });
        };
    }
    cell.appendChild(input)
}


function subscribeArtist(){
  var name = document.getElementById('Name').value
  if(name === ''){
    alert('請輸入人名')
    return
  }
  var Mid = window.localStorage.getItem("UID");
  var url1 = 'http://127.0.0.1:5000/FindArtist' + '/' + name
  fetch(url1,{method: "GET"})
    .then(data => data.json())
    .then(jsonData => {
      if(jsonData.length === 0){
        alert("未找到該人id")
        return
      }
      var aid = jsonData[0].aid
      var url = 'http://127.0.0.1:5000/subscribeArtist/' + Mid + '/' + aid;
      console.log(url)
      fetch(url,{method: "GET"})
        .then(data => data.text())
        .then(jsonData => {
          alert("success")
        })
        .catch(e => {
          remove_table();
          //wrapper.innerText = "Error: " + e + " going to use demo data";
        });
    })
    .catch(e => {
      //wrapper.innerText = "Error: " + e + " going to use demo data";
    })
}


function subscribeProducer(){
  var name = document.getElementById('Name').value
  if(name === ''){
    alert('請輸入人名')
    return
  }
  var Mid = window.localStorage.getItem("UID");
  var url1 = 'http://127.0.0.1:5000/FindProducer' + '/' + name
  fetch(url1,{method: "GET"})
    .then(data => data.json())
    .then(jsonData => {
      if(jsonData.length === 0){
        alert("未找到該人id")
        return
      }
      var aid = jsonData[0].pid
      var url = 'http://127.0.0.1:5000/subscribeProducer/' + Mid + '/' + aid;
      console.log(url)
      fetch(url,{method: "GET"})
        .then(data => data.text())
        .then(jsonData => {
          alert("success")
        })
        .catch(e => {
          remove_table();
          //wrapper.innerText = "Error: " + e + " going to use demo data";
        });
    })
    .catch(e => {
      //wrapper.innerText = "Error: " + e + " going to use demo data";
    })
}

function subscribeSongWriter(){
  var name = document.getElementById('Name').value
  if(name === ''){
    alert('請輸入人名')
    return
  }
  var Mid = window.localStorage.getItem("UID");
  var url1 = 'http://127.0.0.1:5000/FindSongWriter' + '/' + name
  fetch(url1,{method: "GET"})
    .then(data => data.json())
    .then(jsonData => {
      if(jsonData.length === 0){
        alert("未找到該人id")
        return
      }
      var aid = jsonData[0].wid
      var url = 'http://127.0.0.1:5000/subscribeSongWriter/' + Mid + '/' + aid;
      console.log(url)
      fetch(url,{method: "GET"})
        .then(data => data.text())
        .then(jsonData => {
          alert("success")
        })
        .catch(e => {
          remove_table();
          //wrapper.innerText = "Error: " + e + " going to use demo data";
        });
    })
    .catch(e => {
      //wrapper.innerText = "Error: " + e + " going to use demo data";
    })
}

/*var valueSelected = select.options[select.selectedIndex].value;  //4list which
var input_list = document.getElementById('ListId').value;
fetch('http://127.0.0.1:5000/' + valueSelected + '/' + input_list)
    .then(data => data.json())
    .then(jsonData => {
        CreateTable(jsonData, false);
    })
    .catch(e => {
        remove_table();
        wrapper.innerText = "Error: " + e + " going to use demo data";
    });*/
