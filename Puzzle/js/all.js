let timer, puzzleSize, level, image;
let block = [],
  answer = [];
let isUpload = false,
  steps = 0;
let isFinished = null;
const createBlockArray = () => {
  level = parseInt(document.querySelector("#select").value);
  block = [];
  answer = [];
  for (let i = 0; i < level * level; i++) {
    i == level * level - 1 ? block.push("empty") : block.push(`${i}`);
    i == level * level - 1 ? answer.push("empty") : answer.push(`${i}`);
  }
  do {
    let j = 0;
    while (j < level * level * level) {
      emptyIndex = block.findIndex(x => x == "empty");
      let enableChangedPosition = []
      let position = emptyIndex == 0 ? "leftTop" : emptyIndex == level * level - 1 ? "rightBottom" : emptyIndex == level - 1 ? "rightTop" : emptyIndex == level * level - level ? "leftBottom" : emptyIndex > 0 && emptyIndex < level - 1 ? "top" : emptyIndex > level * level - level && emptyIndex < level * level - 1 ? "bottom" : emptyIndex % level == 0 ? "left" : emptyIndex % level == level - 1 ? "right" : "center";

      switch (position) {
        case "leftTop":
          enableChangedPosition.push(emptyIndex + level);
          enableChangedPosition.push(emptyIndex + 1);
          break;
        case "leftBottom":
          enableChangedPosition.push(emptyIndex - level);
          enableChangedPosition.push(emptyIndex + 1);
          break;
        case "rightTop":
          enableChangedPosition.push(emptyIndex + level);
          enableChangedPosition.push(emptyIndex - 1);
          break;
        case "rightBottom":
          enableChangedPosition.push(emptyIndex - level);
          enableChangedPosition.push(emptyIndex - 1);
          break;
        case "top":
          enableChangedPosition.push(emptyIndex - 1);
          enableChangedPosition.push(emptyIndex + 1);
          enableChangedPosition.push(emptyIndex + level);
          break;
        case "left":
          enableChangedPosition.push(emptyIndex + 1);
          enableChangedPosition.push(emptyIndex - level);
          enableChangedPosition.push(emptyIndex + level);
          break;
        case "right":
          enableChangedPosition.push(emptyIndex - 1);
          enableChangedPosition.push(emptyIndex + level);
          enableChangedPosition.push(emptyIndex - level);
          break;
        case "bottom":
          enableChangedPosition.push(emptyIndex - 1);
          enableChangedPosition.push(emptyIndex + 1);
          enableChangedPosition.push(emptyIndex - level);
          break;
        default:
          enableChangedPosition.push(emptyIndex - 1);
          enableChangedPosition.push(emptyIndex + 1);
          enableChangedPosition.push(emptyIndex - level);
          enableChangedPosition.push(emptyIndex + level);
      }

      targetIndex = enableChangedPosition[Math.floor(Math.random() * enableChangedPosition.length)];
      let tmp = block[emptyIndex]
      block[emptyIndex] = block[targetIndex]
      block[targetIndex] = tmp
      j++;

    }
  } while (answer.every((item, index) => index == block.indexOf(item)))
}
const createPuzzle = () => {
  puzzleSize = $(window).width() >= 800 ? 600 : $(window).width() >= 600 ? 540 : $(window).width() - 20;

  document.querySelector(".puzzle").innerHTML = "";
  document.querySelector(".puzzle").setAttribute("style", `width:${puzzleSize}px;height:${puzzleSize}px;`)

  block.forEach((item, index) => {
    let blockDiv = document.createElement("div");
    blockDiv.classList.add("block");
    let row = parseInt(item / level);
    let col = item % level;
    let rowPosition = parseInt(index / level);
    let colPosition = index % level;
    let eachBlockSize = puzzleSize / level;
    if (item == "empty") {
      blockDiv.setAttribute("data-id", "empty");
      blockDiv.setAttribute("style", `width:${Math.floor(eachBlockSize-2)}px;height:${Math.floor(eachBlockSize-2)}px;border:1px solid transparent; left:${colPosition * Math.floor(eachBlockSize)}px; top:${rowPosition *  Math.floor(eachBlockSize)}px`);
    } else {
      blockDiv.setAttribute("data-id", item);
      blockDiv.setAttribute("style", `background: url(${image}) no-repeat; background-size: ${puzzleSize}px ${puzzleSize}px;background-position: ${col * - Math.floor(eachBlockSize)}px ${row * - Math.floor(eachBlockSize)}px;width:${Math.floor(eachBlockSize-2)}px;height:${Math.floor(eachBlockSize-2)}px; left:${colPosition * Math.floor(eachBlockSize)}px; top:${rowPosition *  Math.floor(eachBlockSize)}px`);
    }
    document.querySelector(".puzzle").appendChild(blockDiv);
    document.querySelector(".puzzle").removeEventListener("click",click);
  })
};

const changePosition = (item) => {
  let targetIndex, emptyIndex, position;
  targetIndex = block.findIndex((x) => x == item);
  emptyIndex = block.findIndex((x) => x == "empty");
  position = targetIndex == 0 ? "leftTop" : targetIndex == level * level - 1 ? "rightBottom" : targetIndex == level - 1 ? "rightTop" : targetIndex == level * level - level ? "leftBottom" : targetIndex > 0 && targetIndex < level - 1 ? "top" : targetIndex > level * level - level && targetIndex < level * level - 1 ? "bottom" : targetIndex % level == 0 ? "left" : targetIndex % level == level - 1 ? "right" : "center";
  switch (position) {
    case "leftTop":
      if (
        targetIndex + 1 == emptyIndex ||
        targetIndex + level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    case "rightTop":
      if (
        targetIndex - 1 == emptyIndex ||
        targetIndex + level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    case "leftBottom":
      if (
        targetIndex + 1 == emptyIndex ||
        targetIndex - level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    case "rightBottom":
      if (
        targetIndex - 1 == emptyIndex ||
        targetIndex - level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    case "top":
      if (
        targetIndex + 1 == emptyIndex ||
        targetIndex - 1 == emptyIndex ||
        targetIndex + level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    case "left":
      if (
        targetIndex + 1 == emptyIndex ||
        targetIndex + level == emptyIndex ||
        targetIndex - level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    case "right":
      if (
        targetIndex - 1 == emptyIndex ||
        targetIndex + level == emptyIndex ||
        targetIndex - level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    case "bottom":
      if (
        targetIndex + 1 == emptyIndex ||
        targetIndex - 1 == emptyIndex ||
        targetIndex - level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
      break;
    default:
      if (
        targetIndex + 1 == emptyIndex ||
        targetIndex - 1 == emptyIndex ||
        targetIndex + level == emptyIndex ||
        targetIndex - level == emptyIndex
      ) {
        [block[targetIndex], block[emptyIndex]] = [block[emptyIndex], block[targetIndex]];
      }
  }
};
const changePuzzle = (target) => {
  let targetIndex = block.findIndex(x => x == target.dataset.id);
  let emptyIndex = block.findIndex(x => x == "empty");
  let empty = document.querySelector("[data-id='empty']");
  let eachBlockSize = puzzleSize / level;
  if (targetIndex + 1 == emptyIndex) {
    target.style.left = stringHandle(target.style.left, eachBlockSize);
    empty.style.left = stringHandle(empty.style.left, -eachBlockSize);
  } else if (targetIndex - 1 == emptyIndex) {
    target.style.left = stringHandle(target.style.left, -eachBlockSize);
    empty.style.left = stringHandle(empty.style.left, eachBlockSize);
  } else if (targetIndex + level == emptyIndex) {
    target.style.top = stringHandle(target.style.top, eachBlockSize);
    empty.style.top = stringHandle(empty.style.top, -eachBlockSize);
  } else if (targetIndex - level == emptyIndex) {
    target.style.top = stringHandle(target.style.top, -eachBlockSize);
    empty.style.top = stringHandle(empty.style.top, eachBlockSize);
  }
  if (target.dataset.id != "empty") {
    steps++;
    countSteps();
  }
}
const stringHandle = (ori, fluctuation) => {
  return `${parseInt(ori.replace("px","")) + fluctuation}px`;
}
const createPuzzleFrame = () => {
  puzzleSize = $(window).width() >= 800 ? 600 : $(window).width() >= 600 ? 540 : $(window).width() - 20;
  document.querySelector(".puzzle").innerHTML = "<b>(1)可由上面按鈕上傳圖片</b><b>(2)或從此區點擊或拖曳圖片上傳</b>";
  document.querySelector(".puzzle").setAttribute("style", `width:${puzzleSize}px;height:${puzzleSize}px; display:flex; flex-direction:column;justify-content:center;align-items:center; cursor:pointer;`)
}
const createFinsishedPuzzleFrame = () =>{
  puzzleSize = $(window).width() >= 800 ? 600 : $(window).width() >= 600 ? 540 : $(window).width() - 20;
  document.querySelector(".puzzle").setAttribute("style", `width:${puzzleSize}px;height:${puzzleSize}px;`)
  let img = document.createElement("img");
  img.src = image;
  document.querySelector(".puzzle").appendChild(img);
}

const winGame = () => {
  document.querySelector(".puzzle").setAttribute("style", `width: ${puzzleSize}px;height:${puzzleSize}px; pointer-events:none;`)
  if (timer) {
    clearTimeout(timer);
    timer = null;
  } else {
    timer = setTimeout(function () {
      winGameAnimation();
    }, 500);
  }
};
const countSteps = () => {
  let color = steps / level >= 20 ? "death" : steps / level >= 10 ? "danger" : steps / level >= 5 ? "warning" : "normal";
  document.querySelector(".count b").innerText = steps;

  document.querySelector(".count b").className = "";
  document.querySelector(".count b").classList.add(`${color}`);
}

const click = e => {
  e.stopPropagation();
  e.preventDefault();
  document.querySelector("#upload_img").click();
}

const dragenter = e => {
  e.stopPropagation();
  e.preventDefault();
}

const dragleave = e => {
  e.stopPropagation();
  e.preventDefault();
}
const dragover = e => {
  e.stopPropagation();
  e.preventDefault();
}
const drop = e => {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;
  if (!files[0].type.match(/image.*/)) {
    alert("只接受圖片格式，如:.jpg/.jpeg、.png 和 .gif!!")
  }
  image = URL.createObjectURL(files[0]);
  createBackgroundImage();
  document.querySelector(".puzzle").removeEventListener("click",click);
}
const createBackgroundImage = () => {
  document.querySelector(".puzzle").setAttribute("style", `background: url("${image}") no-repeat; background-size: ${puzzleSize}px ${puzzleSize}px; width: ${puzzleSize}px;height:${puzzleSize}px; pointer-events:none;`);
  document.querySelector(".puzzle").innerHTML = "";
  document.querySelector(".answer").innerHTML = "";
  document.querySelector(".answer").style.backgroundImage = `url("${image}")`;
}

document.querySelector("#upload_img").addEventListener("change", function (e) {
  let imageFile = e.target.files[0];
  image = URL.createObjectURL(imageFile);
  createBackgroundImage();
  document.querySelector(".puzzle").removeEventListener("click", click,false);
})

document.querySelector(".puzzle").addEventListener("click", click, false);
document.querySelector(".puzzle").addEventListener("dragenter", dragenter, false);
document.querySelector(".puzzle").addEventListener("dragleave", dragleave, false);
document.querySelector(".puzzle").addEventListener("dragover", dragover, false);
document.querySelector(".puzzle").addEventListener("drop", drop, false);


window.addEventListener("load", function () {
  createPuzzleFrame();
  steps = 0;
  countSteps();
});

window.addEventListener("resize", function () {
  isFinished = answer.length > 0 && block.length && answer.every((item, index) => index == block.indexOf(item));
  if (isFinished) createFinsishedPuzzleFrame();
  else if (image) createPuzzle();
  else createPuzzleFrame();
  
})

document.querySelector("#start").addEventListener("click", function () {
  if (!image) {
    alert("請先上傳任一圖檔!")
  } else {
    steps = 0;
    countSteps();
    createBlockArray();
    createPuzzle();
    this.innerText = "重新開始";

    document.querySelectorAll(".block").forEach(item => {
      item.addEventListener("click", function () {
        timer = null;
        changePuzzle(item);
        changePosition(item.dataset.id);
        if (answer.every((item, index) => index == block.indexOf(item))) winGame();
      })
    })

  }
})

const winGameAnimation = () => {
  for (let i = 0; i < 4; i++) {
    let span = document.createElement("span");
    span.classList.add(`border_${i+1}`);
    document.querySelector(".puzzle").appendChild(span);
  }

  for (let i = 0; i < 10; i++) {
    let win_block = document.createElement("div");
    win_block.classList.add(`win_block_${i+1}`);
    win_block.classList.add("win_block");
    document.querySelector(".puzzle").appendChild(win_block);
  }

  let img = document.createElement("img");
  img.src = image;
  let banner = document.createElement("div");
  banner.classList.add("banner");
  banner.setAttribute("style","display:flex;justify-content:center;align-items:center;font-size:20px;")
  banner.innerHTML = `<p>恭喜勝利，使用步數為 : <span style="color:#f00;font-size:25px;padding-left:10px;">${steps} </span></p>`;
  document.querySelector(".puzzle").append(img, banner);
  setTimeout(() => {
    document.querySelectorAll(".block").forEach(item => item.style.borderColor = "transparent");
  }, 3000)
}