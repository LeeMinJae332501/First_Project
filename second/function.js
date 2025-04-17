let entries = [];
let angle = 0;
let spinning = false;
let canvas = document.getElementById("wheel");
let ctx = canvas.getContext("2d");

function generateWheel() {
  // 사용자 입력 가져오기
  const raw = document.getElementById("entries").value;
  entries = raw.split("\n").filter(e => e.trim() !== "");
  drawWheel();
}

function drawWheel() {
  const total = entries.length;
  const arc = (2 * Math.PI) / total;

  // 룰렛 배경 그리기
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < total; i++) {
    const angleStart = i * arc;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${(i * 360) / total}, 70%, 60%)`;
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angleStart, angleStart + arc);
    ctx.fill();

    // 텍스트 표시
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angleStart + arc / 2);
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(entries[i], 100, 10);
    ctx.restore();
  }
}

function spinWheel() {
  if (spinning || entries.length === 0) return;

  spinning = true;
  let velocity = Math.random() * 0.3 + 0.25; // 초기 속도
  const deceleration = 0.002;

  const interval = setInterval(() => {
    angle += velocity;
    velocity -= deceleration;

    if (velocity <= 0) {
      clearInterval(interval);
      spinning = false;
      announceWinner();
    }

    drawRotatedWheel(angle);
  }, 16);
}

function drawRotatedWheel(rot) {
    const total = entries.length;
    const arc = (2 * Math.PI) / total;
  
    // 배경 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // 룰렛 섹션 그리기
    for (let i = 0; i < total; i++) {
      const angleStart = i * arc + rot;
      ctx.beginPath();
      ctx.fillStyle = `hsl(${(i * 360) / total}, 70%, 60%)`;
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 250, angleStart, angleStart + arc);
      ctx.fill();
  
      // 항목 텍스트
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate(angleStart + arc / 2);
      ctx.fillStyle = "black";
      ctx.font = "16px sans-serif";
      ctx.fillText(entries[i], 100, 10);
      ctx.restore();
    }
    drawPointer();
  }
  

  function announceWinner() {
    const total = entries.length;
    const arc = (2 * Math.PI) / total;
  
    // 🔄 룰렛이 멈췄을 때 각도를 0~2π 사이로 정리
    const normalizedAngle = (angle + Math.PI / 2) % (2 * Math.PI);  
    // ⬆ Math.PI/2(90도) 더해서 "위쪽"이 기준이 되도록 보정
  
    // 몇 번째 항목인지 계산
    const index = Math.floor((2 * Math.PI - normalizedAngle) / arc) % total;
  
    // 결과 표시
    document.getElementById("winner").textContent = "당첨: " + entries[index];
  }
  
  function drawPointer() {
    ctx.beginPath();
    ctx.fillStyle = "#e74c3c"; // 삼각형 색
  
    const cx = 250;         // 중심 x
    const tipY = 30;        // 꼭짓점 (룰렛 위쪽, 아래를 향함)
    const baseY = 0;        // 밑변 y (위쪽)
  
    // ▼ 모양의 삼각형
    ctx.moveTo(cx, tipY);        // 아래 꼭짓점
    ctx.lineTo(cx - 20, baseY);  // 왼쪽 윗변
    ctx.lineTo(cx + 20, baseY);  // 오른쪽 윗변
    ctx.closePath();
    ctx.fill();
  
    // 테두리도 원하면 추가
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#222";
    ctx.stroke();
  }



  
  