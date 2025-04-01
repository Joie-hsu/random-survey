/*
 * 將要隨機派發的網址放入下方（不需排序）
 *
 * 並請注意：
 * 1. 網址請用引號（或稱「撇號」，單引號或雙引號皆可）包起來
 * 2. 包起來的網址之間用逗號分隔
 */

// 設定 Google Form 問卷網址
const urls = [
       'https://docs.google.com/forms/d/e/1FAIpQLSdNYHLOrJWbOCkHNM6K9v2GmDwYJwvfPQhd2lLsfgsfg205XQ/viewform?usp=header',
      'https://docs.google.com/forms/d/e/1FAIpQLSdFYDhfyEs9ZKeeKHO1TwE7dh_cx5aTbgevDTrVAK-WnXU9zA/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSfBmzSIywzUBa5IzGRcKKgiMyvcmPnb2hqEx6HePfP-FkIEqQ/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSf2SpgL5TX77mUfhfTeAZLcgo6vBi2G_8y29E4AW97HVdGj9w/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSeoY-lgYbkRl1XIZ2knYyn9bjxQPX5GrSAw0nm99G26nZNYKg/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSdu2lrzSGSlMb_ND5Cov-7KfjsPlDb5xODFiJKJMHxUzFBHNg/viewform?usp=header',
    'https://docs.google.com/forms/d/e/1FAIpQLSecrnF8JEc9ZgmXlwiel1SpZzEJ4NI7nTEi1-i6lt9-YEQOAw/viewform?usp=header'
];

// 設定最低分配數量和總回應數
const minCount = 50;
const totalResponses = 2000; // 假設總共需要 2000 份問卷
let distribution = {};
let finalList = [];

// 1. 初始化，每份問卷先分配 30 份
urls.forEach(url => {
    distribution[url] = minCount;
    for (let i = 0; i < minCount; i++) {
        finalList.push(url);
    }
});

// 2. 剩餘數量，確保所有問卷均達標後才開始分配
let remaining = totalResponses - (minCount * urls.length);
let availableUrls = [...urls]; // 建立一個可分配額外數量的網址池

while (remaining > 0) {
    let randomIndex = Math.floor(Math.random() * availableUrls.length);
    let selectedUrl = availableUrls[randomIndex];

    distribution[selectedUrl]++;
    finalList.push(selectedUrl);

    remaining--;
}

// 3. 最後使用 Fisher-Yates 洗牌演算法隨機排列問卷
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(finalList);

// 4. 輸出結果
console.log("隨機分配後的 2000 份問卷清單：", finalList);
console.log("最終分配統計：", distribution);

// 5. 提供隨機問卷連結函數（用於網頁應用）
function getRandomFormLink() {
    return finalList.pop(); // 取出一個問卷，確保不會重複給到
}

// **如果在網頁應用，可用 window.location.href = getRandomFormLink();**
