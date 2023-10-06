"use strict";

const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const path = require("path");
const fs = require("fs");
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");
const webpack = require("webpack");

const version = process.env.version;
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === "true";

const buildPath = process.env.BUILD_PATH || "dist";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
  appPath: resolveApp("."),
  appBuild: resolveApp(buildPath),
  appStatic: resolveApp("static"),
  appHtml: resolveApp("static/index.html"),
  appIndexJs: resolveApp("src/index.ts"),
  appTsConfig: resolveApp("tsconfig.json"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appTsBuildInfoFile: resolveApp("node_modules/.cache/tsconfig.tsbuildinfo"),
  appNodeModules: resolveApp("node_modules"),
};

const deps = require(paths.appPackageJson).dependencies;

const useTypeScript = fs.existsSync(paths.appTsConfig);

let MF_CONFIGURATION;
let DEV_PORT = 3000;

const filename = (ext, isProd) => {
  if (isProd) {
    return `${ext}/[name].[contenthash:8].${ext}`;
  }
  return `${ext}/bundle.${ext}`;
};

const chunkFilename = (ext, isProd) => {
  if (isProd) {
    return `${ext}/[name].[contenthash:8].chunk.${ext}`;
  }
  return `${ext}/[name].chunk.${ext}`;
};

const cssLoaders = (extra) => {
  const loaders = [
    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    "css-loader",
    "resolve-url-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const getPublicPath = (isDev) => {
  return isDev ? `http://localhost:${DEV_PORT}/` : "auto";
};

const optimization = () => {
  const config = {
    minimize: isProd,
    flagIncludedChunks: isProd,
    innerGraph: isProd,
    mergeDuplicateChunks: isProd,
    removeAvailableModules: isProd,
    providedExports: true,
  };

  if (isProd) {
    config.minimizer = [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          // keep_classnames: isEnvProductionProfile,
          // keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        extractComments: false,
      }),

      new CssMinimizerPlugin(),
    ];
  }

  return config;
};

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          // inject: true,
          template: "static/index.html",
        },
        isProd
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined,
      ),
    ),

    isProd &&
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: filename("css", true),
        chunkFilename: chunkFilename("css", true),
      }),

    useTypeScript &&
      new ForkTsCheckerWebpackPlugin({
        async: isDev,
      }),

    isDev &&
      new CircularDependencyPlugin({
        onDetected({ paths, compilation }) {
          if (paths.some((path) => path.includes("node_modules"))) return;

          compilation.warnings.push(new Error(paths.join(" -> \\n")));
        },
      }),

    new ExternalTemplateRemotesPlugin(),

    isDev && new DuplicatePackageCheckerPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || "disabled",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]?.filter(Boolean);

  return base;
};

const modules = () => {
  return {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      // {
      //   test: /test\.[tj]s$/,
      //   use: "mocha-loader",
      //   exclude: /node_modules/,
      // },
      { test: /\.hbs$/, loader: "handlebars-loader" },
    ],
  };
};

module.exports = {
  mode: isProd ? "production" : isDev && "development",
  target: ["browserslist"],
  entry: {
    entry: paths.appIndexJs,
  },

  // Webpack noise constrained to errors and warnings
  stats: "errors-warnings",

  // Stop compilation early in production
  bail: isProd,

  // source maps for details when debugging on PROD
  devtool: isProd
    ? shouldUseSourceMap
      ? "source-map"
      : false
    : isDev && "cheap-module-source-map",

  output: {
    path: paths.appBuild,
    pathinfo: isDev,
    publicPath: getPublicPath(isDev),

    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: filename("js", isProd),

    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: chunkFilename("js", isProd),
    assetModuleFilename: "static/media/[name].[hash][ext]",

    clean: true,
  },

  resolve: {
    extensions: [
      ".ts",
      ".js",
      ".json",
      ".css",
      ".scss",
      ".sass",
      ".jpg",
      ".jpeg",
      ".png",
    ],
    plugins: [new TsconfigPathsPlugin({})],

    fallback: {
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
    },
  },

  devServer: {
    port: DEV_PORT,
    hot: isDev,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: { errors: true, warnings: false },
      progress: true,
      reconnect: 20,
    },
    static: {
      directory: paths.appStatic,
    },

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },

    // if needed api
    // proxy: {
    //   '/api': '<http://localhost:3001>',
    // },
  },

  optimization: optimization(),

  module: modules(),

  plugins: plugins(),
};
