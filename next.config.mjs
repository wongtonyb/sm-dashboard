/** @type {import('next').NextConfig} */
const nextConfig = {
   //configure next/images to allow images from pexels.com
   images: {
      remotePatterns: [{ hostname: 'images.pexels.com' }],
   },
}

export default nextConfig
