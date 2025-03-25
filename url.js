<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>問卷自動分配器</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
    }
    button {
      font-size: 1.5em;
      padding: 15px 30px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>感謝您參與研究！</h1>
  <p>請點下方按鈕開始填問卷，問卷將由系統自動分配。</p>
  <button onclick="startSurvey()">開始填問卷</button>

  <script>
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

    const MIN_REQUIRED = 50;
    const TOTAL_LIMIT = 2100;

    function initDistribution() {
      if (!localStorage.getItem('formDistribution')) {
        const init = {};
        urls.forEach(url => init[url] = 0);
        localStorage.setItem('formDistribution', JSON.stringify(init));
      }
    }

    function getDistribution() {
      return JSON.parse(localStorage.getItem('formDistribution'));
    }

    function getTotalFilled(distribution) {
      return Object.values(distribution).reduce((a, b) => a + b, 0);
    }

    function getNextFormUrl() {
      initDistribution();
      const dist = getDistribution();
      let total = getTotalFilled(dist);

      if (total >= TOTAL_LIMIT) {
        alert('已達填寫上限，感謝您的參與！');
        return null;
      }

      const needsMore = urls.filter(url => dist[url] < MIN_REQUIRED);
      let selectedUrl;

      if (needsMore.length > 0) {
        selectedUrl = needsMore[Math.floor(Math.random() * needsMore.length)];
      } else {
        selectedUrl = urls[Math.floor(Math.random() * urls.length)];
      }

      dist[selectedUrl]++;
      localStorage.setItem('formDistribution', JSON.stringify(dist));
      return selectedUrl;
    }

    function startSurvey() {
      const link = getNextFormUrl();
      if (link) {
        window.location.href = link;
      }
    }
  </script>
</body>
</html>
