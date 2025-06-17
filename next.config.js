/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@modelcontextprotocol/sdk']
  },
  images: {
    domains: ['rllpuaybvztqqqhnvaok.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rllpuaybvztqqqhnvaok.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig