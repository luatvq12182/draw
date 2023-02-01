import "./style.css";
import { $ } from "./utils";

const main = () => {
  let isActive = false;
  const drawBtns = $(".btn-draw > button");

  drawBtns.slice(0, 4).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // isActive = !isActive;
      e.stopPropagation();

      drawBtns.forEach((item) => {
        if (btn === item) {
          if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            isActive = false;
          } else {
            btn.classList.add("active");
            isActive = true;
          }
        } else {
          item.classList.remove("active");
        }
      });
    });
  });

  const canvas = new fabric.Canvas("canvas", {
    selection: true,
    width: window.innerWidth,
    height: $(".main").clientHeight,
  });
  canvas.wrapperEl.style.pointerEvents = "none";

  const btnText = $("#btn-text");
  const btnPencil = $("#btn-pencil");
  const btnBrush = $("#btn-brush");
  const btnEraser = $("#btn-eraser");
  const btnClear = $("#btn-clear");

  btnText.addEventListener("click", () => {
    if (canvas.isDrawingMode) {
      canvas.selection = true;
      canvas.isDrawingMode = false;
    }

    const text = new fabric.IText("Text", {
      top: 100,
      left: window.innerWidth / 2,
      fontSize: 24,
      fontFamily: "Arial",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  });

  btnPencil.addEventListener("click", () => {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    canvas.selection = false;
    canvas.isDrawingMode = true;
  });

  btnBrush.addEventListener("click", () => {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    canvas.selection = false;
    canvas.isDrawingMode = true;

    canvas.freeDrawingBrush.width = 25;
    canvas.freeDrawingBrush.color = "rgba(0, 213, 255, 0.4)";
    // canvas.freeDrawingBrush
  });

  btnEraser.addEventListener("click", () => {
    if (canvas.freeDrawingBrush.inverted) {
      // undo erasing
      canvas.freeDrawingBrush.inverted = false;
    }

    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 20;
  });

  btnClear.addEventListener("click", () => {
    canvas.clear();
  });

  $(".main").addEventListener("mousedown", (e) => {
    if (isActive) {
      canvas._onMouseDown(e);
    }
  });
};

main();
