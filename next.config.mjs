/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(mp3|wav)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/media/',
                    outputPath: 'static/media/',
                    name: '[name].[hash].[ext]',
                    esModule: false,
                },
            }
        });

        return config;
    },
};

export default nextConfig;
