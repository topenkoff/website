/** @type {import('next').NextConfig} */

const nodeEnv = process.env.BUILD_MODE;
const isProd = nodeEnv === "production";
const prodHost = 'https://kayshev.com';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  assetPrefix: isProd ? prodHost : undefined,
  compress: true,
}

module.exports = nextConfig
