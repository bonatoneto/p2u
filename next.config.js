/**  @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // distDir: "dist",
  // output: "export",
  trailingSlash: true,
  // images: { unoptimized: true },
  // assetPrefix: isProd ? 'https://app.processtouse.com/' : undefined,  
  basePath: '',
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};
 
module.exports = nextConfig;