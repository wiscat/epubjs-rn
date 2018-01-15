/* @flow */

import {
  AppState
} from 'react-native';

import StaticServer from 'react-native-static-server';

import RNFetchBlob from "react-native-fetch-blob"

import { unzip } from 'react-native-zip-archive'


// import { readFileSync } from "fs";
import { join } from "path";

const Dirs = RNFetchBlob.fs.dirs

if (!global.Blob) {
  global.Blob = RNFetchBlob.polyfill.Blob;
}

const Uri = require("epubjs/lib/utils/url");

type EpubStreamerProps = {
  isCache?: boolean,
  port?: number,
  root?: string
};

class EpubStreamer {
  isCache: boolean;
  port: number | string;
  root: string
  server: typeof StaticServer;
  serverOrigin: string;
  urls: string[];
  locals: string[];
  paths: string[];
  started: boolean;

  constructor(opts: EpubStreamerProps) {
    opts = opts || {};
    this.isCache = opts.isCache === undefined ? true : opts.isCache;
    this.port = opts.port || "3" + Math.round(Math.random() * 1000);
    this.root = opts.root || "www";
    this.server = new StaticServer(this.port, this.root, {localOnly: true});

    this.serverOrigin = 'file://';

    this.urls = [];
    this.locals = [];
    this.paths = [];

    this.started = false;
  }

  start() {
    this.started = true;
    return this.server.start().then((url) => {
      this.serverOrigin = url;
      return url;
    });
  }

  stop() {
    this.started = false;
    if (this.server) {
      this.server.stop();
    }
  }

  kill() {
    this.started = false;
    if (this.server) {
      this.server.kill();
    }
  }

  add(bookUrl: string) {
    const filename = this.filename(bookUrl);

    return RNFetchBlob
      .config({
        fileCache : true,
        path: Dirs.DocumentDir + '/' + filename
      })
      .fetch("GET", bookUrl)
      .then((res) => {
        const sourcePath = res.path();
        const targetPath = `${Dirs.DocumentDir}/${this.root}/${filename}`;
        const url = `${this.serverOrigin}/${filename}/`;

        return unzip(sourcePath, targetPath)
          .then((path) => {

            this.urls.push(bookUrl);
            this.locals.push(url);
            this.paths.push(path);

            res.flush();

            return url;
          })
      });
  }

  check(bookUrl: string) {
    const filename = this.filename(bookUrl);
    const targetPath = `${Dirs.DocumentDir}/${this.root}/${filename}`;

    return RNFetchBlob.fs.exists(targetPath);
  }

  get(bookUrl: string) {
    if (!this.isCache) {
      return this.add(bookUrl);
    }
    return this.check(bookUrl)
      .then((exists) => {
        if (exists) {
          const filename = this.filename(bookUrl);
          const url = `${this.serverOrigin}/${filename}/`;
          return url;
        }

        return this.add(bookUrl);
      })
  }

  filename(bookUrl: string) {
    let uri = new Uri(bookUrl);
    return uri.filename.replace(".epub", "");
  }

  remove(path: string) {
    return RNFetchBlob.fs.lstat(path)
      .then((stats) => {
        let index = this.paths.indexOf(path);
        this.paths.splice(index, 1);
        this.urls.splice(index, 1);
        this.locals.splice(index, 1);
      })
      .catch((err) => {})
  }

  clean() {
    this.paths.forEach((path) => {
      this.remove(path);
    });
  }
}

export default EpubStreamer;
