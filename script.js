// ---------------------------
// 言語切替
// ---------------------------
const jaBtn = document.getElementById("jaBtn");
const enBtn = document.getElementById("enBtn");
jaBtn.onclick = () => switchLang("ja");
enBtn.onclick = () => switchLang("en");

function switchLang(lang) {
    document.querySelectorAll("[data-ja]").forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}



// ---------------------------
// PNG の蝶を表示
// ---------------------------
function createButterflyImage() {
    const img = document.createElement("img");
    img.src = "7_20251117185917.png"; // ← 同じフォルダでOK
    img.className = "butterfly-img";
    return img;
}



// ---------------------------
// 蝶 1匹を生成して飛ばす
// ---------------------------
function createButterfly() {
    const container = document.getElementById("butterfly-container");
    const butterfly = createButterflyImage();
    container.appendChild(butterfly);

    // スタート：画面下のランダム位置
    let x = Math.random() * window.innerWidth;
    let y = window.innerHeight + 100;

    // 左右へ進む方向（ランダム）
    let direction = Math.random() < 0.5 ? -1 : 1;

    // 揺れ
    const swayX = 40 + Math.random() * 40;
    const swayY = 10 + Math.random() * 15;
    const swaySpeed = 0.01 + Math.random() * 0.008;

    // 前進速度
    const moveX = (1.0 + Math.random() * 0.5) * direction;

    let t = 0;

    function fly() {
        t += swaySpeed;

        // 左右へ進みつつ上下ゆらゆら
        x += moveX + Math.cos(t) * swayX * 0.08;
        y -= 0.7 + Math.sin(t * 2) * swayY * 0.15;

        const rotate = Math.sin(t * 3) * 8; // ひらひら感

        butterfly.style.transform =
            `translate(${x}px, ${y}px) rotate(${rotate}deg)`;

        // 画面外で削除
        if (x < -800 || x > window.innerWidth + 200 || y < -200) {
            butterfly.remove();
            return;
        }

        requestAnimationFrame(fly);
    }

    fly();
}



// ---------------------------
// 無限にランダム生成（重くなりすぎない程度）
// ---------------------------
setInterval(createButterfly, 7000);
