const fs = require("fs");
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const useProxy = true;

const buildFolderName = "build";
const mocksFolderName = "mocks";

const readMock = (method, url) => {
    const urlChunks = url.split("/").slice(2);
    urlChunks[urlChunks.length - 1] = urlChunks[urlChunks.length - 1] + ".json";
    const mockPath = path.resolve(...[__dirname, mocksFolderName, method.toLowerCase(), ...urlChunks]);
    const data = fs.readFileSync(mockPath);
    return JSON.parse(data);
};

module.exports = {
    mode: "development",
    entry: ["./src/js/index.js", "./src/css/index.css", "./src/index.html", "./src/favicon.svg"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico|svg)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(html)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            }
        ]
    },
    resolve: {
        alias: {
            actions: path.resolve(__dirname, "src/js/actions"),
            api: path.resolve(__dirname, "src/js/api"),
            componente: path.resolve(__dirname, "src/js/componente"),
            middlewares: path.resolve(__dirname, "src/js/middlewares"),
            models: path.resolve(__dirname, "src/js/models"),
            reducers: path.resolve(__dirname, "src/js/reducers"),
            store: path.resolve(__dirname, "src/js/store"),
            utils: path.resolve(__dirname, "src/js/utils")
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, buildFolderName),
        publicPath: "/"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new ESLintPlugin({})
    ],
    devServer: {
        host: "127.0.0.1",
        port: 8000,
        hot: false,
        open: false,
        historyApiFallback: true,
        watchFiles: ["src/**/*"],
        static: {
            directory: path.join(__dirname, buildFolderName),
            publicPath: "/",
            watch: false
        },
        client: {
            overlay: {
                errors: true,
                warnings: false
            },
            progress: true,
            reconnect: true
        },
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                pathRewrite: { "^/api": "" },
                bypass: (req, res) => {
                    if (useProxy) {
                        return null;
                    }
                    const mock = readMock(req.method, req.url);
                    if (mock === null) {
                        return null;
                    }
                    res.setHeader("Content-Type", "application/json");
                    const body = JSON.stringify(mock.data);
                    res.setHeader("Content-Length", body.length);
                    res.writeHead(mock.statusCode);
                    if (mock.data) {
                        res.write(body);
                    }
                    res.end();
                    return true;
                }
            }
        }
    }
};