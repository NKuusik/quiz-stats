# Readme

## Notes on package.json scripts

To start in developer mode, run `npm run start`.

Hot reload of `.scss` files somewhat unorthodox in this project, as they are transformed to `.css` in the `src` folder rather than via webpack in `dist`. As such `sass --watch` is used for hot reload instead of webpack configuration. 
