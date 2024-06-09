const axios = require("axios");

const BITLY_ACCESS_TOKEN = process.env.BITLY_ACCESS_TOKEN;

async function shortenUrl(longUrl) {
    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';

    try {
        const response = await axios.post(apiUrl, {
            long_url: longUrl
        }, {
            headers: {
                'Authorization': `Bearer ${BITLY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("")

        return response.data.link;
    } catch (error) {
        console.error('Error shortening the URL:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 긴 링크를 짧은 링크로 변환
// const longUrl = 'https://www.example.com/very/long/url/to/shorten';
// shortenUrl(longUrl).then(shortUrl => {
//     console.log('Shortened URL:', shortUrl);
// }).catch(error => {
//     console.error('Failed to shorten URL:', error);
// });

module.exports = shortenUrl;