/*
 * 將要隨機派發的網址放入下方（不需排序）
 *
 * 並請注意：
 * 1. 網址請用引號（或稱「撇號」，單引號或雙引號皆可）包起來
 * 2. 包起來的網址之間用逗號分隔
 */


// 設定可用的 Google Form 連結
const urls = [
    'https://docs.google.com/forms/d/e/1FAIpQLSdNYHLOrJWbOCkHNM6K9v2GmDwYJwvfPQhd2lLsfgsfg205XQ/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSdFYDhfyEs9ZKeeKHO1TwE7dh_cx5aTbgevDTrVAK-WnXU9zA/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSfBmzSIywzUBa5IzGRcKKgiMyvcmPnb2hqEx6HePfP-FkIEqQ/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSf2SpgL5TX77mUfhfTeAZLcgo6vBi2G_8y29E4AW97HVdGj9w/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSeoY-lgYbkRl1XIZ2knYyn9bjxQPX5GrSAw0nm99G26nZNYKg/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSdu2lrzSGSlMb_ND5Cov-7KfjsPlDb5xODFiJKJMHxUzFBHNg/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSdEAQQT-Mldhv2G_gW19YCpF0229Swt1TdbEV5yDmKanr_PjA/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSecrnF8JEc9ZgmXlwiel1SpZzEJ4NI7nTEi1-i6lt9-YEQOAw/viewform?usp=header'
];

// 設定問卷最少分配次數
const minCount = 2;
const totalResponses = 20; // 假設總共需要 600 份問卷
let distribution = {};

// 初始化，每個網址至少 60 次
urls.forEach(url => {
    distribution[url] = minCount;
});

// 剩餘待分配數量
let remaining = totalResponses - (minCount * urls.length);

// 隨機分配剩餘數量
while (remaining > 0) {
    let randomIndex = Math.floor(Math.random() * urls.length);
    let selectedUrl = urls[randomIndex];
    distribution[selectedUrl]++;
    remaining--;
}

// Fisher-Yates 洗牌演算法，讓分配順序更隨機
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 產生最終的隨機化問卷清單
let finalList = [];
Object.keys(distribution).forEach(url => {
    for (let i = 0; i < distribution[url]; i++) {
        finalList.push(url);
    }
});

// 打亂順序
shuffleArray(finalList);

// **模擬輸出**
console.log("隨機分配後的 600 份問卷清單：", finalList);
console.log("最終分配統計：", distribution);

// **若需在網頁顯示，可以用 document.write 或 innerHTML**
