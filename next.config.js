/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Static export для деплоя на Beget хостинг (без Node.js, только HTML/CSS/JS)
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
