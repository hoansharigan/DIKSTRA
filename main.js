function dijkstra(graph, start) {
  const distance = {};
  const visited = {};
  const parent = {};

  for (let node in graph) {
    distance[node] = Infinity;
    visited[node] = false;
    parent[node] = null;
  }

  distance[start] = 0;

  for (let i = 0; i < Object.keys(graph).length - 1; i++) {
    const u = minDistance(distance, visited);
    visited[u] = true;

    for (let v in graph[u]) {
      if (!visited[v] && distance[u] + graph[u][v] < distance[v]) {
        distance[v] = distance[u] + graph[u][v];
        parent[v] = u;
      }
    }
  }

  return { distance, parent };
}

function minDistance(distance, visited) {
  let min = Infinity;
  let minNode = null;

  for (let node in distance) {
    if (!visited[node] && distance[node] < min) {
      min = distance[node];
      minNode = node;
    }
  }

  return minNode;
}
const graph = {
  A: { B: 2, E: 4 }, 
  B: { A: 2, C: 3, D: 6 , E: 1 },
  C: { B: 3, D: 8, K:5, J:4, P: 5 },
  D: { B: 6, C: 8 , E: 3, K: 7},
  E: { A: 4, B: 1 , D: 3, K: 4 },
  K: {C: 5, D: 7,  E: 4, J: 4, O: 3},
  J: {C: 4, K: 4, L: 5},
  L: {J: 5, O: 8, P: 7},
  P: {C: 5, L: 7},
  O: {K: 3, L: 8}
};



const { distance, parent } = dijkstra(graph, startNode);


function Active(lines) {
  for (let i = lines.length - 1; i >= 0; i--) {
    let Class1 = lines[i];
    let Class2 = lines[i - 1];
    for (let i = 0; i < allLines.length; i++) {
      let node = allLines[i];
      // Kiểm tra xem cả hai class Class1 và Class2 có tồn tại trong classList của nút hay không
      if (node.classList.contains(Class1) && node.classList.contains(Class2)) {
        allLines[i].classList.add('active');
      }
    }
  }
}


function UnActive(unActive) {
  for (let i = unActive.length - 1; i >= 0; i--) {
    let Class1 = unActive[i];
    
    for (let i = 0; i < allLines.length; i++) {
      let node = allLines[i];
      // Kiểm tra xem cả hai class Class1 và Class2 có tồn tại trong classList của nút hay không
      if (node.classList.contains(Class1) ) {
        allLines[i].classList.remove('active'); //
      }
    }
  }
}

function findShortestPath() {
  var startNode = document.getElementById('startNode').value;
  var destinationNode = document.getElementById('destination').value;
  var { distance, parent } = dijkstra(graph, startNode);
  var lines=[];
  var unActive=['A' , 'B' , 'C' , 'D' , 'L' ,'P','J','K','O','E'];
  const path = [];
  let currentNode = destinationNode;
  lines.push(destinationNode) 
  unActive = unActive.filter(element => element !== destinationNode)
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = parent[currentNode];
    lines.push(currentNode);
    unActive = unActive.filter(element => element !== currentNode);
  }
  UnActive(unActive);
  Active(lines);
  
  const totalDistance = distance[destinationNode];
  var locations=[];
  var lists=[]

  for(let i = 0; i < path.length; i++){
    var location =  document.querySelector(`tr .${path[i]}`); 
    locations.push(location);
  }
  for(let i = 0; i < locations.length; i++){
    lists[i] = locations[i].textContent;
  }


  document.getElementById('path').innerHTML = `Đường đi ngắn nhất từ ${lists[0]} đến ${lists[lists.length-1]} : 

  
  ${lists.join(' -> ')}.`;
  document.getElementById('result').innerHTML = `Tổng quãng đường: ${totalDistance} km`;
  lines=[];
}

var allLines = document.querySelectorAll('.line');
// Ký tự bạn muốn kiểm tra


// Xóa đỉnh
function FixImage(value){
  var newImage = './img/SoDo' + value + '.png'
  document.querySelector('.SoDoImage').src = newImage;
  var addID = document.querySelector('.SoDoImage');
  addID.id = 'EditImg' + value;  
}
function ChangeImage(value){
  var newImage = './img/SoDo' + value + '.png'
  document.getElementById("text").src = newImage;
}

function DeleteTop(value){
  var elementsToHide = document.querySelectorAll(value);
  elementsToHide.forEach(function(element) {
  element.style.display = 'none';
  });
}
function ResetSD(){
// Lấy tất cả các thẻ div con nhỏ nhất bên trong thẻ div có class là "wrapperSD"
var childDivsInsideWrapperSD = document.querySelectorAll('.wrapperSD .line');

// Thiết lập display: block cho từng thẻ div con nhỏ nhất
for (var i = 0; i < childDivsInsideWrapperSD.length; i++) {
    childDivsInsideWrapperSD[i].style.display = 'block';
}

}


function DeleteDinhSoDo(){
  const DeleteDinhSelect = document.getElementById("delete_select").value;
  const valueDelete = DeleteDinhSelect;
  switch (DeleteDinhSelect) {
    case 'A':
      ResetSD();
      DeleteTop('.AB, .EA');
      FixImage('A');
      delete graph.A;
      graph = {
        B: { C: 3, D: 6 , E: 1 },
        C: { B: 3, D: 8, K:5, J:4, P: 5 },
        D: { B: 6, C: 8 , E: 3, K: 7},
        E: { B: 1 , D: 3, K: 4 },
        K: {C: 5, D: 7,  E: 4, J: 4, O: 3},
        J: {C: 4, K: 4, L: 5},
        L: {J: 5, O: 8, P: 7},
        P: {C: 5, L: 7},
        O: {K: 3, L: 8}
      };
      break;
    case 'B':
      ResetSD();
      DeleteTop('.AB, .BE, .BD, .BC');
      FixImage('B');
      delete graph.B;
      graph = {
        A: {E: 4 }, 
        C: {D: 8, K:5, J:4, P: 5 },
        D: {C: 8 , E: 3, K: 7},
        E: { A: 4, D: 3, K: 4 },
        K: {C: 5, D: 7,  E: 4, J: 4, O: 3},
        J: {C: 4, K: 4, L: 5},
        L: {J: 5, O: 8, P: 7},
        P: {C: 5, L: 7},
        O: {K: 3, L: 8}
      };
      break;
    case 'C':
      ResetSD();
      DeleteTop('.BC, .DC, .CK, .CJ, .CP');
      FixImage('C');
      graph = {
        A: { B: 2, E: 4 }, 
        B: { A: 2, D: 6 , E: 1 },
        D: { B: 6, E: 3, K: 7},
        E: { A: 4, B: 1 , D: 3, K: 4 },
        K: {D: 7,  E: 4, J: 4, O: 3},
        J: {K: 4, L: 5},
        L: {J: 5, O: 8, P: 7},
        P: {L: 7},
        O: {K: 3, L: 8}
      };
      delete graph.C;
      break;
    case 'D':
      ResetSD();
      DeleteTop('.BD, .DC, .ED, .DK');
      FixImage('D');
      graph = {
        A: { B: 2, E: 4 }, 
        B: { A: 2, C: 3,   E: 1 },
        C: { B: 3,  K:5, J:4, P: 5 },
        E: { A: 4, B: 1 , K: 4 },
        K: {C: 5,  E: 4, J: 4, O: 3},
        J: {C: 4, K: 4, L: 5},
        L: {J: 5, O: 8, P: 7},
        P: {C: 5, L: 7},
        O: {K: 3, L: 8}
      };
      delete graph.D;
      break;
    case 'E':
      ResetSD();
      DeleteTop('.EA, .BE, .ED, .EK');
      FixImage('E');
      delete graph.E;
      break;
    case 'K':
      ResetSD();
      DeleteTop('.EK, .DK, .CK, .KJ, .KO');
      FixImage('K');
      graph = {
        A: { B: 2, E: 4 }, 
        B: { A: 2, C: 3, D: 6 , E: 1 },
        C: { B: 3, D: 8,  J:4, P: 5 },
        D: { B: 6, C: 8 , E: 3, },
        E: { A: 4, B: 1 , D: 3,  },
        J: {C: 4,  L: 5},
        L: {J: 5, O: 8, P: 7},
        P: {C: 5, L: 7},
        O: {L: 8}
      };
      delete graph.K;
      break;
    case 'J':
      ResetSD();
      DeleteTop('.CJ, .JL, .KJ');
      FixImage('J');
      graph = {
        A: { B: 2, E: 4 }, 
        B: { A: 2, C: 3, D: 6 , E: 1 },
        C: { B: 3, D: 8, K:5,  P: 5 },
        D: { B: 6, C: 8 , E: 3, K: 7},
        E: { A: 4, B: 1 , D: 3, K: 4 },
        K: {C: 5, D: 7,  E: 4,  O: 3},
        L: { O: 8, P: 7},
        P: {C: 5, L: 7},
        O: {K: 3, L: 8}
      };
      delete graph.J;
      break;
    case 'P':
      ResetSD();
      DeleteTop('.CP, .PL');
      FixImage('P');
      graph = {
        A: { B: 2, E: 4 }, 
        B: { A: 2, C: 3, D: 6 , E: 1 },
        C: { B: 3, D: 8, K:5, J:4,  },
        D: { B: 6, C: 8 , E: 3, K: 7},
        E: { A: 4, B: 1 , D: 3, K: 4 },
        K: {C: 5, D: 7,  E: 4, J: 4, O: 3},
        J: {C: 4, K: 4, L: 5},
        L: {J: 5, O: 8, },
        O: {K: 3, L: 8}
      };
      delete graph.P;
      break;
    case 'O':
      ResetSD();
      DeleteTop('.KO, .OL');
      FixImage('O');
      graph = {
        A: { B: 2, E: 4 }, 
        B: { A: 2, C: 3, D: 6 , E: 1 },
        C: { B: 3, D: 8, K:5, J:4, P: 5 },
        D: { B: 6, C: 8 , E: 3, K: 7},
        E: { A: 4, B: 1 , D: 3, K: 4 },
        K: {C: 5, D: 7,  E: 4, J: 4},
        J: {C: 4, K: 4, L: 5},
        L: {J: 5, P: 7},
        P: {C: 5, L: 7},
      };
      delete graph.O;
      break;
    case 'L':
      ResetSD();
      DeleteTop('.PL, .OL, .JL');
      FixImage('L');
      graph = {
        A: { B: 2, E: 4 }, 
        B: { A: 2, C: 3, D: 6 , E: 1 },
        C: { B: 3, D: 8, K:5, J:4, P: 5 },
        D: { B: 6, C: 8 , E: 3, K: 7},
        E: { A: 4, B: 1 , D: 3, K: 4 },
        K: {C: 5, D: 7,  E: 4, J: 4, O: 3},
        J: {C: 4, K: 4},
        P: {C: 5},
        O: {K: 3}
      };
      delete graph.L;
      break;
      case '0':
        startNode;
        ResetSD();
        FixImage('0');
        graph;
        break;
    default:
      break;
  }
 
  }




