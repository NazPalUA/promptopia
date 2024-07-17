/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// appDir: true, // Commented out to avoid the unrecognized key error
		serverComponentsExternalPackages: ["mongoose"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/**",
			},
		],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		}
		return config
	},
}

export default nextConfig
