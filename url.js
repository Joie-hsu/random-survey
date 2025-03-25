/*
 * 將要隨機派發的網址放入下方（不需排序）
 *
 * 並請注意：
 * 1. 網址請用引號（或稱「撇號」，單引號或雙引號皆可）包起來
 * 2. 包起來的網址之間用逗號分隔
 */

// 设置 Google Form 问卷网址
function distributeSurveys(currentDistribution) {
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

    const minCount = 50;  // 每个问卷的最少分配数
    const totalResponses = 2100;  // 假设总共需要 2100 份问卷（或者可以动态设置这个值）
    let remaining = totalResponses;  // 计算剩余问卷的数量

    let finalList = [];  // 用来存储最终的问卷列表

    // 1. 初始化，将每个问卷按当前的分配数量填充 finalList
    urls.forEach(url => {
        let count = currentDistribution[url] || 0;  // 如果没有分配数量，默认为 0
        for (let i = 0; i < count; i++) {
            finalList.push(url);
        }
        remaining -= count;  // 更新剩余数量
    });

    // 2. 直到所有问卷都达到最小分配数（minCount），优先分配剩余份数
    let allReachedMin = false;
    let maxAttempts = 10000;  // 防止无限循环，设置最大分配尝试次数
    let attempts = 0;

    // 持续分配，直到每个问卷都达到 50 份
    while (!allReachedMin && attempts < maxAttempts) {
        attempts++;

        // 检查是否所有问卷都已经达到最小分配数
        allReachedMin = true;
        urls.forEach(url => {
            if ((currentDistribution[url] || 0) < minCount) {
                allReachedMin = false;
            }
        });

        // 如果某个问卷还未达到最小分配数，则继续为该问卷分配
        if (!allReachedMin) {
            let selectedUrl = urls.find(url => (currentDistribution[url] || 0) < minCount);
            currentDistribution[selectedUrl] = (currentDistribution[selectedUrl] || 0) + 1;
            finalList.push(selectedUrl);
            remaining--;
        }
    }

    // 3. 一旦所有问卷都达到 50 份，开始均匀分配剩余的问卷
    while (remaining > 0) {
        let selectedUrl = urls[Math.floor(Math.random() * urls.length)];  // 随机选择一个问卷
        currentDistribution[selectedUrl] = (currentDistribution[selectedUrl] || 0) + 1;
        finalList.push(selectedUrl);
        remaining--;
    }

    // 4. 使用 Fisher-Yates 洗牌算法随机排列问卷
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(finalList);

    //console.log("finalList: ", finalList); // 打印 finalList 以检查问卷链接

    // 返回更新后的问卷列表和当前分配情况
    return { finalList, currentDistribution };
}

// 假设这是您当前的问卷分配数量
let currentDistribution = {
    'https://docs.google.com/forms/d/e/1FAIpQLSdNYHLOrJWbOCkHNM6K9v2GmDwYJwvfPQhd2lLsfgsfg205XQ/viewform?usp=header': 81,
    'https://docs.google.com/forms/d/e/1FAIpQLSdFYDhfyEs9ZKeeKHO1TwE7dh_cx5aTbgevDTrVAK-WnXU9zA/viewform?usp=header': 30,
    'https://docs.google.com/forms/d/e/1FAIpQLSfBmzSIywzUBa5IzGRcKKgiMyvcmPnb2hqEx6HePfP-FkIEqQ/viewform?usp=header': 29,
    'https://docs.google.com/forms/d/e/1FAIpQLSf2SpgL5TX77mUfhfTeAZLcgo6vBi2G_8y29E4AW97HVdGj9w/viewform?usp=header': 26,
    'https://docs.google.com/forms/d/e/1FAIpQLSeoY-lgYbkRl1XIZ2knYyn9bjxQPX5GrSAw0nm99G26nZNYKg/viewform?usp=header': 22,
    'https://docs.google.com/forms/d/e/1FAIpQLSdu2lrzSGSlMb_ND5Cov-7KfjsPlDb5xODFiJKJMHxUzFBHNg/viewform?usp=header': 43,
    'https://docs.google.com/forms/d/e/1FAIpQLSdEAQQT-Mldhv2G_gW19YCpF0229Swt1TdbEV5yDmKanr_PjA/viewform?usp=header': 21,
    'https://docs.google.com/forms/d/e/1FAIpQLSecrnF8JEc9ZgmXlwiel1SpZzEJ4NI7nTEi1-i6lt9-YEQOAw/viewform?usp=header': 22
};

// 调用函数进行问卷分配
const { finalList, currentDistributionUpdated } = distributeSurveys(currentDistribution);

// 提供一个函数来获取随机的问卷链接
function getRandomFormLink() {
    return finalList.pop(); // 每次调用返回一个随机的问卷链接
}

// 获取一个随机问卷链接
const randomLink = getRandomFormLink();
console.log("最终问卷分配统计：", currentDistribution);
// console.log("随机分配后的问卷清单：", finalList);
console.log("随机选择的问卷链接：", randomLink);
