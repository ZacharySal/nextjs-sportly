/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.espncdn.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
