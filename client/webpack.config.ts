import path from "path";
import postcssPresetEnv from "postcss-preset-env";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// import Dotenv from "dotenv-webpack";
import { type RuleSetUseItem, type Configuration, type WebpackPluginInstance } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const isAnalyze = process.env.NODE_ENV === "analyze";
const isServe = process.env.NODE_ENV === "serve" || isAnalyze;
const isDev = process.env.NODE_ENV === "development" || isServe;
const isProd = process.env.NODE_ENV === "production";

const imagesFileName = isProd ? "img/[name]-[contenthash][ext]" : "img/[name][ext]";
const fontsFileName = isProd ? "fonts/[name]-[contenthash][ext]" : "fonts/[name][ext]";
const jsFileName = isProd ? "js/[name]-[contenthash].js" : "js/[name].js";
const cssFileName = isProd ? "css/[name]-[contenthash].css" : "css/[name].css";
// const dotenvPath = isDev ? "./.env.development" : "./.env.production";

const plugins = (): WebpackPluginInstance[] => {
   const defaultPlugins: WebpackPluginInstance[] = [
      new HtmlWebpackPlugin({
         filename: "index.html",
         template: "src/templates/index.html",
      }),
      new MiniCssExtractPlugin({ filename: cssFileName }),
      // new Dotenv({
      //    path: dotenvPath,
      // }),
   ];

   if (isServe) {
      defaultPlugins.push(new ReactRefreshPlugin());
   }

   if (isAnalyze) {
      defaultPlugins.push(new BundleAnalyzerPlugin());
   }

   return defaultPlugins;
};

type Optimization = Configuration["optimization"];

const optimization = (): Optimization => {
   const config: Optimization = {
      splitChunks: {
         chunks: "all",
      },
   };

   if (isProd) {
      config.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
   }

   return config;
};

const cssLoaders = (): RuleSetUseItem[] => {
   const miniCssExtractPluginLoader = {
      loader: MiniCssExtractPlugin.loader,
   };

   const cssLoader = {
      loader: "css-loader",
   };

   const postCssLoader = {
      loader: "postcss-loader",
      options: {
         postcssOptions: {
            plugins: [postcssPresetEnv],
         },
      },
   };

   const sassLoader = {
      loader: "sass-loader",
   };

   const loaders = [miniCssExtractPluginLoader, cssLoader, postCssLoader, sassLoader];

   return loaders;
};

interface AppConfiguration extends Configuration {
   devServer: Record<string, any>;
}

const config: AppConfiguration = {
   target: "web",
   mode: (isProd && "production") || (isDev && "development") || "development",
   resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx"],
      alias: {
         "@": path.resolve(__dirname, "src"),
         "@@": path.resolve(__dirname, "./"),
      },
   },
   entry: {
      index: "./src/index.tsx",
   },
   output: {
      filename: jsFileName,
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
   },
   devServer: {
      client: {
         overlay: {
            warnings: false,
            errors: true,
         },
      },
      port: 8000,
      historyApiFallback: true,
   },
   plugins: plugins(),
   module: {
      rules: [
         {
            test: /\.scss$/i,
            use: cssLoaders(),
            generator: {
               filename: cssFileName,
            },
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
            generator: {
               filename: imagesFileName,
            },
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
               filename: fontsFileName,
            },
         },
         {
            test: /\.[jt]s[x]?$/,
            loader: "ts-loader",
            options: {
               transpileOnly: isProd,
               // transpileOnly: true,
            },
            exclude: [/node_modules/, /\.(json)/],
         },
      ],
   },
   optimization: optimization(),
   devtool: "source-map",
};

export default config;
