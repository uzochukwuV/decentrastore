/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [

            {
              protocol: 'https',
              hostname: 'images.pexels.com',
              port: '',
              pathname: '/**',
              search: '',
            },
            {
                protocol: 'https',
                hostname: '**', // Allows all domains
              },
          ],
    }
};

module.exports = nextConfig;
