// ---------------------------
// 言語切替
// ---------------------------
// script.js

// 初期言語（デフォルト）
// 初期言語
let currentLang = "ja";

// ページ読み込み時に全ての要素を書き換える
window.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("[data-ja]");
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLang}`);
    });
});


// ページ内の全要素を取得
const elements = document.querySelectorAll("[data-ja]");

// 初期表示
elements.forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`);
});

// 言語切替ボタン
document.getElementById("jaBtn").addEventListener("click", () => {
    currentLang = "ja";
    elements.forEach(el => {
        el.innerText = el.getAttribute("data-ja");
    });
});

document.getElementById("enBtn").addEventListener("click", () => {
    currentLang = "en";
    elements.forEach(el => {
        el.innerText = el.getAttribute("data-en");
    });
});



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
