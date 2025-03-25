// 設定 Google Form 問卷網址
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

// 設定最低門檻
const minCount = 60;
const totalLimit = 2000;  // 最大填答數
let totalResponses = 0;   // 當前填答數
let distribution = {};    // 紀錄每份問卷的填答次數

// 初始化，每份問卷的計數為 0
urls.forEach(url => distribution[url] = 0);

// 隨機選擇可分配的問卷
function getRandomFormLink() {
    if (totalResponses >= totalLimit) {
        alert("問卷已達填答上限，感謝您的參與！");
        return null;
    }

    let availableUrls = urls.filter(url => distribution[url] < minCount);
    
    let selectedUrl;
    if (availableUrls.length > 0) {
        // 若還有未達最低門檻的問卷，優先分配
        selectedUrl = availableUrls[Math.floor(Math.random() * availableUrls.length)];
    } else {
        // 若所有問卷都已達最低數量，則完全隨機選擇
        selectedUrl = urls[Math.floor(Math.random() * urls.length)];
    }

    // 記錄分配次數
    distribution[selectedUrl]++;
    totalResponses++;

    return selectedUrl;
}

// 提供按鈕跳轉
function redirectToRandomForm() {
    let formLink = getRandomFormLink();
    if (formLink) {
        window.location.href = formLink;
    }
}

// **網頁 HTML 按鈕**
document.write('<button onclick="redirectToRandomForm()">開始填問卷</button>');
